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
      properties: { address, city, state, country },
    },
    handleOnContinueClick,
    isCalledFromRenter,
    onClick,
  } = props;

  return (
    <AddressListBoxContainer onClick={onClick}>
      <div>
        <AddressLabel>{address ? address : "Hii"},</AddressLabel>
      </div>
      <div>
        <AddressLabel>{city ? city : "hii"}, </AddressLabel>
        <AddressLabel>{state ? state : "hii"}, </AddressLabel>
        <AddressLabel>{country ? country : "hii"}</AddressLabel>
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
