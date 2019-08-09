import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export default function({ title, images, onImageSelect, score, highScore }) {
  const rows = [];
  let column = [];

  images.map(
    (image, i) =>
      column.push(image) &&
      ((i + 1) % 4 === 0 && rows.push(column) && (column = []))
  );

  return (
    <Card className="vh-100">
      <Card.Header className="text-dark">
        <h1>{title}</h1>
        <div className="d-flex justify-content-around">
          <h3>
            <Badge variant="info">
              Score{" "}
              <Badge pill variant="light">
                {score}
              </Badge>
            </Badge>
          </h3>
          <h3>
            <Badge variant="info">
              High Score{" "}
              <Badge pill variant="light">
                {highScore}
              </Badge>
            </Badge>
          </h3>
        </div>
      </Card.Header>
      <Card.Body className="d-flex justify-content-center flex-wrap align-items-center">
        {rows.map((row, key) => (
          <Row key={`row-${key}`} className="mb-2 h-25">
            {row.map((image, key) => (
              <Col key={`col-${key}`}>
                <Button
                  variant="outline-dark"
                  onClick={e => onImageSelect && onImageSelect(image)}
                >
                  <Image src={image} thumbnail width={240} height={320} />
                </Button>
              </Col>
            ))}
          </Row>
        ))}
      </Card.Body>
    </Card>
  );
}
