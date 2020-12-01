import React, { Component } from "react";
import Select from "react-select";

class ClassSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecionados: [],
      naoSelecionados: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, { action, removedValue }) {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        this.setState({
          selecionados: [],
        });
        break;
    }

    this.setState({ selecionados: value });
  }

  componentDidMount(){
    this.setState({
      selecionados: this.props.value,
      naoSelecionados: this.props.options
    })
  }

  render() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected ? "black" : null,
        padding: 5,
      }),
    };

    return (
      <Select
        placeholder={this.props.placeholder}
        noOptionsMessage={() => "Sem opções!"}
        styles={customStyles}
        options={this.state.naoSelecionados}
        value={this.state.selecionados}
        className="basic-multi-select"
        isMulti={(this.props.isMulti != null) ? true : false}
        classNamePrefix="select"
        onChange={(value) => this.setState({ selecionados: value })}
        name={this.props.name}
        id={this.props.id_name}
      />
    );
  }
}
 export default ClassSelect;