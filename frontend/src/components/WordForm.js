import React from "react";
import Alert from "react-bootstrap/Alert";
import DefinitionTable from "./DefinitionTable";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // update value and delete error message
    this.setState({
      value: event.target.value,
      errorMessage: "",
      displayText: "",
      definition: "",
      nearest: "",
      present: "",
      showTable: false,
    });
  }

  handleSubmit(event) {
    // if blank, show error
    if (this.state.value === "") {
      this.setErrorMessage("Enter a word!");
      event.preventDefault();
      return;
    }

    // if not check owrd in backend
    fetch(
      `${process.env.REACT_APP_API_URL}/lookup_word?word=${this.state.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(this.state);
        this.setState({
          definition: res.definition,
          nearest: res.nearest,
          present: res.present,
          showTable: true,
        });

        console.log("State:", this.state);
      });
    event.preventDefault();
  }

  setErrorMessage = (message) => {
    this.setState({ errorMessage: message, displayText: "" });
  };

  render() {
    return (
      <div>
        <div className="p-3">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter a word"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {/* {this.state.displayText && (
          <Alert variant="primary"> {this.state.displayText}</Alert>
        )}*/}
          {this.state.errorMessage && (
            <Alert variant="danger"> {this.state.errorMessage} </Alert>
          )}
          <div className="pt-3">
            {this.state.showTable && (
              <DefinitionTable
                word={this.state.value}
                definition={this.state.definition}
                nearest={this.state.nearest}
                present={this.state.present}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WordForm;
