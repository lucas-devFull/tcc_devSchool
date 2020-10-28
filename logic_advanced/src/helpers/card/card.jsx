import "./card.css";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({ content, id, onClick, dataTarget, dataToggle }) => {
  return (
    <div className="col-auto col_padrao" onClick={onClick}>
        <div className="btn_delete_card">
          <FontAwesomeIcon icon="trash-alt" />
        </div>
      <div
        className="component_card"
        data-id={id}
        data-toggle={dataToggle}
        data-target={dataTarget}
      >
        
        <i className="iconDash">
          <FontAwesomeIcon icon="portrait" />
        </i>
        <h3> {content}</h3>
      </div>
    </div>
  );
};
