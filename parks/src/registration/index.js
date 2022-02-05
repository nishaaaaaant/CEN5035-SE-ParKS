import React, { useEffect, useState } from "react";
import { RegisterDiv, RegisterForm } from "./styles";
import { NavbarHome } from "../home/styles";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newUserRegistraion } from "./ActionCreators";

const RegisterPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    homepage: { homePageData, isFetching, isSuccess },
  } = useSelector((state) => state);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isFetching && isSuccess) {
      navigate("/");
    }
  }, [isFetching, isSuccess]);

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const handelOnHomeClick = () => {
    navigate("/");
  };

  const handleOnLoginPage = () => {
    navigate("/login");
  };

  const handleOnRegister = () => {
    navigate("/registration");
  };

  const handleOnFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleOnLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleOnEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnRegisterClick = (e) => {
    e.preventDefault();
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Email: emailId,
      Password: password,
    };
    console.log(data);
    // Call new user registraion API
    dispatch(newUserRegistraion(data));
  };

  return (
    <>
      <NavbarHome bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={handelOnHomeClick}>ParkS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link onClick={handleOnLoginPage}>Login</Nav.Link>
            <Nav.Link onClick={handleOnRegister}>Register</Nav.Link>
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
              onChange={(e) => handleOnFirstNameChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => handleOnLastNameChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => handleOnEmailChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => handleOnPasswordChange(e)}
            />
          </div>
          <button
            type="submit"
            onClick={handleOnRegisterClick}
            className="btn btn-primary btn-block"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">Already registered</p>
          <a style={{ color: "red" }} onClick={handleOnLoginPage}>
            Login
          </a>
        </RegisterForm>
      </RegisterDiv>
    </>
  );
};

export default React.memo(RegisterPage);
