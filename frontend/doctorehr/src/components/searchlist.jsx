import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Patientcard from "./patientcard";
import axios, { BASE_URL } from "../api/axios";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { Router } from "react-router-dom";
import { toast, Zoom, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Searchlist() {
  const { auth, setAuth } = useAuth();
  const [patients, setPatients] = useState([]);

  const notify = () => {
    toast.success("successfull", {
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const notifywar = () => {
    toast.warning("No patients found", {
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

  const term = useParams().term;
  const Token = auth?.accessToken;
  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  useEffect(() => {
    const fetchpatients = async () => {
      try {
        const response = await authAxios.get(`/patient/search?term=${term}`);
        if (response.data.length == 0) {
          notifywar();
        } else {
          notify();
        }

        setPatients(response.data);
        console.log(patients);
      } catch (error) {
        console.log(error);
        notifyerr();
      }
    };

    fetchpatients();
    console.log(patients);
  }, [term]);

  const rendersearchlist = patients.map((patient) => (
    <Patientcard patient={patient} key={patient._id} />
  ));

  return (
    <div>
      <Row>
        <Header />
      </Row>
      <Row>
        <>
          <ToastContainer
            draggable={false}
            transition={Zoom}
            autoClose={2000}
          />
        </>

        <Col md={{ span: 6, offset: 3 }}>
          <section>{rendersearchlist}</section>
        </Col>
      </Row>
    </div>
  );
}

export default Searchlist;
