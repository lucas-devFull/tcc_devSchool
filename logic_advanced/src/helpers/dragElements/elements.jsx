import "./dragElements.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function mover(fonte, destino) {
  var selecionados = fonte.querySelectorAll("li input:checked");
  for (var i = 0; i < selecionados.length; i++) {
    var li = selecionados[i].parentNode.parentNode;
    fonte.removeChild(li);
    destino.appendChild(li);
    //   selecionados[i].checked = false;
  }
}

export const Elements = ({
  naoSelecionados = [],
  selecionados = [],
}) => {
  return (
    <div>
      <div className="drag_elementos">
        <ul
          id="sortable1"
          className="esq connectedSortable drag_lista"
          onDrag={(e) => parseInt(e.target.innerText)}
          onDrop={(e) => parseInt(e.target.innerText)}
        >
          {naoSelecionados.map((item, index) => (
            <li>
              <label>
                <input type="checkbox" key={index} /> {item.descricao_materia}
              </label>
            </li>
          ))}
        </ul>
        <div className="drag_elementros_direita">
          <button
            className="dir"
            onClick={mover.bind(
              this,
              document.querySelector("ul.esq"),
              document.querySelector("ul.dir")
            )}
          >
            ▶
          </button>
          <button
            className="esq"
            onClick={mover.bind(
              this,
              document.querySelector("ul.dir"),
              document.querySelector("ul.esq")
            )}
          >
            ◀
          </button>
        </div>
        <ul
          id="sortable2"
          className="dir connectedSortable drag_lista"
          onDrag={(e) => parseInt(e.target.innerText)}
          onDrop={(e) => parseInt(e.target.innerText)}
        >
          {selecionados.map((elemento, index) => (
            <li>
              <label>
                <input type="checkbox" key={index}/> {elemento.descricao_materia}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
