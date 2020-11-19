import "./card.css";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function enviaIdModal(e, id, callback, id_modal) {
  document.querySelectorAll("#"+id_modal)[0].setAttribute("data-id", id);
  callback();
}
export const Card = ({
  content,
  id,
  imagem,
  ClickList,
  ClickDelete,
  dataTarget,
  dataToggle,
  id_modal
}) => {
  return (
    <>
      <div className="col-auto col_padrao">
        <div className="btn_delete_card" onClick={ClickDelete}>
          <FontAwesomeIcon icon="trash-alt" />
        </div>
        <div 
          onClick={(e) => enviaIdModal(e, id, ClickList, id_modal)}
          data-id={id}
          className="component_card card_modal"
          data-toggle={dataToggle}
          data-target={dataTarget}
        >
          <div className="div_img_card">
            {imagem != null ? (
              <img
                src={"data:image/png;base64," + imagem}
                className="img_card img-responsive"
                alt="Card image cap"
              />
            ) : (
              <i className="iconDash">
                <FontAwesomeIcon icon="portrait" />
              </i>
            )}
          </div>
          <div className="descricao_card">
            <h3> {content}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
