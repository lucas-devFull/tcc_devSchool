import './card.css';

import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({content, id, onClick, dataTarget, dataToggle}) => {
    return (
        <div className="flex-start mr-3 mt-3" onClick={onClick}>
            <div className="card" data-id={id} data-toggle={dataToggle} data-target={dataTarget} >
                <i className="iconDash">
                    <FontAwesomeIcon icon="portrait" />
                </i>
                <h3> {content}</h3>
            </div>
        </div>
    )
}