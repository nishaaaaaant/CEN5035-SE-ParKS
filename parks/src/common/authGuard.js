import React from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "./utils";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = getUserDetails().isLoggedIn;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
