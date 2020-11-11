import React, { Component } from "react";
import Select from "react-select";

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selecionados: [],
          naoSelecionados: [],
        };
        this.onChange = this.onChange.bind(this);
      }
    
}