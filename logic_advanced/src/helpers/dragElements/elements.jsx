import "./dragElements.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function mover(fonte, destino) {
  var selecionados = fonte.querySelectorAll("input:checked");
  for (var i = 0; i < selecionados.length; i++) {
    var li = selecionados[i].parentNode.parentNode;
    console.log(li);
    fonte.removeChild(li);
    destino.appendChild(li);
    //   selecionados[i].checked = false;
  }
}

export const Elements = ({
  naoSelecionados = [],
  selecionados = [],
  title = "",
}) => {
  return (
    <div class="card card_box_component">
      <div class="card-header">Selecione as {title}</div>
      <div className="card-body drag_elementos">
        <ul
          id="sortable1"
          className="esq connectedSortable drag_lista"
          onDrag={(e) => parseInt(e.target.innerText)}
          onDrop={(e) => parseInt(e.target.innerText)}
        >
          {naoSelecionados.map((item, index) => (
            <li>
              <label className="label_elements" onClick={(e) => (e.target.classList.toggle('selected'))} >
                <input type="checkbox" key={index} /> {item.descricao_materia}
              </label>
            </li>
          ))}
        </ul>
        <div className="drag_elementros_direita">
          <div
            className="dir button_elements"
            onClick={mover.bind(
              this,
              document.querySelector("ul.esq"),
              document.querySelector("ul.dir")
            )}
          >
            <FontAwesomeIcon icon="arrow-right" />
          </div>
          <div
            className="esq button_elements"
            onClick={mover.bind(
              this,
              document.querySelector("ul.dir"),
              document.querySelector("ul.esq")
            )}
          >
            <FontAwesomeIcon icon="arrow-left" />
          </div>
        </div>
        <ul
          id="sortable2"
          className="dir connectedSortable drag_lista"
          onDrag={(e) => parseInt(e.target.innerText)}
          onDrop={(e) => parseInt(e.target.innerText)}
        >
          {selecionados.map((elemento, index) => (
            <li>
              <label className="label_elements" onClick={(e) => (e.target.classList.toggle('selected'))}>
                <input type="checkbox" key={index} />{" "}
                {elemento.descricao_materia}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
