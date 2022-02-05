import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button, Navbar, Nav, Container } from "react-bootstrap";

import { LoginContainer } from "./styles";
import { NavbarHome } from "../home/styles";

const Login = () => {
  let navigate = useNavigate();

  const handleOnHomePage = () => {
    navigate("/");
  };
  const handleOnRegisterClick = () => {
    navigate("/registration");
  };
  const handleOnAbout = () => {
    navigate("/about");
  };
  return (
    <>
      <NavbarHome bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={handleOnHomePage}>ParkS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onclick={handleOnAbout}>About</Nav.Link>
            <Nav.Link onClick="#login">Login</Nav.Link>
            <Nav.Link onClick={handleOnRegisterClick}>Register</Nav.Link>
          </Nav>
        </Container>
      </NavbarHome>
      <LoginContainer>
        <Form>
          <h1>Login to ParkS</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </LoginContainer>
    </>
  );
};

export default React.memo(Login);
