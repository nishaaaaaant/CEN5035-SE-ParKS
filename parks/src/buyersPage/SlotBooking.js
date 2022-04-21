import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { timeslots } from "../constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  SlotContainer,
  ButtonContainer,
  CancelButton,
  BookNowButton,
  Flex,
} from "./styles";
import { Dropdown } from "react-bootstrap";
import CheckoutForm from "./CheckoutForm";

import "react-datepicker/dist/react-datepicker.css";
import { getUserDetails } from "../common/utils";
import { userBookNow, getClientSecretKey } from "./ActionCreator";
import { STRIPE_PUBLIC_KEY, CLIENT_SECRECT } from "../constants";
import styled from "styled-components";

const ContinueLabel = styled.label`
  font-size: 24px;
  font-weight: 700;
  border-bottom: 2px solid grey;
  margin: 15px auto;
`;

const SlotBooking = (props) => {
  const { handleonCancelClick, selectedLocation } = props;
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [flag, setFlag] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState([]);

  const stripe = loadStripe(STRIPE_PUBLIC_KEY);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: CLIENT_SECRECT,
  };

  const handelOnBookNow = () => {
    const userData = getUserDetails();
    const data = {
      UserId: userData.userId,
      RenterId: selectedLocation.id,
      Flag: "pending",
      NoOfSpace: selectedLocation.features.properties.noofspace,
      Rate: selectedLocation.features.properties.rate,
      StartDate: startDate,
      EndDate: startDate,
      StartTime: selectedSlot[0],
      EndTime: selectedSlot[1],
      Feature: selectedLocation.features,
    };
    console.log(data);
    dispatch(userBookNow(data));
    navigate("/");
    // setFlag(true);
    // console.log(startDate);
    // console.log(selectedSlot);
    // console.log(selectedLocation);
    // const data = {
    //   UserId: userData.userId,
    //   Amount: 10,
    // };
    // dispatch(getClientSecretKey(data));
  };
  //handle On book now func{data = {}}

  const handleOnDateChange = (date) => {
    console.log(date);
    setStartDate(date);
  };

  const handleOnSlotsChange = (e) => {
    setSelectedSlot(e);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {!flag ? (
        <div style={{ height: "100%" }}>
          <SlotContainer id="slots" style={{ height: "100%" }}>
            <ContinueLabel>Continue Booking:</ContinueLabel>
            <Flex
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <Flex
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <label>Select Date:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(e) => handleOnDateChange(e)}
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 7)}
                  showDisabledMonthNavigation
                />
              </Flex>
              <Flex
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <label>Select Slot:</label>
                <Dropdown onSelect={handleOnSlotsChange}>
                  <Dropdown.Toggle id="slots-list">
                    Select Slots
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ height: "400px", overflowY: "scroll" }}
                  >
                    {timeslots.map((ele, i) => (
                      <Dropdown.Item
                        key={i}
                        eventKey={ele}
                      >{`${ele[0]} - ${ele[1]}`}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Flex>
            </Flex>
            <ButtonContainer>
              <CancelButton onClick={handleonCancelClick}>Cancel</CancelButton>
              <BookNowButton onClick={handelOnBookNow}>Book Now</BookNowButton>
            </ButtonContainer>
          </SlotContainer>
        </div>
      ) : (
        <Elements stripe={stripe} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default React.memo(SlotBooking);
