import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { LoginContainer, LoginForm, SubmitBtn } from "./styles";

import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newUserLogin } from "./ActionCreators";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const { isSuccess, isFetching } = useSelector((state) => state.login);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [userrole, setUserRole] = useState("BUYER");
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      navigate(
        history && history.pathname === "/login"
          ? "/"
          : history?.state?.previousLocation
      );
    }
  }, [isFetching, isSuccess, navigate]);

  useEffect(() => {
    setHistory(location);
  }, [location]);

  const handleOnEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnUserRoleChange = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const handleOnLoginSubmit = (e) => {
    e.preventDefault();
    const data = {
      Email: emailId,
      Password: password,
      UserRole: userrole,
    };
    // Call new user registraion API
    dispatch(newUserLogin(data));
  };

  return (
    <>
      <LoginContainer id="loginPageDiv">
        <LoginForm>
          <h1>Login to ParkS</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => handleOnEmailChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => handleOnPasswordChange(e)}
            />
          </Form.Group>

          <div style={{ display: "flex" }}>
            <span style={{ marginRight: 10 }}>Login as :</span>
            <Form.Check
              inline
              label="Buyer"
              name="userrole"
              type="radio"
              value="BUYER"
              onClick={handleOnUserRoleChange}
              defaultChecked
            />
            <Form.Check
              inline
              label="Renter"
              name="userrole"
              type="radio"
              value="RENTER"
              onClick={handleOnUserRoleChange}
            />
          </div>
          <SubmitBtn
            variant="primary"
            type="submit"
            onClick={handleOnLoginSubmit}
          >
            Submit
          </SubmitBtn>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default React.memo(Login);
