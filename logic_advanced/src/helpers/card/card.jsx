import "./card.css";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({
  content,
  id,
  ClickList,
  ClickDelete,
  dataTarget,
  dataToggle,
}) => {
  return (
    <>
        <div className="col-auto col_padrao">
          <div className="btn_delete_card" onClick={ClickDelete}>
            <FontAwesomeIcon icon="trash-alt" />
          </div>
          <div
            onClick={ClickList}
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
    </>
  );
};
