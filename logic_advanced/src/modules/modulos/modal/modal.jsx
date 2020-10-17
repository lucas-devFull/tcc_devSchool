import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  RegisterMoudlos from '../storage';
import Swal  from '../../../helpers/swal/sawl';
import React, { Component } from 'react';


export class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descricao_modulo: '',
            materias: [],
            modulo_inicial: 0
        };
    }

    mover(fonte, destino) {
        var selecionados = fonte.querySelectorAll("li input:checked");
        for ( var i = 0 ; i < selecionados.length ; i++ ) {
            var li = selecionados[i].parentNode.parentNode;
            fonte.removeChild(li);
            destino.appendChild(li);
            selecionados[i].checked = false;
        }
      }
      
     handleSubmit() {
        const {token} = this.props;
        const { descricao_modulo, materias } = this.state;
        let validate = true;

        if (!descricao_modulo || materias.length === 0) {
            validate = false;
            Swal.alertMessage('Erro!', 'Preencha todos os campos corretamente!', 'error');
            document.querySelectorAll(".campos").forEach(function(e) {
                e.classList.add("input-erro");
            })
        };

        // if (validate) {
        //     RegisterMoudlos.setModulo({
        //         token: token
        //     });
        //     Swal.alertMessage('Sucesso!', 'Cadastro realizado!', 'success');
        // }
    }

    render() {

        var dragging, draggedOver;

        const setDragging = (e) =>{
            dragging = parseInt(e.target.innerText)
        }

        function setDraggedOver(e) {
            e.preventDefault();
            draggedOver = parseInt(e.target.innerText)
          }

        const { btnName, title } = this.props;
        let style= {
            "display":"flex"
        }

        let style1 = {
            "listStyleType": "none"
        }

        let style2 = {
            "display":"flex",
            "flexDirection":"column",
            "marginLeft": "10px"
        }
        return (
            <div>
                <button 
                    type="button" 
                    className="btn btn-light" 
                    data-toggle="modal" 
                    data-target=".abre_modal"
                >
                    {btnName}
                </button>
                <div className="modal fade abre_modal" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        <FontAwesomeIcon icon="times"/>
                                    </span>
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <form className="form-group">
                                    <input type="text" className="form-control mt-3" placeholder="Nome Modulo" onChange={(e) => this.setState({descricao_modulo: e.target.value})}/>
                                </form>

                                <div style={style}>
                                    <ul id="sortable1" className="esq connectedSortable" onDrag={setDragging.bind(this)} onDrop={setDraggedOver.bind(this)} style={style1}>
                                        <li><label><input type="checkbox" /> Item A </label></li>
                                        <li><label><input type="checkbox" /> Item B</label></li>
                                        <li><label><input type="checkbox" /> Item C</label></li>
                                        <li><label><input type="checkbox" /> Item D</label></li>
                                        <li><label><input type="checkbox" /> Item E</label></li>
                                    </ul>
                                    <div style={style2}>
                                        <button className="dir" onClick={this.mover.bind(this, document.querySelector("ul.esq"),document.querySelector("ul.dir"))}>▶</button>
                                        <button className="esq" onClick={this.mover.bind(this, document.querySelector("ul.dir"),document.querySelector("ul.esq"))}>◀</button>
                                    </div>
                                    <ul id="sortable2" className="dir connectedSortable" onDrag={setDragging.bind(this)} onDrop={setDraggedOver.bind(this)} style={style1}></ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="button" className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Cadastar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}