import React from "react";

// Style imports
// import { BuyerListContainer } from "./styles";

const AddressListBox = (props) => {

  const {
    data: {
      address: { line1, line2, city, state, zip },
      rate,
    },
    handleOnContinueClick
  } = props;

  return (
    <div>
      <label>{line1 ? line1 : "Hii"},</label>
      <label>{line2 ? line2 : "Hii"}</label>
      <div>
        <label>{city ? city : "hii"}, </label>
        <label>{state ? state : "hii"}, </label>
        <label>{state ? zip : "hii"}</label>
      </div>
      <label>Rate: {rate ? rate : 10}</label>
      <button onClick={handleOnContinueClick}>Continue</button>
    </div>
  );
};

export default React.memo(AddressListBox);
