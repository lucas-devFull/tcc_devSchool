import React, { Component } from "react";
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";
import "./modulos.css";
import "../register/register.css";
import { withRouter } from "react-router-dom";
import Header from "../../helpers/templates/header/header";
import { Example, Card, Modal } from "../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Storage from "../../factory/storage/index";
import Modulos from "./storage";
import Swal from "../../helpers/swal/sawl";
class RegisterModulos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selecionados: [],
      naoSelecionados: [],
      editaModulo: [],
    };
    this.dataUserLogged = Storage.getStorage();
    this.handleChangeee = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.listModulos(this.dataUserLogged.token);
    console.log(this);
    this.handleChange()
  }

  handleChange(selecionados) {
    this.setState({ selecionados });
  }
  
  listMaterias(dados) {
    let materiasSelecionadas = [];
    let materiasNaoSelecionadas = [];
    let retorno = {};

    for (const i in dados) {
      if (dados[i].id_modulo == null) {
        materiasNaoSelecionadas.push({
          id: dados[i].id_materia,
          label: dados[i].descricao_materia,
        });
      } else {
        materiasSelecionadas.push({
          id: dados[i].id_materia,
          label: dados[i].descricao_materia,
        });
      }
    }
    retorno["naoSelecionados"] = materiasNaoSelecionadas;
    retorno["selecionados"] = materiasSelecionadas;
    return retorno;
  }

  listModulos(token, id = false) {
    Modulos.getModulos(token, id)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          if (id) {
            let materias = this.listMaterias(result.materias);
            this.setState({
              listMaterias: materias,
              editaModulo: result.dados,
            });
          this.handleChange.bind(this.state.materias.selecionados)
          } else {
            let materias = this.listMaterias(result.materias);
            this.setState({
              list: result.dados,
              selecionados: materias.selecionados,
              naoSelecionados: materias.naoSelecionados,
            });
          this.handleChange(this.state.materias.selecionados)
          }
        } else {
          Swal.alertMessage("Erro!", result.message, "error");
        }
      })
      .catch((error) => console.log("error", error));
  }

  setModulo(dados) {
    Modulos.setModulo(this.dataUserLogged.token, dados);
  }

  deleteModulo(token, id) {
    if (id > 0) {
      Swal.alertMessage(
        "Atenção!",
        "Voce deseja realmente excluir estes registros?",
        "warning",
        "",
        {
          Não: {
            closeModal: true,
            className: "button_red",
          },
          Sim: {
            closeModal: false,
            className: "button_info",
          },
        },
        {},
        function (context) {
          Modulos.deleteModulo(token, id)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context.listModulos(context.dataUserLogged.token);
              }
            });
        },
        this
      );
    } else {
      Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
    }
  }

  _bodyModal() {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              className="elementos form-control mt-3"
              name="descricao_modulo"
              placeholder="Descricao Modulo"
            />
          </div>

          <div className="col-md-4  my-1 d-flex align-items-end">
            <div className="custom-control custom-checkbox mr-sm-2">
              <input
                type="checkbox"
                className="custom-control-input elementos"
                id="customControlAutosizing"
              />
              <label
                className="custom-control-label"
                htmlFor="customControlAutosizing"
              >
                Modulo Inicial
              </label>
            </div>
          </div>
        </div>
        <MultiSelect
          items={this.state.naoSelecionados}
          selectedItems={this.state.selecionados}
          onChange={this.handleChangeee}
          showSelectAll={true}
        />
      </div>
    );
  }
  render() {
    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          <Modal
            btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
            title={"Cadastro de Modulos"}
            body={this._bodyModal()}
            url="Modulos"
          />
        </div>

        <div className="row row_card">
          {this.state.list.map((item) => (
            <Card
              content={item.descricao_modulo}
              id={item.id_modulo}
              key={item.id_modulo}
              dataTarget="#staticBackdrop"
              dataToggle="modal"
              ClickDelete={this.deleteModulo.bind(
                this,
                this.dataUserLogged.token,
                item.id_modulo
              )}
              ClickList={this.listModulos.bind(
                this,
                this.dataUserLogged.token,
                item.id_modulo
              )}
            />
          ))}
          <MultiSelect
            items={this.state.naoSelecionados}
            selectedItems={this.state.selecionados}
            onChange={this.handleChangeee}
            showSelectAll={true}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterModulos);
