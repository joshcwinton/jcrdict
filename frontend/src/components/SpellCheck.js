import React, { Component } from "react";
import CorrectionTable from "./CorrectionTable";

class SpellCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corrections: { corrections: [], words: [] },
      value:
        "Dis a di lis a Krais Jiizas faada faada dem go bak. Jiizas did kom fram Dievid an Iebriyam fambili.",
      submitted: false,
      showTable: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
    this.setState({ submitted: true });
    fetch("/api/check_spelling", {
      method: "POST",
      body: JSON.stringify(this.state.value),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ corrections: res });
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value,
      submitted: false,
      showTable: false,
    });
  }

  render() {
    return (
      <div>
        <div className="container py-4">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Jamaican Creole Dictionary</h1>
              <p className="col-md-8 fs-4">
                Enter some text below and click submit to check whether the
                words are spelled correctly.
              </p>
            </div>
          </div>
          <textarea
            style={{ width: "100%", maxWidth: "100%" }}
            id="spellCheckText"
            name="spellCheck"
            value={this.state.value}
            onChange={this.handleChange}
            spellCheck="false"
          />
          <input
            type="button"
            value="Check spelling"
            onClick={this.handleSubmit}
          />
          {this.state.showTable && (
            <CorrectionTable corrections={this.state.corrections} />
          )}
        </div>
      </div>
    );
  }
}

export default SpellCheck;
