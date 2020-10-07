import './login.css';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';  
import Storage from '../../factory/storage/index';
import Logo from '../../assets/logo.png';
import RequestLogin from './storage';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            login:'',
            password:''
        }
    }

    handlesubmit(){
        const {login, password} = this.state;
        RequestLogin.getAcess(login, password)
            .then(res => res.json())
            .then(res =>{
                if(res.status) {
                    Storage.setStorage(res);
                    this.props.history.push('/dashboard');
                    console.log('Login => OK')
                }
            })
            .catch(error => console.log(error))
              
    }   

    render(){
        return(
            <div className="container__body">
                <div className="content__login">
                    <div className="box__login">
                        <div className="logo">
                            <img src={Logo} width="70%" height="131px"/>    
                        </div>
                        <form style={{width: '100%', height: 'auto' }}>
                            <div className="data__form">
                                <input type="text" className="input__login" placeholder="E-mail ou mome do usuário" onChange={(e) => this.setState({login: e.target.value})} />
                                <input type="password"  className="input__login" placeholder="Senha" onChange={(e) => this.setState({password: e.target.value})} />
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