import './dashboard.css';

import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Header} from '../../helpers/index';

export default class Dashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>

                <div className="container__body">
                    <Header />
                    <div className="content_wrapper flex-start" onClick={() => this.props.history.push('/class/conversations')}>
                        <div className="card">
                            <i className="iconDash">
                                <FontAwesomeIcon icon="users" />
                            </i>
                            <h3>Nome da Disciplina</h3>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}