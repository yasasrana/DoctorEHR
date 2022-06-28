import React, { useRef, Section, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, Zoom, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LOGIN_URL = "/doctor/login";

export default function UserLogin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const from = "/createpatient";

  const userRef = useRef("");
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const notify = () => {
    toast.success("successfully created", {
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const notifyerr = (err) => {
    toast.error(`error ${err}`, {
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const username = response?.data?.username;

      localStorage.setItem("user", JSON.stringify({ user, accessToken }));
      console.log({ user, accessToken });

      setAuth({ user, accessToken });

      navigate(from);
      notify();
    } catch (err) {
      if (!err?.response) {
        console.log(err);

        notifyerr("No Server Response");
      } else if (err.response?.status === 400) {
        notifyerr("Missing Username or Password");
      } else if (err.response?.status === 401) {
        notifyerr("Unauthorized");
      } else {
        notifyerr("login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <>
        <ToastContainer draggable={false} transition={Zoom} autoClose={2000} />
      </>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Doctor Login</h1>
          <form onSubmit={handleSubmit}>
            <Form.Group role="form" className="m-3" id="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                id="username"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </Form.Group>
            <Form.Group className="m-3" id="formBasicPassword">
              <label htmlFor="password">Password:</label>
              <Form.Control
                className="form-control"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />

              <Button className="m-3" variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
          </form>
        </Col>
      </Row>
    </section>
  );
}
