import './teacher.css';
import '../register.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<<<<<<< HEAD
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
    
=======
import RegisterUserTeacher from './storage';
import {Card} from '../../../helpers/index';


export default class RegisterTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoRegister: {
                name: '',
                userName: '',
                email: '',
                password: '',
                cpassword: ''
            }
        };
    }

>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
    render() {
        return (
            <div className="container__body">
                <div className="p-4 d-flex justify-content-between ">
                    <button
                        type="button"
<<<<<<< HEAD
                        className="btn btn-light rounded-pill"
=======
                        className="btn btn-primary"
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
                        onClick={() => this.props.history.push('/dashboard')}

                    >
                        <i className="icon__register__teacher">
                            <FontAwesomeIcon icon="arrow-circle-left" />
                        </i>
                    </button>
<<<<<<< HEAD
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
=======
                    <button
                        type="button"
                        className="btn btn-primary"
                    >
                        <i className="icon__register__teacher">
                            <FontAwesomeIcon icon="user-plus" />
                        </i>
                    </button>
                </div>
                <Card/>               
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
            </div>

        );
    }
}