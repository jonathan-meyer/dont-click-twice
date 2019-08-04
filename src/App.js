import React from "react";

import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import Game from "./Game";
import data from "./data.json";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: ""
    };
  }

  render() {
    const { version } = this.state;
    const gameData = data[version];

    return (
      <Container>
        {gameData ? (
          <Game {...gameData} />
        ) : (
          <div className="d-flex flex-column  justify-content-center vh-100 align-items-center">
            <p>Pick a Version</p>
            <ButtonGroup>
              {Object.keys(data).map(key => (
                <Button
                  variant="outline-dark"
                  key={key}
                  onClick={e => this.setState({ version: key })}
                >
                  {data[key].title}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        )}
      </Container>
    );
  }
}

export default App;
