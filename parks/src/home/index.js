import React, { useEffect, lazy, Suspense } from "react";
// import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchHomePageData } from "./ActionCreators";

// Style imports
import { HomeContainer, AvtarBox, AvtarContainer, NavbarHome } from "./styles";
import { Navbar, Nav, Container } from "react-bootstrap";

const Home = () => {
  let navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const {
  //     homepage: { homePageData },
  //   } = useSelector((state) => state);

  //   // Call Homepage data API
  //   useEffect(() => {
  //     dispatch(fetchHomePageData());
  //   }, [dispatch]);

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const handleOnBuyersClick = () => {
    // history.push("/buyer");
    navigate("/buyer");
  };

  const handleOnRentersClick = () => {
    navigate("/renter");
  };

  const handleOnLoginPage = () => {
    navigate("/login");
  };
  const handleOnRegisterClick = () => {
    navigate("/registration");
  };
  return (
    <HomeContainer>
      <NavbarHome bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Parkss</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link onClick={handleOnLoginPage}>Login</Nav.Link>
            <Nav.Link onClick={handleOnRegisterClick}>Register</Nav.Link>
          </Nav>
        </Container>
      </NavbarHome>

      <AvtarContainer>
        <AvtarBox onClick={handleOnRentersClick}>
          Looking for renting a parking space?
        </AvtarBox>
        <AvtarBox onClick={handleOnBuyersClick}>
          Looking for parking space?
        </AvtarBox>
      </AvtarContainer>
    </HomeContainer>
  );
};

export default React.memo(Home);
