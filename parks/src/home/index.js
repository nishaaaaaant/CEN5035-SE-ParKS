import React from "react";
import { useNavigate } from "react-router-dom";

// Style imports
import { HomeContainer, AvtarBox, AvtarContainer } from "./styles";

const Home = () => {
  let navigate = useNavigate();

  const handleOnBuyersClick = () => {
    navigate("/buyer");
  };

  const handleOnRentersClick = () => {
    navigate("/renter");
  };

  return (
    <HomeContainer id="homePageDiv">
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
