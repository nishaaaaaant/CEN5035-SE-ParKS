import styled from "styled-components";

export const RentersForm = styled.form`
  width: 70%;
  margin-top: 70px !important;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  margin: 0 auto;
  border-radius: 10px;
`;

export const TextInput = styled.input`
  font-size: 16px;
  line-height: 16px;
  padding: 5px;
  margin: 15px;
`;

export const SubmitButton = styled.button`
  width: 200px;
  align-self: center;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 50px;
  background-color: #327528;
  color: white;
`;
