import './header.css';
import React, { Component } from 'react';
import Storage from '../../../factory/storage/index';
import {TeacherMenu, StudentMenu } from './menu/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<<<<<<< HEAD
export class Header extends Component {
=======
export default class Header extends Component {
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
    constructor(props) {
        super(props);
    }

    logout(){
<<<<<<< HEAD
        // this.props.history.push('/');
=======
        this.props.history.push('/');
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
        // Storage.clearStorage();
    }

    componentDidMount(){
<<<<<<< HEAD
        let typeUser = Storage.getStorage();
=======
        let typeUser = Storage.getStorage('dataUser');
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
       
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
<<<<<<< HEAD
                        <button 
                            className="btn btn-danger my-2 my-sm-0" 
                            type="button" 
                            onClick={this.logout.bind(this)}
                        >
                              Sair
                        </button>
=======
                        <button className="btn btn-danger my-2 my-sm-0" type="button" onClick={this.logout.bind(this)}>Sair</button>
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
                    </div>
                </nav>
            </>
        )

    }
}


