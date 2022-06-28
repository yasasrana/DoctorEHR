import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  InputGroup,
  Form,
  FormGroup,
} from "react-bootstrap";
import { FaCreativeCommonsBy } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdPersonSearch } from "react-icons/md";

import {
  Navigate,
  NavLink,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const [term, setSearchTerm] = useState("");
  const [user, setUser] = useState("");

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth?.user);
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    <Navigate to="search" />;

    //Navigate('/search', { term });
    navigate({
      pathname: `/search/${term}`,
    });
    setSearchTerm("");
  };

  const logout = async () => {
    try {
      localStorage.clear();
      setAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Row>
            <Col>
              <NavLink to="/createpatient">
                <Navbar.Brand>
                  <h1>
                    {" "}
                    <FaCreativeCommonsBy />
                  </h1>{" "}
                  <h6>Patient</h6>
                </Navbar.Brand>
              </NavLink>
            </Col>

            <Col>
              <NavLink to="/patientlist">
                <Navbar.Brand>
                  <h1>
                    {" "}
                    <GrHistory />
                  </h1>
                  <h6>History</h6>
                </Navbar.Brand>
              </NavLink>
            </Col>
          </Row>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <form onSubmit={handleSubmit} className="mx-3">
              <Form.Group role="form" as={Col}  controlId="formfirstName">
                <InputGroup className="m-3">
                  <InputGroup.Text><MdPersonSearch/></InputGroup.Text>
                  <Form.Control
                  cl
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={term}
                  />{" "}
                </InputGroup>
              </Form.Group>
            </form>
            <Card className="border-0">
              <Card.Body
                id="profilename"
                border="primary"
                style={{ width: "13rem" }}
                className="mx-3  p-1 "
              >
                <Badge pill bg="primary" className="mx-2">
                  <h6>
                    <CgProfile /> {user}
                  </h6>
                </Badge>
                <Button
                  id="logoutbtn"
                  variant="outline-danger"
                  onClick={() => logout()}
                >
                  <RiLogoutCircleRFill />
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
