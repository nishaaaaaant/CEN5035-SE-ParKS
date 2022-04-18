import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "./ActionCreators";
import { UserDateDiv, EditUserDataDiv } from "./style";

const Login = () => {
  const dispatch = useDispatch();

  const {
    // isSuccess,
    // isFetching,
    userData: { id, email, firstname, lastname, password },
  } = useSelector((state) => state.login);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [pswd, setPswd] = useState("");
  const [editFlag, setEditFlag] = useState("");

  useEffect(() => {
    setFirstName(firstname);
    setLastName(lastname);
    setEmailId(email);
    setPswd(password);
  }, [firstname, lastname, email, password]);

  const handleOnFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleOnLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPswd(e.target.value);
  };

  const handelOnEditClick = () => {
    setEditFlag(true);
  };

  const handelOnCancelClick = () => {
    setEditFlag(false);
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

  const renderUpdateUserForm = () => (
    <EditUserDataDiv id="registrationPageDiv">
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

        <button style={{ color: "green" }} onClick={handleOnUpdateClick}>
          Update
        </button>
        <button style={{ color: "red" }} onClick={handelOnCancelClick}>
          Cancel
        </button>
      </div>
    </EditUserDataDiv>
  );

  const renderUserDetails = () => (
    <UserDateDiv>
      <label>First Name: {firstName}</label>
      <label>Last Name: {lastName}</label>
      <label>Email: {emailId}</label>
      <label>UserRole: Buyer</label>
      <button onClick={handelOnEditClick}>Edit</button>
    </UserDateDiv>
  );

  return <>{editFlag ? renderUpdateUserForm() : renderUserDetails()}</>;
};

export default React.memo(Login);
