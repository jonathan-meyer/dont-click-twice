import * as _ from "lodash";
import React from "react";

import Container from "react-bootstrap/Container";

import Game from "./Game";
import GameSelect from "./GameSelect";
import GameOver from "./GameOver";

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

  componentDidMount() {
    this.db = window.firebase.database();
    this.highscore = this.db.ref("highscore");

    this.highscore.on("value", snap => {
      this.setState({ highScore: snap.val() || 0 });
    });
  }

  render() {
    const {
      game,
      games,
      gameOver,
      title,
      images,
      selected,
      highScore
    } = this.state;

    return (
      <>
        <Container>
          {game ? (
            <Game
              title={title}
              images={randomize(images)}
              onImageSelect={image => {
                if (selected.includes(image)) {
                  this.setState({
                    gameOver: true
                  });
                } else {
                  this.setState({
                    selected: [...selected, image],
                    gameOver: selected.length === images.length - 1
                  });
                }
              }}
              score={selected.length}
              highScore={highScore}
            />
          ) : (
            <GameSelect
              games={games}
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
        <GameOver
          score={selected.length}
          max={images.length}
          show={gameOver}
          onClose={e => {
            this.highscore.set(Math.max(highScore, selected.length));
            this.setState({
              gameOver: false,
              highScore: Math.max(highScore, selected.length),
              selected: []
            });
          }}
        />
      </>
    );
  }
}

export default App;
