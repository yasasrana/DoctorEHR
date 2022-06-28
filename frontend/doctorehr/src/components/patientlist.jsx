import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Patientcard from "./patientcard";
import axios, { BASE_URL } from "../api/axios";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import { Router } from "react-router-dom";

function Patientlist() {
  const { auth, setAuth } = useAuth();
  const [patients, setPatients] = useState([]);

  const Token =auth?.accessToken;

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  useEffect(() => {
    const fetchpatients = async () => {
      try {
        const response = await authAxios.get("/patient/get");

        setPatients(response.data.patients);
        console.log(patients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchpatients();
    console.log(patients);
  }, []);

  const renderpatientlist = patients.map((patient) => (
    <Patientcard patient={patient} key={patient._id} />
  ));

  return (
    <div>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <section>{renderpatientlist}</section>
        </Col>
      </Row>
    </div>
  );
}

export default Patientlist;
