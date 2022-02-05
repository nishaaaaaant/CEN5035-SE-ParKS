import React, { useEffect, lazy, Suspense } from "react";
import { RegisterDiv, RegisterForm } from "./styles";
import { NavbarHome } from "../home/styles";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const handleOnRegisterClick = () => {
  console.log("register pe click kiyaa");
};

const RegisterPage = () => {
  let navigate = useNavigate();

  const handelOnHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <NavbarHome bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={handelOnHomeClick}>Parkss</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#features">Login</Nav.Link>
            <Nav.Link onClick={handleOnRegisterClick}>Register</Nav.Link>
          </Nav>
        </Container>
      </NavbarHome>

      <RegisterDiv>
        <RegisterForm>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            onClick={handleOnRegisterClick}
            className="btn btn-primary btn-block"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a onClick={null}>sign in?</a>
          </p>
        </RegisterForm>
      </RegisterDiv>
    </>
  );
};

export default React.memo(RegisterPage);
