import './student.css';
import '../register.css';

import React from 'react';
import {Link} from 'react-router-dom';

import {Swal} from '../../../helpers/index';
import RegisterUserStudent from './storage';
import Logo from '../../../assets/logo.png';

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
            RegisterUserStudent.setUser({
                name: name,
                userName: userName,
                email: email,
                password: password,
            });
            Swal.alertMessage('Sucesso!', 'Cadastro realizado!', 'success');
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
                            <input className="input__register" type="text" placeholder="Nome completo" onChange={(e) => this.setState({ name: e.target.value })} />
                            <input className="input__register" type="text" placeholder="Nome de usuário(Apelido)" onChange={(e) => this.setState({ userName: e.target.value })} />
                            <input className="input__register" type="email" placeholder="E-mail" onChange={(e) => this.setState({ email: e.target.value })} />
                            <input className="input__register" type="password" placeholder="Digite sua senha" onChange={(e) => this.setState({ password: e.target.value })} />
                            <input className="input__register" type="password" placeholder="Confirmar senha" onChange={(e) => this.setState({ cpassword: e.target.value })} />

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