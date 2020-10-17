import React, { Component } from "react";
import "./modulos.css";
import "../register/register.css";
import { withRouter } from "react-router-dom";
import Header from "../../helpers/templates/header/header";
import { Card } from "../../helpers/index";
import { Modal } from "./modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Storage from "../../factory/storage/index";
import Modulos from "./storage";

class RegisterModulos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.dataUserLogged = Storage.getStorage();
  }

  listModulos(token, id = false) {
    Modulos.getModulos(token, id)
      .then((res) => res.json())
      .then((result) => {
        if (id) {      
          console.log(result.dados);
        }else{
          this.setState({
            list: result.dados,
          });
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
    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          <Modal
            token={this.dataUserLogged.token}
            userLogged
            btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
            title="Cadastro de Modulos"
          />
        </div>

        <div className="content_wrapper_dashboard flex-start">
          {this.state.list.map((item) => (
            <Card
              content={item.descricao_modulo}
              id={item.id_modulo}
              key={item.id_modulo}
              onClick={this.listModulos.bind(this, this.dataUserLogged.token, item.id_modulo)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterModulos);
