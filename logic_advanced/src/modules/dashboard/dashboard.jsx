import './dashboard.css';

import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {Header} from '../../helpers/index';
import Header from '../../helpers/templates/header/header';
import {Card} from '../../helpers/index';

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
                    <div className="content_wrapper flex-start overflow-auto">  
                        <Card
                            content={'Nome da disciplina'}
                            id={''}
                            onClick={() => this.props.history.push('/conversations')}
                        />                   
                    </div>
                </div>
            </>
        )
    }
}