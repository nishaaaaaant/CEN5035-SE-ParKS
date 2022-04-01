import React, { lazy, Suspense } from "react";
import MyMap from "./MyMap";

import { InputGroup, FormControl } from "react-bootstrap";
import {
  BuyersContainer,
  BuyerDetailsContainer,
  BuyerListContainer,
  BuyerMapContainer,
} from "./styles";
import AddressListBox from "./AddressListBox";

const tempData = [
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

const BuyersPage = () => {
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
            return <AddressListBox key={i} data={ele} />;
          })}
        </BuyerListContainer>
      </Suspense>
    );
  };

  return (
    <div id="buyerPageDiv">
      {renderNavbar()}
      <BuyersContainer>
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search a location"
              aria-label="Search a location"
            />
            <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
          </InputGroup>
        </div>
        <BuyerDetailsContainer>
          {renderAddressList()}
          <BuyerMapContainer>
            <MyMap />
          </BuyerMapContainer>
        </BuyerDetailsContainer>
      </BuyersContainer>
    </div>
  );
};

export default React.memo(BuyersPage);
