import React from "react";
import { Badge, Button, Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Patientcard = (props) => {
  const { _id, firstname, lastname, dob, telephone } = props.patient;

  return (
    <Card
      id="id"
      border="primary"
      className="m-3 p-2"
      style={{ width: "40rem" }}
      key={_id}
    >
      <Card.Title classname="m-2">
        <Badge pill bg="primary">
          {firstname} {lastname}
        </Badge>
      </Card.Title>
      <Card.Body>
        <h6>{telephone}</h6>
        <br></br>
        <Link to={{ pathname: `/singlepatient/${_id}` }}>
          <Button id="viewbtn" variant="outline-info">
            View
          </Button>
        </Link>
        <Link to={{ pathname: `/addrecord/${_id}` }}>
          <Button id="addrecord" variant="outline-warning" className="mx-3">
            Add Record
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Patientcard;
