import React, { Component } from "react";
import "@kenshooui/react-multi-select/dist/style.css"
import MultiSelect from "@kenshooui/react-multi-select";

export class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, label: "item 1" },
        { id: 2, label: "item 2", disabled: true },
        { id: 3, label: "item 3", disabled: false },
        { id: 4, label: "item 4" }
      ],
      selectedItems: []
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedItems) {
    this.setState({ selectedItems });
  }

  render() {
    const { items, selectedItems } = this.state;
    return (
      <div>
      <MultiSelect
      items={items}
      selectedItems={selectedItems}
      onChange={this.handleChange.bind(this)}
      />
      </div>
    );
  }
}