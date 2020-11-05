import "./card.css";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({
  content,
  id,
  imagem,
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
          <div className="div_img_card">
          
          {imagem != null ? (
            <img src={"data:image/png;base64," + imagem} className="img_card img-responsive" alt="Card image cap" />
            ) : (
              <i className="iconDash">
              <FontAwesomeIcon icon="portrait" />
            </i>
          )}
          </div>
          <h3> {content}</h3>
        </div>
      </div>
    </>
  );
};
