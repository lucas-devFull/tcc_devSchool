import "./modal.css";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Requestor } from "../../factory/requestor/requestor";
import Swal from "../../helpers/swal/sawl";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.executeRequestor = new Requestor();
  }


  setNullValoresInput(){
    document.querySelectorAll("#"+this.props.id_modal)[0].setAttribute("data-id", "");
    this.props.clickNovoCadastro();
  }

  handleSubmit() {
    let dadosPost = this.props.getDadosForm();
    this.executeRequestor.post(this.props.url, dadosPost)
    .then(res => res.json())
    .then(result => {
      if (result.status) {
        Swal.alertMessage("Sucesso!", "Informações recebidas com sucesso", "success", "", {Ok: { className: "button_info" }});
        if(this.props.list != null){
          this.props.list()
        }

        if(this.props.callback != null){
          this.props.callback(result.dados)
        }
      }else{
        Swal.alertMessage("Atenção!", result.msg, "warning", "", {Ok: { className: "button_info" }});
      }
    });
  }

  render() {
    const {
      btnName,
      title,
      body,
      id_modal
    } = this.props;
    return (
      <div>
        <button
          type="button"
          className="btn btn-light"
          data-toggle="modal"
          data-target={`#${id_modal}`}
          onClick={() => this.setNullValoresInput()}
        >
          {btnName}
        </button>
        <div
          className="modal fade"
          id={id_modal}
          data-backdrop="static"
          data-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          data-id=""
        >
          <div className="modal-dialog modal-lg" id={"base_"+id_modal} >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  {title}
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
                {body}
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
                  onClick={this.handleSubmit.bind(this)}
                >
                  {(this.props.btnFinalizar == null) ? "Cadastrar" : this.props.btnFinalizar}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
