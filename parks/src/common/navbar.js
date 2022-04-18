import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Style imports
import { NavbarHome } from "./styles";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import homeLogo from "../assets/logo.jpeg";
import { getUserDetails, logout } from "./utils";

const CommonNavBar = () => {
  let navigate = useNavigate();

  const { loggedIn } = useSelector((state) => state.login);

  const [firstName, setFirstName] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

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

  const handelOnBuyersPage = () => navigate("/buyer");

  const handelOnRentersPage = () => navigate("/renter");

  const handleOnUpdateUserClick = () => navigate("/update-user");

  useEffect(() => {
    const userData = getUserDetails();
    setFirstName(userData.firstName);
    setisLoggedIn(userData.isLoggedIn === "true" ? true : false);
  }, [loggedIn]);

  return (
    <NavbarHome bg="dark" variant="dark">
      <Container>
        <Nav.Link onClick={handleOnHomeClick}>
          <img
            src={homeLogo}
            style={{ width: 39, marginTop: -7, marginBottom: -7 }}
            alt="Logo"
          />
        </Nav.Link>
        <Navbar.Brand onClick={handleOnHomeClick}>ParkS</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={handleOnAbout}>About-Us</Nav.Link>
          {!isLoggedIn ? (
            <Nav.Link onClick={handleOnLoginPage}>Login</Nav.Link>
          ) : null}
          {!isLoggedIn ? (
            <Nav.Link onClick={handleOnRegisterClick}>Register</Nav.Link>
          ) : null}
          <Nav.Link onClick={handelOnRentersPage}>Renters</Nav.Link>
          <Nav.Link onClick={handelOnBuyersPage}>Buyers</Nav.Link>
          {isLoggedIn ? (
            <Nav.Link style={{ position: "absolute", right: 54, top: 0 }}>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">{firstName}</Button>
                <Dropdown.Toggle
                  split
                  variant="success"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item>User Booking</Dropdown.Item>
                  <Dropdown.Item onClick={handleOnUpdateUserClick}>
                    Update Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          ) : null}
        </Nav>
      </Container>
    </NavbarHome>
  );
};

export default React.memo(CommonNavBar);
