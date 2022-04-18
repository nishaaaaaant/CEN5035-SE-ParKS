import React, { lazy, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllAddresses } from "./ActionCreators";
import RenterForm from "./RenterForm";
import {
  ListOfAddrContainer,
  NewAddNewAddrContainer,
  AddIcon,
  AddAddrLabel,
} from "./style";

import MyMap from "../buyersPage/MyMap";

import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = MAPBOX_TOKEN;

const AddressListBox = lazy(() => import("../buyersPage/AddressListBox"));

const RentersPage = () => {
  let dispatch = useDispatch();

  const {
    isSuccess,
    isError,
    //  isFetching,
    addressData,
  } = useSelector((state) => state.rentersInfo);

  const [flag, setFlag] = useState(false);
  const [mapFlag, setMapFlag] = useState(true);
  const [lngLat, setLngLat] = useState([0, 0]);

  let map = useRef(null);

  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  const fetchMapRef = (mapRef) => {
    map = mapRef;
  };

  const onNewClick = () => {
    setFlag(true);
  };

  const handleOnCancelClick = () => {
    setMapFlag(true);
  };

  const handleOnSubmitClick = () => {
    if (isSuccess && !isError) {
      setFlag(false);
      setMapFlag(true);
    }
  };

  const handleOnMapCancelClick = () => setFlag(false);

  const handleOnselect = () => setMapFlag(false);

  const getLngLat = (lngLat) => setLngLat(lngLat);

  const renderAddressList = () => {
    return (
      <ListOfAddrContainer>
        <h4>List of Rented Spaces</h4>
        {/* <button onClick={onNewClick}>Add New Address</button> */}
        <NewAddNewAddrContainer onClick={onNewClick}>
          <AddIcon>+</AddIcon>
          <AddAddrLabel>Add new Address</AddAddrLabel>
        </NewAddNewAddrContainer>
        {addressData &&
          addressData.length &&
          addressData.map((ele, i) => {
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
      <div style={{ display: "flex", marginTop: 10 }}>
        <div style={{ width: "33.33%" }}>{renderAddressList()}</div>
        <div style={{ width: "66.66%" }}>
          {mapFlag ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <MyMap
                fetchMapRef={fetchMapRef}
                isCalledFrom={"RENTER"}
                getLngLat={getLngLat}
                features={null}
              />
              <div style={{ display: "flex" }}>
                <button onClick={handleOnselect}>Select</button>
                <button onClick={handleOnMapCancelClick}>Cancel</button>
              </div>
            </div>
          ) : (
            <RenterForm
              handleOnCancelClick={handleOnCancelClick}
              handleOnSubmitClick={handleOnSubmitClick}
              lngLat={lngLat}
            />
          )}
        </div>
        {/* <RenterForm handleOnCancelClick={handleOnCancelClick} />; */}
      </div>
    );
  };

  return (
    <div id="renterPageDiv">
      {!flag ? renderAddressList() : renderRentersForm()}
    </div>
  );
};

export default React.memo(RentersPage);
