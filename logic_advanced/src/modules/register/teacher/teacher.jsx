import './teacher.css';
import '../register.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Requestor} from '../../../factory/requestor/requestor';
import {Modal} from './modal/modal';
import {Card} from '../../../helpers/index';
import LocalStorage from '../../../factory/storage/index';
import { withRouter } from 'react-router-dom';
import Header from '../../../helpers/templates/header/header';


class RegisterTeacher extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            list:[]
        }
        this.dataUserLogged = LocalStorage.getStorage();
        this.requestExecutor = new Requestor;
    }

    _listTeacher(){
        this.requestExecutor.get('professor')
        .then(res => res.json())
        .then(result =>{
            this.setState({
                list: result.dados
            })
        })
        .catch(error => console.log('error', error));        
    }
    
    editTeacher(){
        alert('ainda fazer');
    }

    componentDidMount(){
        this._listTeacher();
    }
    
    render() {
        return (
            <div className="container__body">
                <Header /> 
                <div className="p-4 d-flex justify-content-end ">
                    <Modal
                        token={this.dataUserLogged.token}  
                        btnName={ <FontAwesomeIcon icon="user-plus" size="2x"/>}
                        title="Cadastro de Professor"
                    />
                </div>
                <div className="content_wrapper_dashboard flex-start">        
                    {this.state.list.map(item => 
                        <Card 
                            content={item.descricao_professor} 
                            id={item.id_professor} 
                            onClick={this.editTeacher.bind(this)}
                        />
                    )}      
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterTeacher)