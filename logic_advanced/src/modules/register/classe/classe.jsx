import React, { Component } from "react";
import Select from "react-select";
import "./classe.css";
import "../register.css";
import { withRouter } from "react-router-dom";
import Header from "../../../helpers/templates/header/header";
import { Card, Modal } from "../../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Storage from "../../../factory/storage/index";
import Swal from "../../../helpers/swal/sawl";
import { Requestor } from "../../../factory/requestor/requestor";

class RegisterClasse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      materiasSelecionados: [],
      materiasNaoSelecionados: [],
      alunosSelecionados: [],
      alunosNaoSelecionados: [],
      valoresEdicao: {},
    };
    this.dataUserLogged = Storage.getStorage();
    this.requestExecutor = new Requestor();
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, { action, removedValue, name }) {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        if (name == "materias") {
          this.setState({
            materiasSelecionados: [],
          });
        } else {
          this.setState({
            alunosSelecionados: [],
          });
        }
        break;
    }

    if (name == "materias") {
      this.setState({ materiasSelecionados: value });
    } else {
      this.setState({ alunosSelecionados: value });
    }
  }

  listClasse(id = false) {
    this.requestExecutor
      .get(`classe${id === false ? "" : `?id_classe=${id}`}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          if (id) {
            let valoresMaterias = this.formataValores(
              result.materias,
              "materias"
            );
            let valoresAlunos = this.formataValores(result.alunos, "alunos");
            this.setState({
              valoresEdicao: result.dados[0],
              materiasNaoSelecionados: valoresMaterias.naoSelecionados,
              materiasSelecionados: valoresMaterias.selecionados,
              alunosNaoSelecionados: valoresAlunos.naoSelecionados,
              alunosSelecionados: valoresAlunos.selecionados,
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

  deleteClasse(id) {
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
            .delete(`classe${id === false ? "" : `?id_classe=${id}`}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context.listClasse();
              }
            });
        },
        this
      );
    } else {
      Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
    }
  }

  pegaDadosSelect(){
    let valoresSelecionados = []
    let materias = []
    let alunos = []
    for (const i in this.state.materiasSelecionados) {
        materias.push(this.state.materiasSelecionados[i].value)
    }

    for (const i in this.state.alunosSelecionados) {
      alunos.push(this.state.alunosSelecionados[i].value)
  }
    valoresSelecionados['materias'] = materias;
    valoresSelecionados['alunos'] = alunos;
    return valoresSelecionados;
  }

  formataValores(dados, tipo) {
    let valores = [];
    let valoresSelecionados = [];
    let valoresNaoSelecionados = [];
    if (tipo == "materias") {
      for (const i in dados) {
        if (dados[i].id_classe != null) {
          valoresSelecionados.push({
            value: dados[i].id_materia,
            label: dados[i].descricao_materia,
          });
        }

        valoresNaoSelecionados.push({
          value: dados[i].id_materia,
          label: dados[i].descricao_materia,
        });
      }
    } else {
      for (const i in dados) {
        if (dados[i].id_classe != null) {
          valoresSelecionados.push({
            value: dados[i].id_aluno,
            label: dados[i].descricao_usu_aluno,
          });
        }
        valoresNaoSelecionados.push({
          value: dados[i].id_aluno,
          label: dados[i].descricao_usu_aluno,
        });
      }
    }
    valores["selecionados"] = valoresSelecionados;
    valores["naoSelecionados"] = valoresNaoSelecionados;
    return valores;
  }

  setDataForm() {
    let id = document.querySelector(`#modal_classe`).getAttribute("data-id");

    if (!id) {
      this.setState({
        valoresEdicao: {},
        materiasSelecionados: [],
        alunosSelecionados: [],
      });
    }

    this.requestExecutor
      .get("classe/pegaMateriasEAlunos")
      .then((res) => res.json())
      .then((result) => {
        let valoresMaterias = this.formataValores(result.materias, "materias");
        let valoresAlunos = this.formataValores(result.alunos, "alunos");
        this.setState({
          materiasNaoSelecionados: valoresMaterias.naoSelecionados,
          alunosNaoSelecionados: valoresAlunos.naoSelecionados,
        });
      });
  }

  getDataForm() {
    let dadosFinais = new FormData();
    let id = document.querySelector(`#modal_classe`).getAttribute("data-id");
    let dadosSelect = this.pegaDadosSelect();
    dadosFinais.append("descricao_classe", document.querySelectorAll("#descricao_classe")[0].value)
    dadosFinais.append("id_materia", dadosSelect.materias)
    dadosFinais.append("id_aluno", dadosSelect.alunos)
    if (id) {
      dadosFinais.append("id_classe", id);
    }

    return dadosFinais;
  }

  componentDidMount() {
    this.listClasse();
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
          <div className="col-md-12">
            <input
              type="text"
              value={this.state.valoresEdicao.descricao_classe || ""}
              className="elementos form-control mt-3"
              name="descricao_classe"
              id="descricao_classe"
              placeholder="Descricao Modulo"
              onChange={(e) => {
                this.setState({
                  valoresEdicao: {
                    descricao_classe: e.target.value,
                  },
                });
              }}
            />
          </div>

          <div className="col-md-12 mt-3">
            <Select
              placeholder="Selecione as matérias"
              noOptionsMessage={() => "Sem opções!"}
              styles={customStyles}
              isMulti
              options={this.state.materiasNaoSelecionados}
              value={this.state.materiasSelecionados}
              className="basic-multi-select"
              classNamePrefix="select"
              name="materias"
              onChange={this.onChange}
              id="select_modulos"
            />
          </div>
        </div>
        <div className="col-auto">
          <Select
            placeholder="Selecione os alunos"
            noOptionsMessage={() => "Sem opções!"}
            styles={customStyles}
            isMulti
            options={this.state.alunosNaoSelecionados}
            value={this.state.alunosSelecionados}
            className="basic-multi-select"
            classNamePrefix="select"
            name="alunos"
            onChange={this.onChange}
            id="select_alunos"
          />
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
            title={"Cadastro de Classe"}
            url="classe"
            body={this._bodyModal()}
            id_modal={"modal_classe"}
            getDadosForm={this.getDataForm.bind(this)}
            list={this.listClasse.bind(this)}
            clickNovoCadastro={this.setDataForm.bind(this)}
          />
        </div>

        <div className="row row_card">
          {this.state.list.map((item, index) => (
            <Card
              content={item.descricao_classe}
              id={item.id_classe}
              key={index}
              imagem={null}
              dataTarget="#modal_classe"
              dataToggle="modal"
              ClickDelete={this.deleteClasse.bind(this, item.id_classe)}
              ClickList={this.listClasse.bind(this, item.id_classe)}
              dataWhatever={item.id_classe}
              id_modal={"modal_classe"}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterClasse);
