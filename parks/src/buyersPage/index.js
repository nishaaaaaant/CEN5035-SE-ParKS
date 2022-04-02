import React, { lazy, Suspense, useState } from "react";
import MyMap from "./MyMap";

import { InputGroup, FormControl } from "react-bootstrap";
import {
  BuyersContainer,
  BuyerDetailsContainer,
  BuyerListContainer,
  BuyerMapContainer,
} from "./styles";
import AddressListBox from "./AddressListBox";

export const tempData = [
  {
    address: {
      line1: "4000 SW 37th Blvd",
      line2: "Apt#1422",
      city: "Gainesville",
      state: "FL",
      zip: "32608",
    },
    rate: 10,
  },
  {
    address: {
      line1: "4000 SW 37th Blvd",
      line2: "Apt#1422",
      city: "Gainesville",
      state: "FL",
      zip: "32608",
    },
    rate: 10,
  },
  {
    address: {
      line1: "4000 SW 37th Blvd",
      line2: "Apt#1422",
      city: "Gainesville",
      state: "FL",
      zip: "32608",
    },
    rate: 10,
  },
];

const NavbarComponent = lazy(() => import("../common/navbar"));
// const AddressListBox = lazy(() => import("./AddressListBox"));
const SlotBooking = lazy(() => import("./SlotBooking"));

const BuyersPage = () => {
  const [flag, setFlag] = useState(false);

  const handleOnContinueClick = () => {
    setFlag(true);
  };

  const handleonCancelClick = () => {
    setFlag(false);
  };

  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  const renderAddressList = () => {
    return (
      <Suspense fallback={""}>
        <BuyerListContainer>
          {tempData.map((ele, i) => {
            return (
              <AddressListBox
                key={i}
                data={ele}
                handleOnContinueClick={handleOnContinueClick}
                isCalledFromRenter={false}
              />
            );
          })}
        </BuyerListContainer>
      </Suspense>
    );
  };

  return (
    <div id="buyerPageDiv">
      {renderNavbar()}
      {!flag ? (
        <BuyersContainer>
          <BuyerDetailsContainer>
            {renderAddressList()}
            <BuyerMapContainer>
              <MyMap />
            </BuyerMapContainer>
          </BuyerDetailsContainer>
        </BuyersContainer>
      ) : (
        <SlotBooking handleonCancelClick={handleonCancelClick} />
      )}
    </div>
  );
};

export default React.memo(BuyersPage);
