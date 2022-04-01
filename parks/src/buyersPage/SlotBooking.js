import React from "react";
import moment from "moment";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import {
  SlotContainer,
  ButtonContainer,
  CancelButton,
  BookNowButton,
} from "./styles";

const SlotBooking = (props) => {
  const { handleonCancelClick } = props;

  return (
    <div style={{ marginTop: 70, display: "flex", flexDirection: "column" }}>
      <SlotContainer id="slots">
        <ReactTimeslotCalendar
          initialDate={moment().format("YYYY-MM-DD")}
          let
          timeslots={[
            ["1", "2"], // 1:00 AM - 2:00 AM
            ["2", "3"],
            ["3", "4"],
            ["4", "5"],
            ["5", "6"],
            ["6", "7"],
            ["7", "8"],
            ["8", "9"],
            ["9", "10"],
            ["10", "11"],
            ["11", "12"],
            ["12", "13"],
            ["13", "14"],
            ["14", "15"],
            ["15", "16"],
            ["16", "17"],
            ["17", "18"],
            ["18", "19"],
            ["19", "20"],
            ["20", "21"],
            ["21", "22"],
            ["22", "23"],
            ["23", "24"],
            ["24", "1"],
          ]}
          onSelectTimeslot={(timeslots, lastSelected) => {
            console.log("All Timeslots:");
            console.log(timeslots);

            console.log("Last selected timeslot:");
            console.log(lastSelected);
          }}
        />
      </SlotContainer>
      <ButtonContainer>
        <CancelButton onClick={handleonCancelClick}>Cancel</CancelButton>
        <BookNowButton>Book Now</BookNowButton>
      </ButtonContainer>
    </div>
  );
};

export default React.memo(SlotBooking);
