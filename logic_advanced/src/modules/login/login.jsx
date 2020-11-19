import './login.css';
import 'react-toastify/dist/ReactToastify.min.css'; 

import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Logo from '../../assets/logo.png';
import LocalStorage from '../../factory/storage/index';
import { Requestor } from "../../factory/requestor/requestor";

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            login:'',
            password:''
        }
        this.requestExecutor = new Requestor(false);
    }

    onKeyDown(event){
        if (event.key === 'Enter') {
            this.handlesubmit()
          }
        
    }

    handlesubmit(){
        const {login, password} = this.state;
        this.requestExecutor.get(`usuario?login=${login}&senha=${password}`, false)
        // RequestLogin.getAcess(login, password)
            .then(res => res.json())
            .then(res =>{
                if(res.status) {
                    LocalStorage.setStorage(res);
                    this.props.history.push('/dashboard');
                }else{
                    document.querySelectorAll("input").forEach(function(e) {
                        e.classList.add("input-erro");
                    })
                    toast.error('Usuario ou senha incorretos !')
                }
            })
            .catch(error => console.log(error))
              
    }   

    render(){
        return(
            <div className="container__body">
            <ToastContainer />
                <div className="content__login">
                    <div className="box__login">
                        <div className="logo">
                            <img src={Logo} width="70%" height="131px"/>    
                        </div>
                        <form style={{width: '100%', height: 'auto' }} >
                            <div className="data__form">
                                <input type="text" className="input__login"  placeholder="E-mail ou mome do usuário" onKeyUp={this.onKeyDown.bind(this)} onChange={(e) => this.setState({login: e.target.value})} />
                                <input type="password"  className="input__login" placeholder="Senha" onKeyUp={this.onKeyDown.bind(this)} onChange={(e) => this.setState({password: e.target.value})} />
                                <button type="button" className="btn__login" onClick={this.handlesubmit.bind(this)}>Entrar</button>
                            </div>
                        </form>
                        <p>Ainda não é cadastrado?<Link to="/register/student"> <span style={{ color: '#6259e1' }}>Cadastre-se aqui.</span></Link></p>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);