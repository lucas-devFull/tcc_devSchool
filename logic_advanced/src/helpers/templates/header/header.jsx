import "./header.css";
import React, { Component } from "react";
import Storage from "../../../factory/storage/index";
import { TeacherMenu, StudentMenu, AdminMenu } from "./menu/index";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgDefault from "../../../assets/user.jpg";
import ModalPerfil from "./modal_perfil/modalPerfil";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: null,
      typeUser: null,
    };
  }

  logout() {
    this.props.history.push("/");
    Storage.clearStorage();
  }

  typeUserRenderMenu(type) {
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

  componentDidMount() {
    let dataUser = Storage.getStorage("dataUser");
    this.setState({ typeUser: dataUser.tipo, imageProfile: dataUser.imagem });
  }

  render() {
    return (
      <>
        <ModalPerfil imagem={this.state.imagem} />
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
              {this.typeUserRenderMenu(this.state.typeUser)}
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
