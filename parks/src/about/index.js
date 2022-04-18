import React from "react";
import { AboutContainer } from "./style";

const About = () => {
  return (
    <AboutContainer id="aboutPageDiv">
      <h3 style={{ marginTop: 60 }}>About-Us</h3>
      <p>We’re on a mission to empower people to get everywhere, easier!</p>
      <p>
        By designing better ways to find, reserve and pay for parking, we make
        life easier, our cities more accessible, and our world more connected.
      </p>
      <p>Reserve a space with a few taps and skip the parking hunt.</p>
      <p>Park your car in seconds and go do your thing.</p>
    </AboutContainer>
  );
};

export default React.memo(About);
