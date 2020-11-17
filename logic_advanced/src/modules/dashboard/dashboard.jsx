import './dashboard.css';
import $ from 'jquery';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

// import {Header} from '../../helpers/index';
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
            naoSelecionados: [],
        }
        this.onChange = this._onChange.bind(this);
        this.requestExecutor = new Requestor();

    }

    getAccordion() {
        DashStorage.getMaterias()
            .then(data => {
                this.setState({ materias: data.dados })
            })
            .catch(error => console.log(error));

        this.requestExecutor.get('modulos')
        .then((res)=> res.json())
        .then((res)=>{
            res.dados.map(item =>{
                console.log(item);
            })
        })
    }

    _onChange(value, { action, removedValue }) {
        switch (action) {
            case "remove-value":
            case "pop-value":
                console.log("eu");
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
                        />
                    </div>
                </div>
                <div className="col-auto">
                    <Select
                        placeholder="Selecione um Módulo"
                        noOptionsMessage={() => "Sem opções!"}
                        styles={customStyles}
                        isMulti
                        options={this.state.naoSelecionados}
                        value={this.state.selecionados}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.onChange}
                        id="select_modulos"
                    />
                </div>
            </div>
        );
    }
    
    componentDidMount() {
        this.getAccordion();
    }
    
    render() {
        const { materias } = this.state;
        return (
            <>
                <div className="container__body">
                    <Header />
                    <div className="p-4 d-flex justify-content-end ">
                        <Modal
                            btnName={<FontAwesomeIcon icon="book" size="2x" />}
                            title={"Cadastro de Disciplina"}
                            body={this._bodyModal()}
                            list={''}
                            url="materias"
                            id_modal={"modal_disciplina"}
                        />
                    </div>
                    <div className="m-5 overflow-auto" style={{ height: "40em" }}>
                        {

                            !materias
                                ?
                                <center>Nenhuma matéria encontrada</center>
                                :
                                materias.map((item, i) =>
                                    <Accordion
                                        key={i}
                                        index={i}
                                        idMateria={item.id_materias}
                                        onClick={() => {
                                            materias.forEach((itemFor, j) => {
                                                console.log(itemFor);
                                                console.log(item);
                                                if (i !== j) $(`#accordion-${j}`).collapse('hide');
                                            });
                                            $(`#accordion-${i}`).collapse('show');
                                            console.log($(`#accordion-${i}`));
                                        }}
                                    />
                                )
                        }
                    </div>
                    {/* <div className="content_wrapper flex-start overflow-auto">
                        <Card
                            content={'Nome da disciplina'}
                            id={''}
                            imagem={null}
                            onClick={() => this.props.history.push('/conversations')}
                        />                   
                    </div> */}
                </div>
            </>
        )
    }
}