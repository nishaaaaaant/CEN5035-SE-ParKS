import React, { lazy, Suspense, useState, useEffect } from "react";
// import { Form } from "react-bootstrap";

// import { LoginContainer, LoginForm, SubmitBtn } from "./styles";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "./ActionCreators";

const NavbarComponent = lazy(() => import("../common/navbar"));

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    isSuccess,
    isFetching,
    userData: { id, email, firstname, lastname, password },
  } = useSelector((state) => state.login);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [pswd, setPswd] = useState("");

  useEffect(() => {
    setFirstName(firstname);
    setLastName(lastname);
    setEmailId(email);
    setPswd(password);
  }, [firstname, lastname, email, password]);

  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  const handleOnFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleOnLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPswd(e.target.value);
  };

  const handleOnUpdateClick = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      FirstName: firstName,
      LastName: lastName,
      Email: emailId,
      Password: pswd,
      UserRole: "BUYER",
    };
    console.log(data);
    // Call new user registraion API
    dispatch(userUpdate(data));
  };
  return (
    <>
      {renderNavbar()}
      <div id="registrationPageDiv">
        <div>
          <h3>Edit User</h3>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => handleOnFirstNameChange(e)}
              defaultValue={firstName}
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => handleOnLastNameChange(e)}
              defaultValue={lastName}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              defaultValue={emailId}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              defaultValue={pswd}
              onChange={(e) => handleOnPasswordChange(e)}
            />
          </div>

          <button style={{ color: "red" }} onClick={handleOnUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Login);
