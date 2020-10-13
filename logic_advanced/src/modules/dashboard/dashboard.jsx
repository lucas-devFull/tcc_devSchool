import './dashboard.css';
<<<<<<< HEAD

import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Header} from '../../helpers/index';

=======
import React, { PureComponent } from 'react';
import Header from '../../helpers/templates/header/header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
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
<<<<<<< HEAD
                    <div className="content_wrapper flex-start" onClick={() => this.props.history.push('/class/conversations')}>
=======
                    <div className="content_wrapper_dashboard flex-start" onClick={() => this.props.history.push('/class/conversations')}>
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
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