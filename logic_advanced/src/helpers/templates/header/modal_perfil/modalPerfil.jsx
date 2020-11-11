import React, { Component } from "react";
import "./modalPerfil.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Requestor } from "../../../../factory/requestor/requestor";
import Swal from "../../../../helpers/swal/sawl";
import LocalStorage from "../../../../factory/storage/index";
import { Link, withRouter } from "react-router-dom";

class ModalPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoresEdicao: {},
    };
    this.dataUserLogged = LocalStorage.getStorage();
    this.requestExecutor = new Requestor();
  }

  trocaImagem(imagem){
    console.log(imagem);
    document.getElementsByClassName(".imagem_usuario")
    return console.log(document.querySelectorAll(".imagem_perfil")[0].setAttribute("src", imagem.name))

  }

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="modalPerfil"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex={-1}
          aria-labelledby="modalPerfilLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg"
            id="modal_perfil"
            data-id={this.dataUserLogged.id}
            data-id-tipo-usuario={this.dataUserLogged.tipo}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalPerfilLabel">
                  Perfil Usuário
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <FontAwesomeIcon icon="times" />
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 form-group formata_imagem">
                      <div className="margin">
                        <div className="panel panel-default">
                          <div className="imagem_usuario">
                            <img
                              className="imagem_perfil"
                              src={
                                "data:image/png;base64," +
                                this.dataUserLogged.imagem
                              }
                              alt=" Perfil Usuário"
                            />
                          </div>
                          <div className="input_imagem_usuario">
                            <span className="file_imagem" >
                              <FontAwesomeIcon icon="camera" />
                            </span>
                            <input
                              type="file"
                              name=""
                              id="img_usuario"
                              accept="image/*"
                              onChange={(e) => this.trocaImagem(e.target.files[0])}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <input
                        type="text"
                        value={this.dataUserLogged.descricao_usuario || ""}
                        className="modalPerfil form-control"
                        name="descricao_usuario"
                        placeholder="Nome Completo"
                        onChange={(e) => {}}
                      />
                      <input
                        type="text"
                        value={this.dataUserLogged.nick_usuario || ""}
                        className="modalPerfil form-control"
                        name="nick_usuario"
                        placeholder="Apelido"
                        onChange={(e) => {}}
                      />
                      <input
                        type="email"
                        value={this.dataUserLogged.email_usuario || ""}
                        className="modalPerfil form-control"
                        name="email_usuario"
                        placeholder="Email"
                        onChange={(e) => {}}
                      />
                      <input
                        type="password"
                        value={this.dataUserLogged.senha_usuario || ""}
                        className="modalPerfil form-control"
                        name="senha_usuario"
                        placeholder="Digite uma senha"
                        onChange={(e) => {}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  //   onClick={this.handleSubmit.bind(this)}
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ModalPerfil);
