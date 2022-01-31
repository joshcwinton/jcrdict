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
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Jamaican Creole Dictionary</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <WordForm />
      </Container>
    </div>
  );
}

export default App;
