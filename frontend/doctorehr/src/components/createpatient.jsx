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

export default function Patientinput() {
  const { auth, setAuth } = useAuth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [telephone, setTel] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [complaint, setComplaint] = useState("");
  const [bloodpressure, setBpressure] = useState("");
  const [pulse, setPulse] = useState("");
  const [weight, setWeight] = useState("");
  const [selects, setSelects] = useState();
  const [select, setSelect] = useState();
  const [illness, Setilness] = useState([]);
  const [Treatment, SetTreatment] = useState([]);

  const navigate = useNavigate();

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
        "/patient/create",
        JSON.stringify({
          firstname,
          lastname,
          dob,
          weight,
          pulse,
          telephone,
          sex,
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

      setDob("");
      setComplaint("");
      SetTreatment([]);
      Setilness([]);
      setFirstname("");
      setLastname("");
      setWeight("");
      setTel("");
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
        <Row>
          <Header />
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h4>Patient Details</h4>
            <form onSubmit={handleSubmit}>
              <Row>
                <Form.Group
                  role="form"
                  as={Col}
                  md="4"
                  controlId="formfirstName"
                >
                  <>
                    <ToastContainer
                      draggable={false}
                      transition={Zoom}
                      autoClose={2000}
                    />
                  </>
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formlastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formdob">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="DOB"
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="formtel">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Telephone"
                    onChange={(e) => setTel(e.target.value)}
                    value={telephone}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formsex">
                  <Form.Label>Sex</Form.Label>
                  <br></br>
                  <Form.Check
                    inline
                    name="group1"
                    type={"radio"}
                    id={`Female`}
                    value="female"
                    label={`Female`}
                    onChange={(e) => setSex(e.target.value)}
                  />
                  <Form.Check
                    inline
                    name="group1"
                    type={"radio"}
                    value="male"
                    id={`Male`}
                    label={`Male`}
                    onChange={(e) => setSex(e.target.value)}
                  />
                  <Form.Check
                    inline
                    name="group1"
                    type={"radio"}
                    value="other"
                    id={`Other`}
                    label={`Other`}
                    onChange={(e) => setSex(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <hr />
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
                    <Badge
                      mb="3"
                      className="mx-1 my-3"
                      pill
                      bg="primary"
                      key={index}
                    >
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
                    <Badge
                      mb="3"
                      className="mx-1 my-3"
                      pill
                      bg="info"
                      key={index}
                    >
                      {element}
                    </Badge>
                  ))}
                </Col>
              </Row>
              <Form.Group>
                <Button
                  id="submitbtn"
                  className="justify-content-end m-3"
                  variant="primary"
                  type="submit"
                >
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
