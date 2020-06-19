import './login.css'

import React, {Component} from 'react';

export default class Login extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="content__login">
                <div className="box__login">
                    <div className="logo">
                        <img src="http://fulltrack-tools.ftdata.com.br/images/ft.png" width="auto" height="131px"/>    
                    </div>
                    <form style={{width: '100%', height: 'auto' }}>
                        <div className="data__form">
                            <input type="text" className="input" placeholder="E-mail" />
                            <input type="password"  className="input" placeholder="Senha" />
                            <button type="submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

