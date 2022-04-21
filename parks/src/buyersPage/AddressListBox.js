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
      features: {
        properties: { address1, address2, city, state },
      },
    },
    handleOnContinueClick,
    isCalledFromRenter,
    onClick,
  } = props;

  return (
    <AddressListBoxContainer onClick={onClick}>
      <div>
        <AddressLabel>{address1 ? address1 : ""},</AddressLabel>
        <AddressLabel>{address2 ? address2 : ""},</AddressLabel>
      </div>
      <div>
        <AddressLabel>{city ? city : ""}, </AddressLabel>
        <AddressLabel>{state ? state : ""}, </AddressLabel>
      </div>
      <RateContainer>
        {!isCalledFromRenter ? (
          <ContinueBtn onClick={handleOnContinueClick}>Continue</ContinueBtn>
        ) : null}
      </RateContainer>
    </AddressListBoxContainer>
  );
};

export default React.memo(AddressListBox);
