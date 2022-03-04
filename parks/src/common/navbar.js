import React from "react";
import { useNavigate } from "react-router-dom";

// Style imports
import { NavbarHome } from "./styles";
import { Navbar, Nav, Container } from "react-bootstrap";
import homeLogo from '../assets/logo.jpeg' 

const CommonNavBar = () => {
  let navigate = useNavigate();

  const handleOnLoginPage = () => {
    navigate("/login");
  };

  const handleOnRegisterClick = () => {
    navigate("/registration");
  };

  const handleOnAbout = () => {
    navigate("/about");
  };

  const handleOnHomeClick = () => navigate("/");

  return (
    <NavbarHome bg="dark" variant="dark">
      <Container>
      <Nav.Link onClick={handleOnHomeClick}><img src={homeLogo} style={{width:39, marginTop: -7,marginBottom: -7 }} alt="Logo" /></Nav.Link>
        <Navbar.Brand onClick={handleOnHomeClick}>ParkS</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={handleOnAbout}>About-Us</Nav.Link>
          <Nav.Link onClick={handleOnLoginPage}>Login</Nav.Link>
          <Nav.Link onClick={handleOnRegisterClick}>Register</Nav.Link>
        </Nav>
      </Container>
    </NavbarHome>
  );
};

export default React.memo(CommonNavBar);
