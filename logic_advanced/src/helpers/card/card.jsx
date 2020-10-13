import './card.css';

import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({content, id}) => {
    console.log(content);
    return (
        <div className="flex-start mr-4">
            <div className="card" data-id={id}>
                <i className="iconDash">
                    <FontAwesomeIcon icon="portrait" />
                </i>
                <h3> {content}</h3>
            </div>
        </div>
    )
}