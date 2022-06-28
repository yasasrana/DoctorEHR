import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import {
  Form,
  Badge,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Card,
  FormGroup,
  Stack,
} from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios, { BASE_URL } from "../api/axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { toast, Zoom, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export default function Addrecord() {
  const { auth, setAuth } = useAuth();

  const [complaint, setComplaint] = useState("");
  const [bloodpressure, setBpressure] = useState("");
  const [pulse, setPulse] = useState("");
  const [weight, setWeight] = useState("");
  const [selects, setSelects] = useState();
  const [select, setSelect] = useState();
  const [illness, Setilness] = useState([]);
  const [Treatment, SetTreatment] = useState([]);

  const navigate = useNavigate();
  const id = useParams().id;
  const Token = auth?.accessToken;
  console.log(auth);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  const notify = () => {
    toast.success("successfully created", {
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const notifyerr = () => {
    toast.error("error", {
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authAxios.post(
        `patient/records/${id}`,
        JSON.stringify({
          weight,
          pulse,

          complaint,
          bloodpressure,
          illness,
          Treatment,
        }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );

      console.log(res.data);

      notify();

      setComplaint("");
      SetTreatment([]);
      Setilness([]);
      setWeight("");
      setPulse("");
      setBpressure("");
    } catch (error) {
      notifyerr();
    }
  };

  const addIllness = (illl) => {
    Setilness((illness) => [...illness, illl]);
    console.log(illness);
  };

  const addtreatment = (treat) => {
    SetTreatment((Treatment) => [...Treatment, treat]);
    console.log(Treatment);
  };

  return (
    <div>
      <section>
        <>
          <ToastContainer
            draggable={false}
            transition={Zoom}
            autoClose={2000}
          />
        </>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <form onSubmit={handleSubmit}>
              <h4>Medical Record</h4>
              <Row>
                <Form.Group as={Col} md="6" controlId="formcomplaint">
                  <Form.Label>Complaint</Form.Label>

                  <textarea
                    className="form-control "
                    placeholder="Complaint"
                    id="exampleFormControlTextarea2"
                    rows="4"
                    onChange={(e) => setComplaint(e.target.value)}
                    value={complaint}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="formlastName">
                  <Form.Label>Blood Pressure</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blood pressure"
                    onChange={(e) => setBpressure(e.target.value)}
                    value={bloodpressure}
                    required
                  />
                  <Form.Label>Weight</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="Number"
                      placeholder="Kg"
                      onChange={(e) => setWeight(e.target.value)}
                      value={weight}
                      required
                    />
                    <InputGroup.Text id="basic-addon2">Kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="formpulse">
                  <Form.Label>Pulse</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pulse"
                    onChange={(e) => setPulse(e.target.value)}
                    value={pulse}
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group as={Col} md="6" controlId="formillness">
                    <Form.Label>Illness</Form.Label>
                    <br></br>
                    <select
                      value={selects}
                      onChange={(e) => addIllness(e.target.value)}
                    >
                      <option>Fever</option>
                      <option>Shorteness of breath</option>
                      <option>weekness of fatigue</option>
                    </select>
                  </Form.Group>
                  {illness.map((element, index) => (
                    <Badge mb="3" className="mt-3 mx-1" pill bg="primary" key={index}>
                      {element}
                    </Badge>
                  ))}
                </Col>
                <Col md={6}>
                  <Form.Group as={Col} md="6" controlId="formpulse">
                    <Form.Label>Treatment</Form.Label>
                    <br></br>
                    <select
                      value={select}
                      onChange={(e) => addtreatment(e.target.value)}
                    >
                      <option>Electrofiagram</option>
                      <option>Holter monitering</option>
                      <option>Ecocardiogram</option>
                    </select>
                  </Form.Group>
                  {Treatment.map((element, index) => (
                    <Badge mb="3" className="mt-3 mx-1" pill bg="info" key={index}>
                      {element}
                    </Badge>
                  ))}
                </Col>
              </Row>
              <Form.Group>
                <Button id="submitbtn" variant="primary" className="m-3" type="submit">
                  Save
                </Button>
              </Form.Group>
            </form>
          </Col>
        </Row>
      </section>
    </div>
  );
}
