import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyMap from "./MyMap";
import { fetchAllAddresses } from "../rentersPage/ActionCreators";

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
mapboxgl.accessToken = MAPBOX_TOKEN;

const SlotBooking = lazy(() => import("./SlotBooking"));

const BuyersPage = () => {
  let map = useRef(null);
  let dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const {
    // isSuccess,
    //  isFetching,
    addressData,
  } = useSelector((state) => state.rentersInfo);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  const handleOnContinueClick = () => {
    setFlag(true);
  };

  const handleonCancelClick = () => {
    setFlag(false);
  };

  const flyToLocation = (location) => {
    map.current.flyTo({
      center: location.features.geometry.coordinates,
      zoom: 15,
    });
  };

  const displayPopup = (location) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(location.features.geometry.coordinates)
      .setHTML(
        `<h3>Location No:</h3><h4>${location.features.properties.address1}</h4>`
      )
      .addTo(map.current);
  };

  const handleOnAddressListClick = (feature) => {
    flyToLocation(feature);
    displayPopup(feature);
    setSelectedLocation(feature);
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
          {addressData &&
            addressData.length &&
            addressData.map((ele, i) => {
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
      {!flag && addressData && addressData.length ? (
        <BuyersContainer>
          <BuyerDetailsContainer>
            {renderAddressList()}
            <BuyerMapContainer>
              <MyMap
                fetchMapRef={fetchMapRef}
                isCalledFrom={"BUYER"}
                features={addressData}
              />
            </BuyerMapContainer>
          </BuyerDetailsContainer>
        </BuyersContainer>
      ) : (
        <SlotBooking handleonCancelClick={handleonCancelClick} selectedLocation={selectedLocation} />
      )}
    </div>
  );
};

export default React.memo(BuyersPage);
