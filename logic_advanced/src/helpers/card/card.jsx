import './card.css';

import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({content}) => {
    console.log(content);
    return (
        <div className="flex-start mr-4">
            <div className="card">
                <i className="iconDash">
                    <FontAwesomeIcon icon="portrait" />
                </i>
                <h3> {content}</h3>
            </div>
        </div>
    )
}