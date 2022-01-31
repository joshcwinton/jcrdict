import React from "react";
import Alert from "react-bootstrap/Alert"

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // update value and delete error message
    this.setState({ value: event.target.value, errorMessage: "", displayText: "" });
  }

  handleSubmit(event) {
    // if blank, show error
    if (this.state.value === "") {
      this.setErrorMessage("Enter a word!");
      event.preventDefault();
      return;
    }

    // if not check owrd in backend
    fetch(`https://www.jcrdict.com/check_word?word=${this.state.value}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res === true) {
          this.setState({
            displayText: `${this.state.value} is a valid Jamaican word.`,
          });
        } else {
          this.setState({
            displayText: `${this.state.value} is not a valid Jamaican word.`,
          });
        }
      });
      event.preventDefault();
  }

  setErrorMessage = (message) => {
    this.setState({errorMessage: message, displayText: ""});
  };

  render() {
    return (
      <div>
        Enter a word and click submit to check whether it's in the Jamaican
        Creole dictionary.
        <form onSubmit={this.handleSubmit}>
          <label>
            Word:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.displayText && (
          <Alert variant="primary"> {this.state.displayText}</Alert>
        )}
        {this.state.errorMessage && (
          <Alert variant="danger"> {this.state.errorMessage} </Alert>
        )}
      </div>
    );
  }
}

export default WordForm;
