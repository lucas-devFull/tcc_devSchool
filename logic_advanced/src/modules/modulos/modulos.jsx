import React, { Component } from 'react';
import "./modulos.css"
import "../register/register.css"
import { Link, withRouter } from 'react-router-dom';
import Header from '../../helpers/templates/header/header';
import { Card } from '../../helpers';



class RegisterModulos extends Component {
    render(){
        return (
            <div className="container__body">
                <Header />
                <div className="content_wrapper_dashboard flex-start">
                    <Card content={"nome do professor"} />
                </div>
            </div>            
        );
    }
}

export default withRouter(RegisterModulos);
