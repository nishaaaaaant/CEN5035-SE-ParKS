import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button, Navbar, Nav, Container } from "react-bootstrap";

import { NavbarHome } from "../home/styles";

const About = () => {
  let navigate = useNavigate();

  const handleOnHomePage = () => {
    navigate("/");
  };
  const handleOnRegisterClick = () => {
    navigate("/registration");
  };
  const handleOnLoginPage = () => {
    navigate("/login");
  };
  return (
    <>
      <NavbarHome bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={handleOnHomePage}>ParkS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link onClick={handleOnLoginPage}>Login</Nav.Link>
            <Nav.Link onClick={handleOnRegisterClick}>Register</Nav.Link>
          </Nav>
        </Container>
      </NavbarHome>
    </>
  );
};

export default React.memo(About);
