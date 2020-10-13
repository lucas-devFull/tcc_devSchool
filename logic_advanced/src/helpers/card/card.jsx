import './card.css';

import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<<<<<<< HEAD
export const Card = ({content}) => {
    console.log(content);
    return (
        <div className="flex-start mr-4">
=======
export const Card = () => {
    return (
        <div className="content_wrapper_dashboard flex-start">
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
            <div className="card">
                <i className="iconDash">
                    <FontAwesomeIcon icon="portrait" />
                </i>
<<<<<<< HEAD
                <h3> {content}</h3>
=======
                <h3> nome do professor</h3>
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
            </div>
        </div>
    )
}