import React from "react";

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    fetch(`https://www.jcrdict.com/check_word?word=${this.state.value}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if(res == true){
            this.setState({displayText: `${this.state.value} is a valid Jamaican word.`})
        } else {
            this.setState({displayText: `${this.state.value} is not a valid Jamaican word.`})
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
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
        {this.state.displayText}
      </div>
    );
  }
}

export default WordForm;
