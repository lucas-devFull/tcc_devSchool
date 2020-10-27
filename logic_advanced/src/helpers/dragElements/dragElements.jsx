import React, { Component } from "react";
import "./dragElements.css";

export class DragElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: "",
      ElementosSelecionados: {},
      ElementosNaoSelecionados: {},
    };
    this.dragging = 0;
    this.draggedOver = 0;
  }

  mover(fonte, destino) {
    var selecionados = fonte.querySelectorAll("li input:checked");
    for (var i = 0; i < selecionados.length; i++) {
      var li = selecionados[i].parentNode.parentNode;
      fonte.removeChild(li);
      destino.appendChild(li);
      //   selecionados[i].checked = false;
    }
  }


  setDragging(e) {
    this.dragging = parseInt(e.target.innerText);
  }

  setDraggedOver(e) {
    this.draggedOver = parseInt(e.target.innerText);
  }

  render() {
    return (
      <div>
        <div className="drag_elementos">
          <ul
            id="sortable1"
            className="esq connectedSortable drag_lista"
            onDrag={this.setDragging.bind(this)}
            onDrop={this.setDraggedOver.bind(this)}
          >
            {console.log(this.state.naoSelecionados)}
              <li>
                <label>
                  <input type="checkbox" />  Teste 
                </label>
              </li>
          </ul>
          <div className="drag_elementros_direita">
            <button
              className="dir"
              onClick={this.mover.bind(
                this,
                document.querySelector("ul.esq"),
                document.querySelector("ul.dir")
              )}
            >
              ▶
            </button>
            <button
              className="esq"
              onClick={this.mover.bind(
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
            onDrag={this.setDragging.bind(this)}
            onDrop={this.setDraggedOver.bind(this)}
          >


          </ul>
        </div>
      </div>
    );
  }
}
