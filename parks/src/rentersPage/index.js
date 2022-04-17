import React, { lazy, Suspense, useState, useRef } from "react";
// import MyMap from "./MyMap";
import RenterForm from "./RenterForm";
import {
  ListOfAddrContainer,
  NewAddNewAddrContainer,
  AddIcon,
  AddAddrLabel,
} from "./style";

import MyMap from "../buyersPage/MyMap";

import { geojson } from "../buyersPage/MyMap";

import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
mapboxgl.accessToken = MAPBOX_TOKEN;

const NavbarComponent = lazy(() => import("../common/navbar"));
const AddressListBox = lazy(() => import("../buyersPage/AddressListBox"));

const RentersPage = () => {
  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };
  const [flag, setFlag] = useState(false);
  const [mapFlag, setMapFlag] = useState(true);
  const [lngLat, setLngLat] = useState([0, 0]);

  let map = useRef(null);

  const fetchMapRef = (mapRef) => {
    map = mapRef;
  };

  const onNewClick = () => {
    setFlag(true);
  };

  const handleOnCancelClick = () => {
    setMapFlag(true);
  };

  const handleOnMapCancelClick = () => setFlag(false);

  const handleOnselect = () => setMapFlag(false);

  const getLngLat = (lngLat) => setLngLat(lngLat)

  const renderAddressList = () => {
    return (
      <ListOfAddrContainer>
        <h4>List of Rented Spaces</h4>
        {/* <button onClick={onNewClick}>Add New Address</button> */}
        <NewAddNewAddrContainer onClick={onNewClick}>
          <AddIcon>+</AddIcon>
          <AddAddrLabel>Add new Address</AddAddrLabel>
        </NewAddNewAddrContainer>
        {geojson.features.map((ele, i) => {
          return (
            <AddressListBox
              key={i}
              data={ele}
              handleOnContinueClick={null}
              isCalledFromRenter={true}
            />
          );
        })}
      </ListOfAddrContainer>
    );
  };

  const renderRentersForm = () => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "33.33%" }}>{renderAddressList()}</div>
        <div style={{ width: "66.66%" }}>
          {mapFlag ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <MyMap fetchMapRef={fetchMapRef} isCalledFrom={"RENTER"} getLngLat={getLngLat} />
              <div style={{ display: "flex" }}>
                <button onClick={handleOnselect}>Select</button>
                <button onClick={handleOnMapCancelClick}>Cancel</button>
              </div>
            </div>
          ) : (
            <RenterForm handleOnCancelClick={handleOnCancelClick} lngLat={lngLat} />
          )}
        </div>
        {/* <RenterForm handleOnCancelClick={handleOnCancelClick} />; */}
      </div>
    );
  };

  return (
    <div id="renterPageDiv">
      {renderNavbar()}
      {!flag ? renderAddressList() : renderRentersForm()}
    </div>
  );
};

export default React.memo(RentersPage);
