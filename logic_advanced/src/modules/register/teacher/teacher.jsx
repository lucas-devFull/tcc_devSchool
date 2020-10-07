import './teacher.css';
import '../register.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    render() {
        return (
            <div className="container__body">
                <div className="p-4 d-flex justify-content-between ">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.props.history.push('/dashboard')}

                    >
                        <i className="icon__register__teacher">
                            <FontAwesomeIcon icon="arrow-circle-left" />
                        </i>
                    </button>
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
            </div>

        );
    }
}