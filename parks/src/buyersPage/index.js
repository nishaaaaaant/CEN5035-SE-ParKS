import React, { lazy, Suspense, useState, useRef } from "react";
import MyMap from "./MyMap";
import { geojson } from "./MyMap";

// import { InputGroup, FormControl } from "react-bootstrap";
import {
  BuyersContainer,
  BuyerDetailsContainer,
  BuyerListContainer,
  BuyerMapContainer,
} from "./styles";
import AddressListBox from "./AddressListBox";

import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
mapboxgl.accessToken = MAPBOX_TOKEN;

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
  let map = useRef(null);

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

  const flyToLocation = (location) => {
    map.current.flyTo({
      center: location.geometry.coordinates,
      zoom: 15,
    });
  };

  const displayPopup = (location) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(location.geometry.coordinates)
      .setHTML(`<h3>Location No:</h3><h4>${location.properties.address}</h4>`)
      .addTo(map.current);
  };

  const handleOnAddressListClick = (feature) => {
    debugger
    flyToLocation(feature);
    displayPopup(feature);

    // const activeItem = document.getElementsByClassName("active");
    // if (activeItem[0]) {
    //   activeItem[0].classList.remove("active");
    // }
    // this.parentNode.classList.add("active");
  };

  const fetchMapRef = (mapRef) => {
    map = mapRef;
  };

  const renderAddressList = () => {
    return (
      <Suspense fallback={""}>
        <BuyerListContainer>
          {geojson.features.map((ele, i) => {
            return (
              <AddressListBox
                key={i}
                data={ele}
                handleOnContinueClick={handleOnContinueClick}
                isCalledFromRenter={false}
                onClick={() => handleOnAddressListClick(ele)}
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
              <MyMap fetchMapRef={fetchMapRef} />
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
