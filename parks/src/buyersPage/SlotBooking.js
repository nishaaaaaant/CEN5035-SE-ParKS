import React from "react";
import DatePicker from "react-datepicker";
import { timeslots } from "../constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SlotContainer,
  ButtonContainer,
  CancelButton,
  BookNowButton,
  Flex,
} from "./styles";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getUserDetails } from "../common/utils";
import { userBookNow } from "./ActionCreator";

const SlotBooking = (props) => {
  const { handleonCancelClick, selectedLocation } = props;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  console.log(selectedLocation);

  const handelOnBookNow = () => {
    const userData = getUserDetails();
    const data = {
      UserId: userData.userId,
      RenterId: selectedLocation.id,
      Flag: "pending",
      NoOfSpace: "2",
      Rate: 10,
      StartDate: new Date(),
      EndDate: new Date(),
      StartTime: "12",
      EndTime: "1",
      Feature: selectedLocation.features,
    };
    console.log(data);
    dispatch(userBookNow(data));
    navigate("/");
  };
  //handle On book now func{data = {}}

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SlotContainer id="slots">
        <label>Continue Booking:</label>
        <Flex>
          <Flex>
            <label>Select Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + 7)}
              showDisabledMonthNavigation
              // onCalendarClose={handleCalendarClose}
              // onCalendarOpen={handleCalendarOpen}
            />
          </Flex>
          <Flex>
            <label>Select Slot:</label>
            <Dropdown>
              <Dropdown.Toggle id="slots-list">Select Slots</Dropdown.Toggle>
              <Dropdown.Menu>
                {timeslots.map((ele, i) => (
                  <Dropdown.Item
                    key={i}
                  >{`${ele[0]} - ${ele[1]}`}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Flex>
        </Flex>
      </SlotContainer>
      <ButtonContainer>
        <CancelButton onClick={handleonCancelClick}>Cancel</CancelButton>
        <BookNowButton onClick={handelOnBookNow}>Book Now</BookNowButton>
      </ButtonContainer>
    </div>
  );
};

export default React.memo(SlotBooking);
