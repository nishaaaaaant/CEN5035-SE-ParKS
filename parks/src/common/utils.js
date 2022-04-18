import { requestUserLogout } from "../login/Actions";
// import { useDispatch } from "react-redux";
import store from "../store";

// let dispatch = useDispatch();

export const setUserDetails = (isLoggedIn, userId, firstName) => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
  localStorage.setItem("userId", userId);
  localStorage.setItem("firstName", firstName);
};

export const getUserDetails = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userId = localStorage.getItem("userId");
  const firstName = localStorage.getItem("firstName");
  return { isLoggedIn: isLoggedIn, userId: userId, firstName: firstName };
};

export const logout = () => {
  localStorage.setItem("isLoggedIn", false);
  localStorage.setItem("userId", "");
  localStorage.setItem("firstName", "");
  store.dispatch(requestUserLogout());
};
