import "./teacher.css";
import "../register.css";

import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

// import {Modal} from './modal/modal';
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
    };
    this.dataUserLogged = LocalStorage.getStorage();
    this.requestExecutor = new Requestor();
  }

  _listTeacher() {
    this.requestExecutor
      .get("professor")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          list: result.dados,
        });
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
          context.requestExecutor.delete(`professor${id === false ? "" : `?id_professor=${id}`}`)
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

  editTeacher() {
    alert("ainda fazer");
  }

  componentDidMount() {
    this._listTeacher();
  }

  render() {
    const bodyModal = () => (
      <form className="form-group">
        <input
          type="text"
          className="elementos form-control mt-3"
          name="descricao_usuario"
          placeholder="Nome Completo"
        />
        <input
          type="text"
          className="elementos form-control mt-3"
          name="nick_usuario"
          placeholder="Apelido"
        />
        <input
          type="email"
          className="elementos form-control mt-3"
          name="email_usuario"
          placeholder="Email"
        />
        <input
          type="password"
          className="elementos form-control mt-3"
          name="senha_usuario"
          placeholder="Digite uma senha"
        />
      </form>
    );

    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          <Modal
            btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
            title={"Cadastro de Professor"}
            body={bodyModal()}
            url="professor"
          />
          {/* <Modal
                        token={this.dataUserLogged.token}  
                        btnName={ <FontAwesomeIcon icon="user-plus" size="2x"/>}
                        title="Cadastro de Professor"
                    /> */}
        </div>
        <div className="content_wrapper flex-start overflow-auto">
          {this.state.list.map((item, i) => (
            <Fragment key={i}>
              <Card
                content={item.descricao_professor}
                id={item.id_professor}
                key={item.id_professor}
                dataTarget="#staticBackdrop"
                dataToggle="modal"
                ClickDelete={this.deleteTeacher.bind(
                  this,
                  item.id_professor
                )}
                ClickList={this._listTeacher.bind(
                  this,
                  this.dataUserLogged.token,
                  item.id_professor
                )}
              />
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterTeacher);
