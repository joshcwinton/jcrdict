// import logo from './logo.svg';
// import './App.css';
import React from "react";
import WordForm from "./components/WordForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <div className="App">
      <div className="container py-4">
        {/* <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Jamaican Creole Dictionary</Navbar.Brand>
        </Container>
      </Navbar> */}
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Jamaican Creole Dictionary</h1>
            <p className="col-md-8 fs-4">
              Enter a word to check whether it's in the Jamaican Creole
              dictionary.
            </p>
          </div>
        </div>
        <WordForm />
      </div>
    </div>
  );
}

export default App;
