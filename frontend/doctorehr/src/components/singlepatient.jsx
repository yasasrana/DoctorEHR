import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios, { BASE_URL } from "../api/axios";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import Datecard from "./datecard";
import Header from "./Header";

export default function Singlepatient() {
  const id = useParams().id;

  const [records, setRecords] = useState([]);
  const [nulla, setNulla] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [telephone, setTel] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [complaint, setComplaint] = useState("");
  const [bloodpressure, setBpressure] = useState("");
  const [pulse, setPulse] = useState("");
  const [weight, setWeight] = useState("");
  const [illness, Setilness] = useState([]);
  const [Treatment, SetTreatment] = useState([]);
  const { auth } = useAuth();
  const Token = auth?.accessToken;

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await authAxios.get(`patient/get/${id}`);

        const date = response.data.patient.dob.substring(0, 10);
        var dateParts = date.split("-");
        var thisyear = new Date().getFullYear();
        var years = thisyear - dateParts[0];

        setRecords(response.data.patient.records);
        setFirstname(response.data.patient.firstname);
        setLastname(response.data.patient.lastname);
        setTel(response.data.patient.telephone);
        setDob(years);
        setSex(response.data.patient.sex);

        console.log(response.data.patient.records);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecords();
    console.log(records);
  }, []);



  const viewrecordHandler = async (
    complaint,
    bloodpressure,
    illness,
    Treatment,
    weight,
    pulse
  ) => {
    setBpressure(bloodpressure);
    Setilness(illness);
    SetTreatment(Treatment);
    setComplaint(complaint);
    setWeight(weight);
    setPulse(pulse);
  };

  const recordlist = records.map((record) => (
    <Datecard
      record={record}
      key={record._id}
      clickHander={viewrecordHandler}
    />
  ));

  return (
    <div>
      <section>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h4>Patient History</h4>
            <Container>
              <Card>
                <Row>
                  <h6 className="m-3 px-2">
                    {firstname}
                    {lastname} | {dob} years |{telephone} |{sex}
                  </h6>
                </Row>
                <Row>
                  <Col md="3">{recordlist}</Col>
                  <Col md="9">
                    <Card border="primary" className="m-3 p-3">
                      <Card.Title>Medical Record</Card.Title>
                      <Card.Body>
                        <p className="p-0">{complaint}</p>
                        <h6 className="p-2">Blood pressure: {bloodpressure}</h6>
                        <h6 className="p-2">Weight: {weight}Kg</h6>
                        <h6 className="p-2">Pulse: {pulse} beats</h6>
                        <h6 className="p-2">Illness: </h6>
                        {illness.map((element, index) => (
                          <Badge className="mx-1" pill bg="primary" key={index}>
                            {element}
                          </Badge>
                        ))}
                        <h6 className="p-2">Treatment: </h6>
                        {Treatment.map((element, index) => (
                          <Badge className="mx-1" pill bg="info" key={index}>
                            {element}
                          </Badge>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Container>
          </Col>
        </Row>
      </section>
    </div>
  );
}
