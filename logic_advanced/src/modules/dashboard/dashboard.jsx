import './dashboard.css';

import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {Header} from '../../helpers/index';
import Header from '../../helpers/templates/header/header';
import { Modal } from '../../helpers/index';
import DashStorage from './storage';
import { Accordion } from './accordion/accordion';

export default class Dashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            materias: []
        }
    }

    getAccordion() {
        DashStorage.getMaterias()
            .then(data => {
                this.setState({ materias: data.dados })
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getAccordion();
    }

    render() {
        const { materias } = this.state;
        return (
            <>
                <div className="container__body">
                    <Header />
                    <div className="p-4 d-flex justify-content-end ">
                        <Modal
                            btnName={<FontAwesomeIcon icon="book" size="2x" />}
                            title={"Cadastro de Disciplina"}
                            body={''}
                            list={''}
                            url="professor"
                            id_modal={"modal_disciplina"}
                        />
                    </div>
                    <div className="m-5 overflow-auto" style={{ height: "40em" }}>
                        {
                           
                            !materias 
                            ? 
                                <center>Nenhuma matéria encontrada</center>
                            :
                                materias.map((item, i) =>
                                    <Accordion
                                        key={i}
                                        index={i}
                                        idMateria={item.id_materias}
                                    />
                                )
                        }
                    </div>
                    {/* <div className="content_wrapper flex-start overflow-auto">
                        <Card
                            content={'Nome da disciplina'}
                            id={''}
                            imagem={null}
                            onClick={() => this.props.history.push('/conversations')}
                        />                   
                    </div> */}
                </div>
            </>
        )
    }
}