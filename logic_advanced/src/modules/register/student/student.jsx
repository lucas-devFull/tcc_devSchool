import './student.css';
import '../register.css';

import React from 'react';
import {Link} from 'react-router-dom';

import Swal from '../../../helpers/swal/sawl';
import Logo from '../../../assets/logo.png';
import { Requestor } from "../../../factory/requestor/requestor";

export default class RegisterStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userName: '',
            email: '',
            password: '',
            cpassword: ''
        };
        this.requestExecutor = new Requestor(false);
    }

    onKeyDown(event){
        if (event.key === 'Enter') {
            this.submitData()
          }   
    }
    submitData() {
        const { name, userName, email, password, cpassword } = this.state;
        let validate = true;
      
        if (!name || !userName || !email || !password || !cpassword) {
            validate = false;
            Swal.alertMessage('Erro!', 'Preencha todos os campos', 'error');
            // deixar o campos vazios  em vemrelho
        };

        if(email.indexOf('@') === -1) {
            validate = false;
            Swal.alertMessage('Erro!', 'E-mail inválido', 'error');
        }

        if (password !== cpassword) {
            validate = false;
            Swal.alertMessage('Erro!', 'Senhas não conferem', 'error');
            // fazer função para validar segurança
        };
        
        if (validate) {
            let formData = new FormData()
            formData.append("email_usuario",email)
            formData.append("senha_usuario", password)
            formData.append("nick_usuario", userName)
            formData.append("descricao_usuario", name)

            this.requestExecutor.post('usuario', formData)
            .then(response => response.json())
            .then(result => {
                if (result.status == true) {
                    Swal.alertMessage('Sucesso!', 'Cadastro realizado', 'success', this.props.history.push('/'));
                }else{
                    Swal.alertMessage('Erro!', result.msg, 'warning');
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    render() {
        return (
            <>
                <section  className="box container__body ">
                    <div className="box__left">
                        <img src={Logo} alt="Logo do sistema" />
                    </div>
                    <div className="box__right">
                        <form className="form">
                            <input className="input__register" type="text" placeholder="Nome completo" onKeyUp={this.onKeyDown.bind(this)}  onChange={(e) => this.setState({ name: e.target.value })} />
                            <input className="input__register" type="text" placeholder="Nome de usuário(Apelido)" onKeyUp={this.onKeyDown.bind(this)}  onChange={(e) => this.setState({ userName: e.target.value })} />
                            <input className="input__register" type="email" placeholder="E-mail" onKeyUp={this.onKeyDown.bind(this)}  onChange={(e) => this.setState({ email: e.target.value })} />
                            <input className="input__register" type="password" placeholder="Digite sua senha" onKeyUp={this.onKeyDown.bind(this)}  onChange={(e) => this.setState({ password: e.target.value })} />
                            <input className="input__register" type="password" placeholder="Confirmar senha" onKeyUp={this.onKeyDown.bind(this)}  onChange={(e) => this.setState({ cpassword: e.target.value })} />

                            <div className="btns">
                                <button type="button" className="button__register" onClick={this.submitData.bind(this)} >Cadastrar</button>
                                <Link to="/">
                                    <button type="button" className="button__register">Cancelar</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}