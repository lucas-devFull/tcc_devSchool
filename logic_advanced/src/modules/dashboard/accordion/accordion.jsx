import '../../../helpers/card/card.css';
import React, { Component } from 'react';
import { Modal } from "../../../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class Accordion extends Component {
    constructor(props) {
        super(props);
    }

    CardAula = (imagem, id) => {
        return (
            <>
                <div className="component_card m-2" onClick={() => { console.log('roi'); }}>
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
                                            <FontAwesomeIcon icon="portrait" />
                                        </i>
                                    )}
                            </div>
                            <div className="descricao_card">
                                <h3> {id}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        const { idMateria, index, idAccordion,onClick} = this.props;
      

        return (
            <div className="accordion mt-4" >
                <div className="card" style={{ backgroundColor: '#284454' }}>
                    <div className="card-header" id={idMateria}>
                        <h2 className="mb-0">
                            <button 
                                className="btn btn-block text-left" 
                                style={{ color: 'white', backgroundColor: '#233c4b', borderColor: '#2b5975' }} 
                                type="button" 
                                onClick={onClick}
                            >
                                Collapsible Group Item #{idMateria}
                            </button>
                        </h2>
                    </div>
                    <div id={`accordion-${index}`} className="collapse">
                        <div className="card-body ">
                            <div className="p-4 d-flex justify-content-end ">
                                <Modal
                                    btnName={<FontAwesomeIcon icon="book-reader" size="2x" />}
                                    title={"Cadastro de Aula"}
                                    body={''}
                                    list={''}
                                    url="professor"
                                    id_accordion={idAccordion}
                                    id_modal={"modal_aula"}
                                />
                            </div>
                            <div className="d-flex flex-wrap">
                                {this.CardAula(null, 1)}
                                {this.CardAula(null, 2)}
                                {this.CardAula(null, 3)}
                                {this.CardAula(null, 4)}
                                {this.CardAula(null, 5)}
                                {this.CardAula(null, 6)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}