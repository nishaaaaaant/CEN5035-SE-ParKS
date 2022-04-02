import React from "react";

// Style imports
import {
  AddressListBoxContainer,
  AddressLabel,
  ContinueBtn,
  RateContainer,
} from "./styles";

const AddressListBox = (props) => {
  const {
    data: {
      address: { line1, line2, city, state, zip },
      rate,
    },
    handleOnContinueClick,
    isCalledFromRenter,
  } = props;

  return (
    <AddressListBoxContainer>
      <div>
        <AddressLabel>{line1 ? line1 : "Hii"},</AddressLabel>
        <AddressLabel>{line2 ? line2 : "Hii"}</AddressLabel>
      </div>

      <div>
        <AddressLabel>{city ? city : "hii"}, </AddressLabel>
        <AddressLabel>{state ? state : "hii"}, </AddressLabel>
        <AddressLabel>{state ? zip : "hii"}</AddressLabel>
      </div>
      <RateContainer>
        <AddressLabel>Rate: {rate ? rate : 10}</AddressLabel>
        {!isCalledFromRenter ? (
          <ContinueBtn onClick={handleOnContinueClick}>Continue</ContinueBtn>
        ) : null}
      </RateContainer>
    </AddressListBoxContainer>
  );
};

export default React.memo(AddressListBox);
