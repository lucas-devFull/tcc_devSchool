import './header.css';
import React, { Component } from 'react';
import Storage from '../../../factory/storage/index';
import {TeacherMenu, StudentMenu } from './menu/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    logout(){
        this.props.history.push('/');
        // Storage.clearStorage();
    }

    componentDidMount(){
        let typeUser = Storage.getStorage('dataUser');
       
        if(typeUser.tipo === '1' || typeUser.tipo === '0' ) return <TeacherMenu props={typeUser}/>
        else return <StudentMenu/>
    }

    render() {
        
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
                    <a className="navbar-brand ml-3" href="#">Logic Advanced</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    <FontAwesomeIcon icon="home" />&nbsp;Home
                                </Link>
                            </li>
                           { this.componentDidMount()}
                        </ul>
                        <button className="btn btn-danger my-2 my-sm-0" type="button" onClick={this.logout.bind(this)}>Sair</button>
                    </div>
                </nav>
            </>
        )

    }
}


