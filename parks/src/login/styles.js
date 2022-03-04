import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const LoginForm = styled(Form)`
  width: 60%;
  border: 3px solid navy;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`

export const SubmitBtn = styled(Button)`
  margin-top: 20px
`

