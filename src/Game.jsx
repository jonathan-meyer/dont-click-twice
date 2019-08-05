import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, logo, images } = this.props;

    return (
      <div className="game">
        <h1>{title}</h1>
        <p>{logo}</p>
        <ul>
          {images && images.map((image, key) => <li key={key}>{image}</li>)}
        </ul>
        <pre>{JSON.stringify(images, null, 2)}</pre>
      </div>
    );
  }
}

export default Game;
