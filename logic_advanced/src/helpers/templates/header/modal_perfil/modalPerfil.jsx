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

  ImagePreview() {
    var preview = document.querySelector(".imagem_perfil");
    var file = document.querySelector("#img_usuario").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async logout(){
    document.querySelector("#fecharModal").click(function(){})
    this.props.logout()
  }

  handleSubmit() {
    let dados = this.props.dadosForm();
    dados.append("imagem_usuario", document.querySelector("#img_usuario").files[0])
    this.requestExecutor.post("usuario", dados)
    .then(res => res.json())
    .then(result => {
      if (result.status) {
        Swal.alertMessage("Sucesso!", "Alterações feitas com sucesso", "success", "", {Ok: { className: "button_info" }}, {}, this.logout.bind(this));
      }else{
        Swal.alertMessage("Erro!", result.msg, "warning");
      }
    });
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
                            <span className="file_imagem">
                              <FontAwesomeIcon icon="camera" />
                            </span>
                            <input
                              type="file"
                              name=""
                              id="img_usuario"
                              accept="image/*"
                              onChange={(e) => this.ImagePreview()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {this.props.body}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  id="fecharModal"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleSubmit.bind(this)}
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
