import styled from "styled-components";
import homeBg from "../assets/Parks.jpeg";
import { Navbar } from "react-bootstrap";

export const HomeContainer = styled.div`
  background-color: grey;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${homeBg});
`;

export const AvtarBox = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #f44336;
  box-shadow: 5px 5px 15px 5px #000000;
`;

export const AvtarContainer = styled.div`
  height: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const NavbarHome = styled(Navbar)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
`;
