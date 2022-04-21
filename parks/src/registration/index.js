import React, { useEffect, useState } from "react";
import { RegisterDiv, RegisterForm } from "./styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newUserRegistraion } from "./ActionCreators";

const RegisterPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    homepage: { homePageData, isFetching, isSuccess, isUserRegistered },
  } = useSelector((state) => state);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if ((!isFetching && isSuccess) || isUserRegistered) {
      navigate("/login");
    }
  }, [isFetching, isSuccess, isUserRegistered, navigate]);

  const handleOnLoginPage = () => {
    navigate("/login");
  };

  const handleOnFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleOnLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleOnEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnRegisterClick = (e) => {
    e.preventDefault();
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Email: emailId,
      Password: password,
      UserRole: "BUYER",
    };
    console.log(data);
    console.log(homePageData);
    // Call new user registraion API
    dispatch(newUserRegistraion(data));
  };

  return (
    <>
      <RegisterDiv id="registrationPageDiv">
        <RegisterForm>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => handleOnFirstNameChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => handleOnLastNameChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => handleOnEmailChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => handleOnPasswordChange(e)}
            />
          </div>
          <button
            type="submit"
            onClick={handleOnRegisterClick}
            className="btn btn-primary btn-block"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">If already registered as user kindly login</p>
          <button style={{ color: "red" }} onClick={handleOnLoginPage}>
            Login
          </button>
        </RegisterForm>
      </RegisterDiv>
    </>
  );
};

export default React.memo(RegisterPage);
