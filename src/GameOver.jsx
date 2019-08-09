import React from "react";

import Emoji from "@stej/emoji";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function({ score, max, show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body align="center">
        {score === max ? (
          <div>
            <p>
              <Emoji>{"🦄😀🥳🎆🎉🕺🏼"}</Emoji>
            </p>
            <p className="font-weight-bold">
              Yeah!! You clicked all of the images only once!
            </p>
          </div>
        ) : (
          <div>
            <p>
              <Emoji>{"😦😢🤦🏼‍♂️🙁😞"}</Emoji>
            </p>
            <p className="font-weight-bold">
              {score} image
              {score > 1 ? "s were " : " was "}
              clicked only once.
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
