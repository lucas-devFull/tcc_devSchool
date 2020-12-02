import React, { Component } from "react";
import Select from "react-select";
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
// import Select from "../../helpers/select/select";

class Graficos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classesNaoSelecionados: [],
      materiasNaoSelecionados: [],
      moduloNaoSelecionados: [],
      moduloSelecionados: [],
      materiasSelecionadas: [],
      classesSelecionados: [],
      aulasSelecionadas: [],
      aulaNaoSelecionados: [],
      dataGraficos: [],
    };
    this.dataUserLogged = Storage.getStorage();
    this.requestExecutor = new Requestor();
  }

  formataValores(dados, id) {
    // let selecionados = [];
    let naoSelecionados = [];
    let retorno = {};

    for (const i in dados) {
      switch (id) {
        case "modulos":
          naoSelecionados.push({
            value: dados[i].mod_id,
            label: dados[i].mod_desc,
          });
          break;
        case "materias":
          naoSelecionados.push({
            value: dados[i].id_materia,
            label: dados[i].descricao_materia,
          });
          break;
        case "classe":
          naoSelecionados.push({
            value: dados[i].id_classe,
            label: dados[i].descricao_classe,
          });
          break;
        case "aula":
          naoSelecionados.push({
            value: dados[i].aula_id,
            label: dados[i].aula_descricao,
          });
          break;
      }
    }

    // retorno["naoSelecionados"] = naoSelecionados;
    // retorno["selecionados"] = [];
    return naoSelecionados;
  }

  list(url, selecao) {
    this.requestExecutor
      .get(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          switch (selecao) {
            case "modulos":
              this.setState({
                moduloNaoSelecionados: this.formataValores(
                  result.dados,
                  "modulos"
                ),
                moduloSelecionados: [],
                materiasSelecionadas: [],
                aulasSelecionadas: [],
                classesSelecionados: [],
                materiasNaoSelecionados: [],
                classesNaoSelecionados: [],
                aulaNaoSelecionados: [],
              });
              break;
            case "classe":
              this.setState({
                classesNaoSelecionados: this.formataValores(
                  result.dados,
                  "classe"
                ),
              });
              break;
            case "materias":
              this.setState({
                materiasNaoSelecionados: this.formataValores(
                  result.dados,
                  "materias"
                ),
                materiasSelecionadas: [],
              });
              break;
            case "aula":
              this.setState({
                aulaNaoSelecionados: this.formataValores(result.dados, "aula"),
              });
              break;
          }
        }
      })
      .catch((error) => console.log("error", error));
  }

  montaGrafico(dados) {
    this.setState({
      dataGraficos: dados,
    });
  }
  setDataForm() {
    this.list("modulos", "modulos");
  }

  getDataForm() {
    let dadosFinais = new FormData();
    dadosFinais.append("mod_id", this.state.moduloSelecionados.value);
    dadosFinais.append("id_classe", this.state.classesSelecionados.value);
    dadosFinais.append("id_materia", this.state.materiasSelecionadas.value);
    dadosFinais.append("aula_id_materia", this.state.aulasSelecionadas.value);
    return dadosFinais;
  }

  _bodyModal() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected ? "black" : null,
        padding: 5,
      }),
    };
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-md-12">
            <Select
              placeholder="Selecione os Modulos"
              noOptionsMessage={() => "Sem opções!"}
              styles={customStyles}
              options={this.state.moduloNaoSelecionados}
              value={this.state.moduloSelecionados}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(value) => (
                this.setState({
                  moduloSelecionados: value,
                  classesNaoSelecionados: [],
                  materiasNaoSelecionados: [],
                  materiasSelecionadas: [],
                  classesSelecionados: [],
                  aulasSelecionadas: [],
                  aulaNaoSelecionados: [],
                }),
                this.list(
                  `materias/materiasPorModulo?mod_id=${value.value}`,
                  "materias"
                )
              )}
              name="modulos"
              id="select_modulos"
            />
          </div>

          <div className="col-md-12 mt-4">
            <Select
              placeholder="Selecione as Matérias"
              noOptionsMessage={() => "Sem opções!"}
              styles={customStyles}
              options={this.state.materiasNaoSelecionados}
              value={this.state.materiasSelecionadas}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(value) => (
                this.setState({
                  materiasSelecionadas: value,
                  classesNaoSelecionados: [],
                  classesSelecionados: [],
                  aulasSelecionadas: [],
                  aulaNaoSelecionados: [],
                }),
                this.list(
                  `materias/aulaPorMateria?aula_id_materia=${value.value}`,
                  "aula"
                ),
                this.list(
                  `materias/classePorMateria?id_materia=${value.value}`,
                  "classe"
                )
              )}
            />
          </div>
          <div className="col-md-12 mt-4">
            <Select
              placeholder="Selecione as Atividades"
              noOptionsMessage={() => "Sem opções!"}
              styles={customStyles}
              options={this.state.aulaNaoSelecionados}
              value={this.state.aulasSelecionadas}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(value) => this.setState({ aulasSelecionadas: value })}
            />
          </div>
          <div className="col-md-12 mt-4">
            <Select
              placeholder="Selecione as Classes"
              noOptionsMessage={() => "Sem opções!"}
              styles={customStyles}
              options={this.state.classesNaoSelecionados}
              value={this.state.classesSelecionados}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(value) =>
                this.setState({ classesSelecionados: value })
              }
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
            callback={(e) => {
              this.montaGrafico(e);
            }}
            clickNovoCadastro={this.setDataForm.bind(this)}
            btnFinalizar="Gerar Relatório"
          />
        </div>
        <div className="div_antes_grafico">
          <p> Selecione os filtros e gere seu Relatório</p>
        </div>
        {this.state.dataGraficos.length > 0 ? (
          <div className="box_grafico">
            <div className="div_box_grafico">
              <div className="div_grafico">
                <Chart
                  width={"100%"}
                  height={"100%"}
                  margin={"0em 1em"}
                  chartType="Bar"
                  loader={<div> Carregando Gráfico ....</div>}
                  data={this.state.dataGraficos}
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Graficos);
