import styled from "styled-components";
import homeBg from "../assets/Parks.jpeg";

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
  border-radius: 15px 50px 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #cfcfc4;
  box-shadow: 5px 5px 15px 5px #000000;
  opacity: 0.85;
  font-size: 40px;
`;

export const AvtarContainer = styled.div`
  height: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
