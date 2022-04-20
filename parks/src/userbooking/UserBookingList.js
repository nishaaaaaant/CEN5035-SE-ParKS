import React from "react";

// Style imports
import { AddressListBoxContainer, AddressLabel } from "./styles";

const UserBookingList = (props) => {
  const {
    data: {
      starttime,
      endtime,
      rate,
      flag,
      features: {
        properties: { address1, city },
      },
    },
  } = props;

  return (
    <AddressListBoxContainer>
      <div>
        <AddressLabel>
          Address - {address1 ? address1 : "4000 SW 37th Blvd"},
        </AddressLabel>
      </div>
      <div>
        <AddressLabel>City - {city ? city : "Gainesville"},</AddressLabel>
      </div>
      <div>
        <AddressLabel>
          Start time - {starttime ? starttime : "12"},
        </AddressLabel>
      </div>
      <div>
        <AddressLabel>End Time - {endtime ? endtime : "1"}, </AddressLabel>
      </div>
      <div>
        <AddressLabel>Rate - {rate ? rate : "12"},</AddressLabel>
      </div>
      <div>
        <AddressLabel>Status - {flag ? flag : "Pending"},</AddressLabel>
      </div>
    </AddressListBoxContainer>
  );
};

export default UserBookingList;
