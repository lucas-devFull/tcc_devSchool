import './teacher.css';
import '../register.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import  RegisterUserTeacher from './storage';
import {Modal} from './modal/modal';
import {Card} from '../../../helpers/index';
import Storage from '../../../factory/storage/index';


export default class RegisterTeacher extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            list:[]
        }
        this.dataUserLogged = Storage.getStorage();
    }

    _listTeacher(token){
        RegisterUserTeacher.getUser(token)
        .then(res => res.json())
        .then(result =>{
            this.setState({
                list: result.dados
            })
        })
        .catch(error => console.log('error', error));
        
    }

    componentDidMount(){
        this._listTeacher(this.dataUserLogged.token);
    }
    
    render() {
        return (
            <div className="container__body">
                    <div className="p-4 d-flex justify-content-between ">
                    <button
                        type="button"
                        className="btn btn-light rounded-pill"
                        onClick={() => this.props.history.push('/dashboard')}

                    >
                        <i className="icon__register__teacher">
                            <FontAwesomeIcon icon="arrow-circle-left" />
                        </i>
                    </button>
                    <Modal
                        token={this.dataUserLogged.token}
                        userLogged
                        btnName={ <FontAwesomeIcon icon="user-plus" size="2x"/>}
                        title="Cadastro de Professor"
                    />
                </div>
                <div className="content_wrapper_dashboard flex-start">        
                    {this.state.list.map(item => <Card content={item.descricao_professor}/>)}      
                </div>
            </div>
        );
    }
}