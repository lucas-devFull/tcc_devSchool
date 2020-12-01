import './dashboard.css';
import $ from 'jquery';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

import LocalStorage from '../../factory/storage/index';
import Header from '../../helpers/templates/header/header';
import { Modal } from '../../helpers/index';
import DashStorage from './storage';
import { Accordion } from './accordion/accordion';
import { Requestor } from "../../factory/requestor/requestor";

export default class Dashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            materias: [],
            selecionados: [],
            valueModule: null,
            optionsModules: [],
        }
        this.onChange = this._onChange.bind(this);
        this.requestExecutor = new Requestor();

        this.dataUserLogged = LocalStorage.getStorage();

    }

    getAccordion() {
        DashStorage.getMaterias()
            .then(data => {
                this.setState(!data.status ? { materias: [] } : { materias: data.dados })
            })
            .catch(error => console.log(error));
    }

    getModulos() {
        DashStorage.getModulos()
            .then(resp => {
                let valueModule = [];
                let dataModules = resp.dados;
                dataModules.map(item => valueModule.push({ label: item.mod_desc, value: item.mod_id }));
                this.setState({ optionsModules: valueModule });
            })
            .catch(error => console.log(error));
    }

    _onChange(target) {
        this.setState({ valueModule: target });
    }

    _bodyModal() {
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "black" : state.isFocused ? "white" : "black",
                backgroundColor: state.isSelected
                    ? "white"
                    : state.isFocused
                        ? "#282828"
                        : null,
                padding: 5,
            }),
        };
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="elementos form-control mt-3"
                            name="descricao_materia"
                            placeholder="Descricao Matéria"
                            id={'descricao_materia'}
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <Select
                        placeholder="Selecione um Módulo"
                        noOptionsMessage={() => "Sem opções!"}
                        styles={customStyles}
                        options={this.state.optionsModules}
                        value={this.state.valueModule}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this._onChange.bind(this)}
                        id="select_modulos"
                    />
                </div>
            </div>
        );
    }

    _setDataForm() {
        let id = document
            .querySelector(`#modal_disciplina`)
            .getAttribute("data-id");

        if (!id) {
            this.setState({
                valoresEdicao: {},
            });
        }
    }

    getDataForm() {
        let dadosFinais = new FormData();
        let id = document.querySelector('#modal_disciplina').getAttribute("data-id");
        dadosFinais.append("descricao_materia", document.querySelector('#descricao_materia').value);
        dadosFinais.append("id_modulo", this.state.valueModule.value);
        dadosFinais.append("tipo_usuario", this.dataUserLogged.tipo);
        dadosFinais.append("id_usuario", this.dataUserLogged.id);
        
        if (id) {
            dadosFinais.append("id_materia", id);
        }

        return dadosFinais;
    }

    componentDidMount() {
        this.getAccordion();
        this.getModulos();
    }

    render() {
        const { materias } = this.state;
        return (
            <>
                <div className="container__body">
                    <Header />
                    <div className="p-4 d-flex justify-content-end ">
                        {
                            this.dataUserLogged.tipo === '0' ?
                                    <Modal
                                        btnName={<FontAwesomeIcon icon="book" size="2x" />}
                                        title={"Cadastro de Disciplina"}
                                        body={this._bodyModal()}
                                        list={this.getAccordion.bind(this)}
                                        url="materias"
                                        id_modal={"modal_disciplina"}
                                        getDadosForm={this.getDataForm.bind(this)}
                                        clickNovoCadastro={this._setDataForm.bind(this)}
                                    />
                                :
                                    ''                     
                        }
                    </div>
                    <div className="overflow-auto" className='align__subject'>
                        {
                            materias.length <= 0
                                ?
                                <center>Nenhuma matéria encontrada</center>
                                :
                                materias.map((item, i) =>{
                                    return item.id_materia ?
                                        <Accordion
                                            key={i}
                                            index={i}
                                            idMateria={item.id_materia}
                                            desc_materia={item.descricao_materia}
                                            onClick={() => {
                                                materias.forEach((_itemFor, j) => {
                                                    if (i !== j) $(`#accordion-${j}`).collapse('hide');
                                                });
                                                $(`#accordion-${i}`).collapse('show');
                                            }}
                                        />
                                    :
                                        ''
                                })
                        }
                    </div>
                </div>
            </>
        )
    }
}