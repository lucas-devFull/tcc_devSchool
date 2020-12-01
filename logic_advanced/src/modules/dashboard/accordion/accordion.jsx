import '../../../helpers/card/card.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from "../../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Requestor } from '../../../factory/requestor/requestor';
import Swal from "../../../helpers/swal/sawl";
import LocalStorage from '../../../factory/storage/index';

export class Accordion extends Component {
    constructor(props) {
        super(props);
        this.requestExecutor = new Requestor();

    }

    deleteSubject(id) {
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
                        .delete(`materias${id === false ? "" : `?id_materia=${id}`}`)
                        .then((res) => res.json())
                        .then((result) => {
                            if (result.status) {
                                Swal.alertMessage("Sucesso !", result.msg, "success", "", {
                                    Ok: { className: "button_info" },
                                });
                            }
                        });
                },
                this
            );
        } else {
            Swal.alertMessage("Erro !", "ErroaAo deletar registro", "warning");
        }
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

    CardAula = (imagem, id, nomeAula) => {
        return (
            <>
                <Link to="/lessons" style={{ color: '#fafafa' }}>
                    <div className="component_card m-2">
                        <div className="col-auto col_padrao ">
                            <div>
                                <div className="div_img_card">
                                    {imagem != null ? (
                                        <img
                                            src={"data:image/png;base64," + imagem}
                                            className="img_card img-responsive"
                                            alt="Card image cap"
                                        />
                                    ) : (
                                            <i className="iconDash">
                                                <FontAwesomeIcon icon="chalkboard-teacher" />
                                            </i>
                                        )}
                                </div>
                                <div className="descricao_card">
                                    <h3> {nomeAula}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>                
            </>
        )
    }

    render() {
        const { idMateria, desc_materia, index, idAccordion, onClick } = this.props;

        return (
            <div className="accordion mt-4" id={idMateria} style={{ width: '90%' }}>
                <div className="card" style={{ backgroundColor: '#284454' }}>
                    <div className="card-header" >
                        <h2 className="mb-0 d-flex">
                            <button
                                className="btn btn-block text-left"
                                style={{color: 'white', backgroundColor: '#233c4b', borderColor: '#2b5975'}}
                                type="button"
                                onClick={onClick}
                            >
                                {desc_materia}
                            </button>
                            {
                                LocalStorage.getStorage().tipo === '0' ?
                                    <div className=" d-flex justify-content-center ml-3"  onClick={this.deleteSubject.bind(this,idMateria)}>
                                        <FontAwesomeIcon icon="trash-alt" size="1x"/>
                                    </div>
                                :
                                    '' 
                            }

                        </h2>
                    </div>
                    <div id={`accordion-${index}`} className="collapse">
                        <div className="card-body ">
                            {
                                LocalStorage.getStorage().tipo === '0' ?
                                    <div className="p-4 d-flex justify-content-end ">                               
                                        <Modal
                                            btnName={<FontAwesomeIcon icon="book-reader" size="2x" />}
                                            title={"Cadastro de Aula"}
                                            body={''}
                                            list={''}
                                            url="professor"
                                            id_accordion={idAccordion}
                                            id_modal={"modal_aula"}
                                            clickNovoCadastro={this._setDataForm.bind(this)}
                                        />
                                    </div>
                                :
                                    ''                                    
                            }                            
                            <div className="d-flex flex-wrap">
                                {this.CardAula(null, 1, 'Aula 1')}
                                {this.CardAula(null, 2, 'Aula 2')}
                                {this.CardAula(null, 3, 'Aula 3')}
                                {this.CardAula(null, 4, 'Aula 4')}
                                {this.CardAula(null, 5, 'Aula 5')}
                                {this.CardAula(null, 6, 'Aula 6')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}