import React, {useState} from "react";
// import moment from "moment";
// import ReactTimeslotCalendar from "react-timeslot-calendar";
import DatePicker from "react-datepicker";
import { timeslots } from "../constants";
import {
  SlotContainer,
  ButtonContainer,
  CancelButton,
  BookNowButton,
  Flex,
} from "./styles";

import { Dropdown } from "react-bootstrap";

const SlotBooking = (props) => {
  const { handleonCancelClick } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SlotContainer id="slots">
        {/* <ReactTimeslotCalendar
          initialDate={moment().format("YYYY-MM-DD")}
          
          onSelectTimeslot={(timeslots, lastSelected) => {
            console.log("All Timeslots:");
            console.log(timeslots);

            console.log("Last selected timeslot:");
            console.log(lastSelected);
          }}
        /> */}

        <Flex>
          <label>Continue Booking:</label>
          <Flex>
            <label>Select Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
        <BookNowButton>Book Now</BookNowButton>
      </ButtonContainer>
    </div>
  );
};

export default React.memo(SlotBooking);
