import './modal.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import  RegisterUserTeacher from '../storage';
import { Swal } from '../../../../helpers/index';

export class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userName: '',
            email: '',
            password: '',
            cpassword: ''
        };
    }

    handleSubmit() {
        const {token} = this.props;
        const { name, userName, email, password, cpassword } = this.state;
        let validate = true;

        if (!name || !userName || !email || !password || !cpassword) {
            validate = false;
            Swal.alertMessage('Erro!', 'Preencha todos os campos', 'error');
            // deixar o campos vazios  em vemrelho
        };

        if (email.indexOf('@') === -1) {
            validate = false;
            Swal.alertMessage('Erro!', 'E-mail inválido', 'error');
        }

        if (password !== cpassword) {
            validate = false;
            Swal.alertMessage('Erro!', 'Senhas não conferem', 'error');
            // fazer função para validar segurança
        };

        if (validate) {
            RegisterUserTeacher.setUser({
                name: name,
                userName: userName,
                email: email,
                password: password,
                token: token
            });
            Swal.alertMessage('Sucesso!', 'Cadastro realizado!', 'success');
        }
    }

    render() {
        const { btnName, title } = this.props;
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
                                        <FontAwesomeIcon icon="times"/>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form className="form-group">
                                    <input type="text" className="form-control mt-3" placeholder="Nome Completo" onChange={(e) => this.setState({name: e.target.value})}/>
                                    <input type="text" className="form-control mt-3" placeholder="Apelido" onChange={(e) => this.setState({userName: e.target.value})}/>
                                    <input type="email" className="form-control mt-3" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
                                    <input type="password" className="form-control mt-3" placeholder="Digite uma senha" onChange={(e) => this.setState({password: e.target.value})}/>
                                    <input type="password" className="form-control mt-3" placeholder="Confirmar senha" onChange={(e) => this.setState({cpassword: e.target.value})}/>                         
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Cadastar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}