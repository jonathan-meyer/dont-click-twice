import * as _ from "lodash";
import React from "react";

import Container from "react-bootstrap/Container";

import Game from "./Game";
import GameSelect from "./GameSelect";

import data from "./data.json";
import images from "./images.json";

import "./App.css";

_.merge(data, images);

const randomize = list => {
  const orig = [...list];
  const random = [];

  while (orig.length > 0) {
    random.push(orig.splice(Math.floor(Math.random() * orig.length), 1).pop());
  }

  return random;
};

class App extends React.Component {
  state = {
    game: "",
    gameOver: false,
    games: Object.keys(data).map(key => ({
      key,
      title: data[key].title,
      logo: data[key].logo
    })),
    title: "",
    images: [],
    selected: [],
    highScore: 0
  };

  render() {
    return (
      <Container>
        {this.state.game ? (
          <Game
            title={this.state.title}
            images={randomize(this.state.images)}
            onImageSelect={image => {
              if (this.state.selected.includes(image)) {
                this.setState({
                  gameOver: true,
                  highScore: Math.max(
                    this.state.highScore,
                    this.state.selected.length
                  ),
                  selected: []
                });
              } else {
                this.setState({ selected: [...this.state.selected, image] });
              }
            }}
            score={this.state.selected.length}
            highScore={this.state.highScore}
          />
        ) : (
          <GameSelect
            games={this.state.games}
            onGameSelect={game => {
              this.setState({
                game: game.key,
                title: game.title,
                images: data[game.key].images
              });
            }}
          />
        )}
      </Container>
    );
  }
}

export default App;
