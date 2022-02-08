import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class CorrectionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corrections: {},
    };
  }

  componentDidMount() {
    console.log("CorrectionTable: ", this.props.corrections);
    const newCorrections = {};
    this.props.corrections.words.forEach((key, i) => {
      if (this.props.corrections.corrections[i] !== "") {
        newCorrections[key] = this.props.corrections.corrections[i];
      }
    });
    console.log("newCorrections", newCorrections);
    this.setState({ corrections: newCorrections });
  }

  render() {
    return (
      <div className="pt-3">
        <h1>Results</h1>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Word</th>
              <th>Correction</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.corrections).map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{this.state.corrections[key]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default CorrectionTable;
