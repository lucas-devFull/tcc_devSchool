import './teacher.css';
import '../register.css';

import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';

// import {Modal} from './modal/modal';
import { Card, Modal } from '../../../helpers/index';
import LocalStorage from '../../../factory/storage/index';
import Header from '../../../helpers/templates/header/header';
import { Requestor } from '../../../factory/requestor/requestor';


class RegisterTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.dataUserLogged = LocalStorage.getStorage();
        this.requestExecutor = new Requestor;
    }

    _listTeacher() {
        this.requestExecutor.get('professor')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    list: result.dados
                })
            })
            .catch(error => console.log('error', error));
    }

    editTeacher() {
        alert('ainda fazer');
    }

    componentDidMount() {
        this._listTeacher();
    }

    render() {
        const bodyModal =  () =>           
            <form className="form-group">
                <input type="text" className="form-control mt-3" placeholder="Nome Completo" />
                <input type="text" className="form-control mt-3" placeholder="Apelido" />
                <input type="email" className="form-control mt-3" placeholder="Email" />
                <input type="password" className="form-control mt-3" placeholder="Digite uma senha" />
            </form>        

        return (
            <div className="container__body">
                <Header />
                <div className="p-4 d-flex justify-content-end ">
                    <Modal
                        btnName={<FontAwesomeIcon icon="user-plus" size="2x" />}
                        title={'Cadastro de Professor'}
                        body={bodyModal()}
                    />
                    {/* <Modal
                        token={this.dataUserLogged.token}  
                        btnName={ <FontAwesomeIcon icon="user-plus" size="2x"/>}
                        title="Cadastro de Professor"
                    /> */}
                </div>
                <div className="content_wrapper flex-start overflow-auto">
                    {this.state.list.map((item,i) =>
                        <Fragment key={i}>
                            <Card
                                content={item.descricao_professor}
                                id={item.id_professor}
                                onClick={this.editTeacher.bind(this)}
                            />
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterTeacher)