import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import "./alunos.css";
import "../register.css";
import { withRouter } from "react-router-dom";
import Header from "../../../helpers/templates/header/header";
import { Card, Modal } from "../../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "../../../helpers/swal/sawl";
import { Requestor } from "../../../factory/requestor/requestor";
class RegisterAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      classesSelecionadas: {},
      classesNaoSelecionadas: {},
      descricao_usu_aluno: "",
      nick_usuario: "",
      senha_usuario: "",
      email_usuario: "",
    };
    this.animatedComponents = makeAnimated();
    this.requestExecutor = new Requestor();
  }

  listAlunos(id = false) {
    this.requestExecutor
      .get(`aluno${id === false ? "" : `?id_aluno=${id}`}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          if (id) {
            this.setState({
              nick_usuario: result.dados[0].nick_usuario,
              descricao_usu_aluno: result.dados[0].descricao_usu_aluno,
              email_usuario: result.dados[0].email_usuario,
              senha_usuario: [],
              classesNaoSelecionadas: this.formataValores(result.classes, true)
                .naoSelecionados,
              classesSelecionadas: this.formataValores(result.classes, true)
                .selecionados,
            });
            console.log(result);
          } else {
            this.setState({
              list: result.dados,
            });
          }
        }
      })
      .catch((error) => console.log("error", error));
  }

  deleteAluno(id = 0) {
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
            .delete(`aluno${id === false ? "" : `?id_aluno=${id}`}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context.listAlunos();
              }
            });
        },
        this
      );
    } else {
      Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
    }
  }

  formataValores(dados, id = false) {
    let valoresSelecionados = [];
    let valoresNaoSelecionados = [];
    let valores = {};

    for (const i in dados) {
      const element = dados[i];
      if (!id) {
        valoresNaoSelecionados.push({
          value: element.id_classe,
          label: element.descricao_classe,
        });
      } else {
        if (element.id_alunos_classe != null) {
          valoresSelecionados.push({
            value: element.id_classe,
            label: element.descricao_classe,
          });
        }
        valoresNaoSelecionados.push({
          value: element.id_classe,
          label: element.descricao_classe,
        });
      }
    }

    valores["naoSelecionados"] =
      dados === "não tem dados" ? [] : valoresNaoSelecionados;
    valores["selecionados"] =
      dados === "não tem dados" ? [] : valoresSelecionados;
    return valores;
  }

  iniciaForm() {
    this.setState({
      classesSelecionadas: "",
      nick_usuario: "",
      email_usuario: "",
      senha_usuario: "",
      descricao_usu_aluno: ""
    });

    this.requestExecutor
      .get("aluno/buscaClasses")
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          classesSelecionadas: this.formataValores(result.dados, false)
            .selecionados,
          classesNaoSelecionadas: this.formataValores(result.dados, false)
            .naoSelecionados,
        })
      );
  }

  getDadosForm() {
    let dadosFinais = new FormData();
    let id = document.querySelector(`#modal_alunos`).getAttribute("data-id");
    let classes = []
    document.querySelectorAll(".elementos").forEach((item) => {
      if (item) {
        dadosFinais.append(item.getAttribute("name"), item.value);
      } else Swal.alertMessage("Erro!", "Preencha todos os campos", "error");
    });
    dadosFinais.append("id_classe", this.state.classesSelecionadas.value);
    if (id) {
      dadosFinais.append("id_aluno", id);
    }
    return dadosFinais;
  }

  componentDidMount() {
    this.listAlunos();
  }

  _bodyModal() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected ? "black" : null,
        padding: 5,
      }),
    };

    return (
      <div className="form-group">
        <div className="row">
          <div className="col-md-12">
            <Select
              placeholder="Selecione os classe"
              noOptionsMessage={() => "Sem opções!"}
              styles={customStyles}
              options={this.state.classesNaoSelecionadas}
              value={this.state.classesSelecionadas}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(value) =>
                this.setState({ classesSelecionadas: value })
              }
              name="classe"
              id="select_classe"
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              value={this.state.descricao_usu_aluno || ""}
              className="elementos form-control mt-3"
              name="descricao_usuario"
              placeholder="Descrição aluno"
              onChange={(e) => {
                this.setState({ descricao_usu_aluno: e.target.value });
              }}
            />

            <input
              type="text"
              value={this.state.nick_usuario || ""}
              className="elementos form-control mt-3"
              name="nick_usuario"
              maxLength="30"
              placeholder="Apelido"
              onChange={(e) => {
                this.setState({
                  nick_usuario: e.target.value,
                });
              }}
            />
            <input
              type="email"
              value={this.state.email_usuario || ""}
              className="elementos form-control mt-3"
              name="email_usuario"
              placeholder="Email"
              onChange={(e) => {
                this.setState({
                  email_usuario: e.target.value,
                });
              }}
            />
            <input
              type="password"
              value={this.state.senha_usuario || ""}
              className="elementos form-control mt-3"
              name="senha_usuario"
              placeholder="Preencha se quiser redefinir senha"
              onChange={(e) => {
                this.setState({
                  senha_usuario: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container__body">
        <Header />
        <div className=" row p-4 d-flex justify-content-end ">
          <Modal
            btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
            title={"Cadastro de Alunos"}
            body={this._bodyModal()}
            url="aluno"
            id_modal={"modal_alunos"}
            getDadosForm={this.getDadosForm.bind(this)}
            list={this.listAlunos.bind(this)}
            clickNovoCadastro={this.iniciaForm.bind(this)}
          />
        </div>

        <div className="row row_card">
          {this.state.list.map((item) => (
            <Card
              content={item.nick_usuario}
              id={item.id_aluno}
              imagem={item.imagem}
              key={item.id_aluno}
              dataTarget="#modal_alunos"
              dataToggle="modal"
              ClickDelete={this.deleteAluno.bind(this, item.id_aluno)}
              ClickList={this.listAlunos.bind(this, item.id_aluno)}
              dataWhatever={item.mod_id}
              id_modal={"modal_alunos"}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterAlunos);
