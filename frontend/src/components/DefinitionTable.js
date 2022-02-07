import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class DefinitionTable extends Component {
  render() {
    return (
      <div>
        <h1>Result</h1>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <b>Word</b>
              </td>
              <td>{this.props.word}</td>
            </tr>
            <tr>
              <td>
                <b>Present</b>
              </td>
              <td>{this.props.present ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>
                <b>Definition</b>
              </td>
              <td>{this.props.definition || <i>Not defined</i>}</td>
            </tr>
            {/* <tr>
              <td>
                <b>Nearest</b>
              </td>
              <td>{this.props.nearest}</td>
            </tr> */}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DefinitionTable;
