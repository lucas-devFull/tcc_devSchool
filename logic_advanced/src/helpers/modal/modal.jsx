import './modal.css';


import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Requestor} from '../../factory/requestor/requestor';
import Swal from '../../helpers/swal/sawl';

export class Modal extends Component {

    constructor(props) {
        super(props);
        this.executeRequestor = new Requestor;
    }

    handleSubmit(){
        let inputValues = new FormData();
        document.querySelectorAll('.elementos').forEach(item =>{
           if(item){
                inputValues.append(item.getAttribute("name"), item.value)
            }else Swal.alertMessage('Erro!', 'Preencha todos os campos', 'error');
        }); 
        this.executeRequestor.post(this.props.url,inputValues);
    }

    render() {
        const { btnName, title, body } = this.props;
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-light"
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                >
                    {btnName}
                </button>
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        <FontAwesomeIcon icon="times" />
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {body}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="button" className="btn btn-success" onClick={this.handleSubmit.bind(this)} >Cadastar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}