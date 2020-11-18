import React, { Component } from "react";
import Select from "react-select";
import "./modulos.css";
import "../register/register.css";
import { withRouter } from "react-router-dom";
import Header from "../../helpers/templates/header/header";
import { Card, Modal } from "../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Storage from "../../factory/storage/index";
import Modulos from "./storage";
import Swal from "../../helpers/swal/sawl";
import { Requestor } from "../../factory/requestor/requestor";

class RegisterModulos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selecionados: [],
      naoSelecionados: [],
      valoresEdicao: {},
    };
    this.dataUserLogged = Storage.getStorage();
    this.requestExecutor = new Requestor();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.listModulos();
  }

  listMaterias(dados) {
    let materiasSelecionadas = [];
    let materiasNaoSelecionadas = [];
    let retorno = {};

    for (const i in dados) {
      if (dados[i].id_modulo != null) {
        materiasSelecionadas.push({
          value: dados[i].id_materia,
          label: dados[i].descricao_materia,
        });
      }
      materiasNaoSelecionadas.push({
        value: dados[i].id_materia,
        label: dados[i].descricao_materia,
      });
    }
    retorno["naoSelecionados"] = materiasNaoSelecionadas;
    retorno["selecionados"] = materiasSelecionadas;
    return retorno;
  }

  listModulos(id = false) {
    this.requestExecutor
      .get(`modulos${id === false ? "" : `?mod_id=${id}`}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          if (id) {
            this.setState({
              valoresEdicao: result.dados[0],
            });
          } else {
            this.setState({
              list: result.dados,
            });
          }
        } else {
          Swal.alertMessage("Erro!", result.message, "error");
        }
      })
      .catch((error) => console.log("error", error));
  }

  onChange(value, { action, removedValue }) {
    switch (action) {
      case "remove-value":
      case "pop-value":
        console.log("eu");
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        this.setState({
          selecionados: [],
        });
        break;
    }

    this.setState({ selecionados: value });
  }

  deleteModulo(id) {
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
          context.requestExecutor
            .delete(`modulos${id === false ? "" : `?mod_id=${id}`}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context.listModulos();
              }
            });
        },
        this
      );
    } else {
      Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
    }
  }
  setDataForm() {
    let id = document
      .querySelector(`#modal_modulos`)
      .getAttribute("data-id");

    if (!id) {
      this.setState({
        valoresEdicao: {},
      });
    }
  }

  getDataForm() {
    let dadosFinais = new FormData();
    let id = document
      .querySelector(`#modal_modulos`)
      .getAttribute("data-id");
    dadosFinais.append("mod_desc", document.querySelectorAll("#mod_desc")[0].value);
    dadosFinais.append("mod_inicial", (document.querySelectorAll("#mod_inicial")[0].checked) ? 1 : 0);
    console.log(id);
    if (id) {
      dadosFinais.append("mod_id", id);
    }
    return dadosFinais;
  }

  _bodyModal() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "black" : state.isFocused ? "white" : "black",
        backgroundColor: state.isSelected
          ? "white"
          : state.isFocused
          ? "#282828"
          : null,
        padding: 5,
      }),
    };
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              value={this.state.valoresEdicao.mod_desc || ""}
              className="elementos form-control mt-3"
              name="mod_desc"
              id="mod_desc"
              placeholder="Descricao Modulo"
              onChange={(e) => {
                this.setState({
                  valoresEdicao: {
                    mod_desc: e.target.value,
                    mod_inicial: this.state.valoresEdicao.mod_inicial,
                  },
                });
              }}
            />
          </div>

          <div className="col-md-4  my-1 d-flex align-items-end">
            <div className="custom-control custom-checkbox mr-sm-2">
              <input
                type="checkbox"
                className="custom-control-input elementos"
                checked={(this.state.valoresEdicao.mod_inicial == 1) ? true : false}
                id="mod_inicial"
                onChange={(e) => {
                  this.setState({
                    valoresEdicao: {
                      mod_desc: this.state.valoresEdicao.mod_desc,
                      mod_inicial: e.target.checked,
                    },
                  });
                }}
              />
              <label className="custom-control-label" htmlFor="mod_inicial">
                Modulo Inicial
              </label>
            </div>
          </div>
        </div>
        <div className="col-auto">
          {/* <Select
            placeholder="Selecione uma matéria"
            noOptionsMessage={() => "Sem opções!"}
            styles={customStyles}
            isMulti
            options={this.state.naoSelecionados}
            value={this.state.selecionados}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChange}
            id="select_modulos"
          /> */}
        </div>
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
            url="Modulos"
            body={this._bodyModal()}
            id_modal={"modal_modulos"}
            getDadosForm={this.getDataForm.bind(this)}
            list={this.listModulos.bind(this)}
            clickNovoCadastro={this.setDataForm.bind(this)}
          />
        </div>

        <div className="row row_card">
          {this.state.list.map((item, index) => (
            <Card
              content={item.mod_desc}
              id={item.mod_id}
              key={index}
              imagem={null}
              dataTarget="#modal_modulos"
              dataToggle="modal"
              ClickDelete={this.deleteModulo.bind(this, item.mod_id)}
              ClickList={this.listModulos.bind(this, item.mod_id)}
              dataWhatever={item.mod_id}
              id_modal={"modal_modulos"}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterModulos);
