import React, { Component } from "react";
import "./modulos.css";
import "../register/register.css";
import { withRouter } from "react-router-dom";
import Header from "../../helpers/templates/header/header";
import { Card, Elements, Modal } from "../../helpers/index";
// import { Modal } from "./modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Storage from "../../factory/storage/index";
import Modulos from "./storage";
import Swal from "../../helpers/swal/sawl";

class RegisterModulos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listMaterias: [],
      editaModulo:[]
    };
    this.dataUserLogged = Storage.getStorage();
  }

  listMaterias(dados){
    let materiasSelecionadas = []
    let materiasNaoSelecionadas = []
    let retorno = {}

    for (const i in dados) {
      if(dados[i].id_modulo == null){
        materiasNaoSelecionadas.push(dados[i]);
      }else{
        materiasSelecionadas.push(dados[i]);
      }
    }
    retorno['naoSelecionados'] = materiasNaoSelecionadas;
    retorno['selecionados'] = materiasSelecionadas;
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
              editaModulo: result.dados
            });
          } else {
            let materias = this.listMaterias(result.materias);
            this.setState({
              list: result.dados,
              listMaterias: materias
            });
          }
        }else{
          Swal.alertMessage('Erro!', result.message, 'error');
        }
      })
      .catch((error) => console.log("error", error));
  }

  setModulo(id = false) {
    // let dados = {
    //     id_modulo:id,
    //     descricao_modulo: "teste",
    //     modulo_inicial:1
    // }
    console.log("to aqui");

    // Modulos.setModulo(this.dataUserLogged.token, id)
    // .then(res => res.json())
    // .then(result =>{
    //     console.log(result);
    // })
    // .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.listModulos(this.dataUserLogged.token);
  }

  render() {
    const bodyModal = () => (
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
              <label className="custom-control-label" htmlFor="customControlAutosizing">
                Modulo Inicial
              </label>
            </div>
          </div>
        </div>
        <Elements naoSelecionados={this.state.listMaterias.naoSelecionados} selecionados={this.state.listMaterias.selecionados} />
      </div>
    );
    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          <Modal
            btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
            title={"Cadastro de Modulos"}
            body={bodyModal()}
            url="Modulos"
          />
        </div>

        <div className="content_wrapper flex-start overflow-auto">
          {this.state.list.map((item) => (
            <Card
              content={item.descricao_modulo}
              id={item.id_modulo}
              key={item.id_modulo}
              dataTarget="#staticBackdrop"
              dataToggle="modal"
              onClick={this.listModulos.bind(
                this,
                this.dataUserLogged.token,
                item.id_modulo,
              )}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterModulos);
