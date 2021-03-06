import "./teacher.css";
import "../register.css";

import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { Card, Modal } from "../../../helpers/index";
import LocalStorage from "../../../factory/storage/index";
import Header from "../../../helpers/templates/header/header";
import { Requestor } from "../../../factory/requestor/requestor";
import Swal from "../../../helpers/swal/sawl";

class RegisterTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      valoresEdicao: {},
    };
    this.dataUserLogged = LocalStorage.getStorage();
    this.requestExecutor = new Requestor();
  }

  _listTeacher(id = false) {
    this.requestExecutor
      .get(`professor${id === false ? "" : `?id_professor=${id}`}`)
      .then((res) => res.json())
      .then((result) => {
        if (id != false) {
          this.setState({
            valoresEdicao: result.dados[0]
          })
        } else {
          this.setState({
            list: result.dados,
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  deleteTeacher(id) {
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
            .delete(`professor${id === false ? "" : `?id_professor=${id}`}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context._listTeacher();
              }
            });
        },
        this
      );
    } else {
      Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
    }
  }
  
  setDataForm(){
    this.setState({
      valoresEdicao: {},
    });
  }

  getDataForm() {
    let dadosFinais = new FormData();
    let id = document
      .querySelector(`#modal_teacher`)
      .getAttribute("data-id");
      document.querySelectorAll(".elementos").forEach((item) => {
        if (item) {
          dadosFinais.append(item.getAttribute("name"), item.value);
        } else Swal.alertMessage("Erro!", "Preencha todos os campos", "error");
      });
    if (id) {
      dadosFinais.append("id_professor", id);
    }
    return dadosFinais;
  }

  componentDidMount() {
    this._listTeacher();
  }

  render() {
    const bodyModal = () => (
      <form className="form-group">
        <input
          type="text"
          value={this.state.valoresEdicao.descricao_professor || ''}
          className="elementos form-control mt-3"
          name="descricao_usuario"
          placeholder="Nome Completo"
          onChange={(e) => {this.setState({
            valoresEdicao: {
              descricao_professor: e.target.value,
              nick_usuario: this.state.valoresEdicao.nick_usuario,
              email_usuario: this.state.valoresEdicao.email_usuario,
              senha_usuario: this.state.valoresEdicao.senha_usuario,
            }
          })}}
        />
        <input
          type="text"
          value={this.state.valoresEdicao.nick_usuario || ''}
          className="elementos form-control mt-3"
          name="nick_usuario"
          maxLength="30"
          placeholder="Apelido"
          onChange={(e) => {this.setState({
            valoresEdicao: {
              descricao_professor: this.state.valoresEdicao.descricao_professor,
              nick_usuario: e.target.value,
              email_usuario: this.state.valoresEdicao.email_usuario,
              senha_usuario: this.state.valoresEdicao.senha_usuario,
            }
          })}}
        />
        <input
          type="email"
          value={this.state.valoresEdicao.email_usuario || ''}
          className="elementos form-control mt-3"
          name="email_usuario"
          placeholder="Email"
          onChange={(e) => {this.setState({
            valoresEdicao: {
              descricao_professor: this.state.valoresEdicao.descricao_professor,
              nick_usuario: this.state.valoresEdicao.nick_usuario,
              email_usuario: e.target.value,
              senha_usuario: this.state.valoresEdicao.senha_usuario,
            }
          })}}

        />
        <input
          type="password"
          value={this.state.valoresEdicao.senha_usuario || ''}
          className="elementos form-control mt-3"
          name="senha_usuario"
          placeholder="Preencha se quiser redefinir senha"
          onChange={(e) => {this.setState({
            valoresEdicao: {
              descricao_professor: this.state.valoresEdicao.descricao_professor,
              nick_usuario: this.state.valoresEdicao.nick_usuario,
              email_usuario: this.state.valoresEdicao.email_usuario,
              senha_usuario: e.target.value
            }
          })}}

        />
      </form>
    );

    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          {
            this.dataUserLogged.tipo == 0 ?
              <Modal
                btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
                title={"Cadastro de Professor"}
                body={bodyModal()}
                list={this._listTeacher.bind(this)}
                url="professor"
                id_modal={"modal_teacher"}
                clickNovoCadastro={this.setDataForm.bind(this)}
                getDadosForm={this.getDataForm.bind(this)}
              />
              :
                ''
          }          
        </div>
        <div className="content_wrapper flex-start">
          {this.state.list.map((item, i) => (
            <Fragment key={i}>
              <Card
                content={item.nick_usuario}
                id={item.id_professor}
                key={item.id_professor}
                imagem={item.imagem}
                dataTarget="#modal_teacher"
                dataToggle="modal"
                ClickDelete={this.deleteTeacher.bind(this, item.id_professor)}
                ClickList={this._listTeacher.bind(this, item.id_professor)}
                dataWhatever={item.id_professor}
                id_modal={"modal_teacher"}
              />
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterTeacher);
