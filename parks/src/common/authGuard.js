import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserDetails } from "./utils";

const PrivateRoute = ({ children }) => {
  let location = useLocation();

  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    setPreviousLocation(location);
  });

  const isLoggedIn = getUserDetails().isLoggedIn === "true" ? true : false;

  return isLoggedIn ? (
    children
  ) : previousLocation ? (
    <Navigate
      to="/login"
      state={{
        previousLocation: previousLocation ? previousLocation.pathname : "",
      }}
    />
  ) : null;
};

export default PrivateRoute;
