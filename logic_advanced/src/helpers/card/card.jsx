import './card.css';

import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = () => {
    return (
        <div className="content_wrapper_dashboard flex-start">
            <div className="card">
                <i className="iconDash">
                    <FontAwesomeIcon icon="portrait" />
                </i>
                <h3> nome do professor</h3>
            </div>
        </div>
    )
}