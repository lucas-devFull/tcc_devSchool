import React, { Component } from "react";
// import Select from "react-select";
import "./graficos.css";
import "../register/register.css";
import { withRouter } from "react-router-dom";
import Header from "../../helpers/templates/header/header";
import { Modal } from "../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Storage from "../../factory/storage/index";
import Swal from "../../helpers/swal/sawl";
import { Requestor } from "../../factory/requestor/requestor";
import Chart from "react-google-charts";
import Select from "../../helpers/select/select";

class Graficos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classesSelecionados: [],
      classesNaoSelecionados: [],
      valoresFiltros: [],
    };
    this.dataUserLogged = Storage.getStorage();
    this.requestExecutor = new Requestor();
    this.onChange = this.onChange.bind(this);
  }

  listMaterias(dados) {
    let materiasSelecionadas = [];
    let materiasNaoSelecionadas = [];
    let retorno = {};

    for (const i in dados) {
      if (dados[i].id_modulo != null) {
        materiasSelecionadas.push({
          value: dados[i].id_materia,
          label: dados[i].descricao_materia,
        });
      }
      materiasNaoSelecionadas.push({
        value: dados[i].id_materia,
        label: dados[i].descricao_materia,
      });
    }
    retorno["naoSelecionados"] = materiasNaoSelecionadas;
    retorno["selecionados"] = materiasSelecionadas;
    return retorno;
  }

  listModulos(id = false) {
    this.requestExecutor
      .get(`modulos`)
      .then((res) => res.json())
      .then((result) => {
        if (id) {
          // this.setState({
            // valoresEdicao: dados[0],
          // });
        } else {
          // this.setState({
            // list: dados,
          // });
        }
        Swal.alertMessage("Erro!", result.message, "error");
      })
      .catch((error) => console.log("error", error));
  }

  onChange(value, { action, removedValue }) {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        this.setState({
          selecionados: [],
        });
        break;
    }

    this.setState({ selecionados: value });
  }

  deleteModulo(id) {
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
            .delete(`modulos${id === false ? "" : `?mod_id=${id}`}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                  Ok: { className: "button_info" },
                });
                context.listModulos();
              }
            });
        },
        this
      );
    } else {
      Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
    }
  }
  setDataForm() {
    let id = document.querySelector(`#modal_graficos`).getAttribute("data-id");

    if (!id) {
      this.setState({
        classesSelecionados: {},
        classesNaoSelecionados: {},
      });
    }
  }

  getDataForm() {
    let dadosFinais = new FormData();
    let id = document.querySelector(`#modal_graficos`).getAttribute("data-id");
    return dadosFinais;
  }

  listClasses() {
    this.requestExecutor
      .get("classe")
      .then((res) => res.json())
      .then((result) => {
        // this.setState({
        // classesSelecionados
        // })
      });
  }

  _bodyModal() {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-md-12 mt-4">
            <small id="emailHelp" className="form-text text-light">
              {" "}
              * Campo obrigatório{" "}
            </small>
            <Select
              placeholder={"Selecione os Modulos"}
              id_name="select_modulos"
              name="Modulos"
            />
          </div>

          <div className="col-md-12 mt-4">
            <Select
              placeholder={"Selecione as Matérias"}
              id_name="select_moaterias"
              name="materias"
            />
          </div>
          <div className="col-md-12 mt-4">
            <Select
              placeholder={"Selecione as classes"}
              id_name="select_classes"
              name="classes"
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="container__body">
        <Header />
        <div className="p-4 d-flex justify-content-end ">
          <Modal
            btnName={<FontAwesomeIcon icon="filter" size="2x" />}
            title={"Filtros para Gráficos"}
            url="graficos"
            body={this._bodyModal()}
            id_modal={"modal_graficos"}
            getDadosForm={this.getDataForm.bind(this)}
            list={() => {}}
            clickNovoCadastro={this.setDataForm.bind(this)}
            btnFinalizar="Gerar Relatório"
          />
        </div>
        <div className="div_antes_grafico">
          <p> Selecione os filtros e gere seu Relatório</p>
        </div>
        <div className="box_grafico">
          <div className="div_box_grafico">
            <div className="div_grafico">
              <Chart
                width={"100%"}
                height={"100%"}
                margin={"0em 1em"}
                chartType="Bar"
                loader={<div> Carregando Gráfico ....</div>}
                data={[
                  [
                    "Tentativas de Envios por Atividade",
                    "Carlos",
                    "Diego",
                    "Oscar",
                    "Rodrigo",
                  ],
                  ["mateira", 10, 5, 7, 8],
                ]}
                options={{
                  backgroundColor: "red",
                  chart: {
                    title: "Relatorio de Atividades",
                    subtitle: "Aula: " + "Logica de programação",
                  },
                }}
                rootProps={{ "data-testid": "2" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Graficos);
