import React, { useState, useRef, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserBooking } from "./ActionCreators";
import UserBookingList from "./UserBookingList";
import {
  BuyersContainer,
  BuyerDetailsContainer,
  BuyerListContainer,
  BuyerMapContainer,
} from "./styles";

const UserBooking = () => {
  let dispatch = useDispatch();

  const {
    isSuccess,
    isError,
    //  isFetching,
    userBookings,
  } = useSelector((state) => state.userbookings);

  useEffect(() => {
    dispatch(fetchAllUserBooking());
  }, [dispatch]);

  const renderBookingList = () => {
    return (
      <Suspense fallback={""}>
        <h1>List of Bookings</h1>
        <BuyerListContainer>
          {userBookings &&
            userBookings.length &&
            userBookings.map((ele, i) => {
              return <UserBookingList key={i} data={ele} />;
            })}
        </BuyerListContainer>
      </Suspense>
    );
  };

  return <div>{renderBookingList()}</div>;
};

export default UserBooking;
