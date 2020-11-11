import React, { Component } from "react";
import "./materias.css";
import "../register.css";
import { withRouter } from "react-router-dom";
import Header from "../../../helpers/templates/header/header";
import { Card, Modal } from "../../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Materias from "./storage";
import Swal from "../../../helpers/swal/sawl";
import { Requestor } from "../../../factory/requestor/requestor";
class RegisterMaterias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.requestExecutor = new Requestor();
  }

  listMaterias(id = false) {
    this.requestExecutor
      .get(`materias${id === false ? "" : `?id_materia=${id}`}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          if (id) {
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

  setMateria(dados) {
    Materias.setMateria(this.dataUserLogged.token, dados);
  }

  deleteMateria(id = 0) {
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
          context.requestExecutor.delete(`materias${id === false ? "" : `?id_materia=${id}`}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context.listMaterias();
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
      </div>
    );
  }

  componentDidMount() {
    this.listMaterias();
  }

  render() {
    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          <Modal
            btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
            title={"Cadastro de Materias"}
            body={this._bodyModal()}
            url="Materias"
          />
        </div>

        <div className="row row_card">
          {this.state.list.map((item) => (
            <Card
              content={item.descricao_materia}
              id={item.id_materia}
              key={item.id_materia}
              dataTarget="#staticBackdrop"
              dataToggle="modal"
              ClickDelete={this.deleteMateria.bind(this, item.id_materia)}
              ClickList={this.listMaterias.bind(this, item.id_materia)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterMaterias);
