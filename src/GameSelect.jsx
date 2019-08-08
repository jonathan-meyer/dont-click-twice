import React from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

export default function({ games, onGameSelect }) {
  return (
    <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
      <p>Pick a Game</p>
      <ButtonGroup>
        {games &&
          games.map(({ key, title, logo }) => (
            <Button
              key={key}
              variant="outline-dark"
              onClick={e => onGameSelect && onGameSelect({ key, title })}
            >
              {title}
              <Image src={logo} thumbnail />
            </Button>
          ))}
      </ButtonGroup>
    </div>
  );
}
