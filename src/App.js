import * as _ from "lodash";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Game from "./Game";

import data from "./data.json";
import images from "./images.json";

import "./App.css";

_.merge(data, images);

function SelectGame() {
  return (
    <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
      <p>Pick a Version</p>
      <ButtonGroup>
        {Object.keys(data).map(key => (
          <Link key={key} to={key}>
            <Button variant="outline-dark">
              {data[key].title}
              <Image src={data[key].logo} fluid />
            </Button>
          </Link>
        ))}
      </ButtonGroup>
    </div>
  );
}

function NoMatch() {
  return <div>404 Not Found</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: ""
    };
  }

  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route path="/" exact component={SelectGame} />
            <Route
              path="/:game"
              exact
              render={props => (
                <Game
                  game={props.match.params.game}
                  {...data[props.match.params.game]}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
