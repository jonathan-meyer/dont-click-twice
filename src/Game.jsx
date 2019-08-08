import React from "react";

import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

class Game extends React.Component {
  state = { selected: [] };

  render() {
    const { title, images } = this.props;

    console.log({ props: this.props });

    return (
      <>
        <Card>
          <Card.Header className="text-dark">
            <h1>{title}</h1>
          </Card.Header>
          <Card.Body className="d-flex justify-content-center flex-wrap align-items-center">
            {images &&
              images.map((image, key) => (
                <Image
                  key={key}
                  src={image}
                  thumbnail
                  width={240}
                  height={320}
                  className="m-3"
                />
              ))}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Game;
