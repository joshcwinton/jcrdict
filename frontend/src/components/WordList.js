import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class WordList extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, words: null };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/words`)
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            words: res,
          });
        },
        (err) => {
          this.setState({
            isLoaded: true,
            err,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, words } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="p-3">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Word</th>
                <th>Definition</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(words).map((word) => (
                <tr key={word}>
                  <td>{word}</td>
                  <td>{words[word]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default WordList;
