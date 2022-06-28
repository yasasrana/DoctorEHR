import React from "react";
import { Badge, Button, Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Datecard = (props) => {
  const {
    _id,
    complaint,
    bloodpressure,
    illness,
    Treatment,
    createdAt,
    weight,
    pulse,
  } = props.record;
 
 const date= createdAt.substring(0, 10);

  return (
    <Button
      className="my-2 mx-3"
      id="viewbtn"
      key={_id}
      variant="outline-primary"
      onClick={() =>
        props.clickHander(
          complaint,
          bloodpressure,
          illness,
          Treatment,
          weight,
          pulse
        )
      }
    >
      {date}
    </Button>
  );
};

export default Datecard;
