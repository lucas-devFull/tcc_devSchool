import "./header.css";
import React, { Component } from "react";
import Storage from "../../../factory/storage/index";
import { TeacherMenu, StudentMenu, AdminMenu } from "./menu/index";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgDefault from "../../../assets/user.jpg";
import ModalPerfil from "./modal_perfil/modalPerfil";
import Swal from "../../swal/sawl";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: null,
      tipo_usuario: null,
      descricao_usuario: null,
      senha_usuario: null,
      id_usuario: null,
      email_usuario: null,
      nick_usuario: null,
    };
  }

  logout() {
    this.props.history.push("/");
    Storage.clearStorage();
  }

  tipo_usuarioRenderMenu(type) {
    switch (type) {
      case "0":
      case "1":
        return <TeacherMenu tipo={type} />;
      case "2":
        return <StudentMenu />;
    }
  }

  renderImageProfile(imageProfile) {
    return imageProfile ? `data:image/png;base64,${imageProfile}` : ImgDefault;
  }

  alterarUsuario() {
    let dadosFinais = new FormData();
    document.querySelectorAll(".modalPerfil").forEach((item) => {
      if (item) {
        dadosFinais.append(item.getAttribute("name"), item.value);
      } else Swal.alertMessage("Erro!", "Preencha todos os campos", "error");
    });
    dadosFinais.append("id_usuario", this.state.id_usuario);
    dadosFinais.append("tipo_usuario", this.state.tipo_usuario);
    return dadosFinais;
  }

  componentDidMount() {
    let dataUser = Storage.getStorage("dataUser");
    console.log(dataUser);
    this.setState({
      imageProfile: dataUser.imagem,
      tipo_usuario: dataUser.tipo,
      descricao_usuario: dataUser.descricao_usuario,
      senha_usuario: "",
      id_usuario: dataUser.id,
      email_usuario: dataUser.email_usuario,
      nick_usuario: dataUser.nick_usuario,
    });
  }

  bodyModal() {
    return (
      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <input
          type="text"
          value={this.state.descricao_usuario || ""}
          className="modalPerfil form-control"
          name="descricao_usuario"
          placeholder="Nome Completo"
          onChange={(e) =>
            this.setState({
              descricao_usuario: e.target.value,
            })
          }
        />
        <input
          type="text"
          value={this.state.nick_usuario || ""}
          className="modalPerfil form-control"
          name="nick_usuario"
          placeholder="Apelido"
          onChange={(e) =>
            this.setState({
              nick_usuario: e.target.value,
            })
          }
        />
        <input
          type="email"
          value={this.state.email_usuario || ""}
          className="modalPerfil form-control"
          name="email_usuario"
          placeholder="Email"
          onChange={(e) =>
            this.setState({
              email_usuario: e.target.value,
            })
          }
        />
        <input
          type="password"
          value={this.state.senha_usuario || ""}
          className="modalPerfil form-control"
          name="senha_usuario"
          placeholder="Preencha se quiser redefinir senha"
          onChange={(e) =>
            this.setState({
              senha_usuario: e.target.value,
            })
          }
        />
      </div>
    );
  }

  render() {
    return (
      <>
        <ModalPerfil
          imagem={this.state.imagem}
          body={this.bodyModal()}
          dadosForm={this.alterarUsuario.bind(this)}
          logout={this.logout.bind(this)}
        />

        <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
          <a className="navbar-brand ml-3" href="#">
            Logic Advanced
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <FontAwesomeIcon icon="home" />
                  &nbsp;Home
                </Link>
              </li>
              {this.tipo_usuarioRenderMenu(this.state.tipo_usuario)}
            </ul>
            <div className="botoes_sair_perfil">
              <div className="div_img_header">
                <img
                  className="img_header"
                  data-toggle="modal"
                  data-target="#modalPerfil"
                  src={this.renderImageProfile(this.state.imageProfile)}
                  alt=""
                />
              </div>
              <button
                className="btn btn-danger my-2 my-sm-0"
                type="button"
                onClick={this.logout.bind(this)}
              >
                Sair
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default withRouter(Header);
