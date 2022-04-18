import styled from "styled-components";

export const RentersForm = styled.form`
  width: 100%;
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
  width: 120px;
  height: 50px;
  padding: 10px;
  font-size: 22px;
  background-color: #327528;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
`;

export const CancelButton = styled.button`
  width: 120px;
  height: 50px;
  padding: 10px;
  font-size: 22px;
  background-color: indianred;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
`;

export const ListOfAddrContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`;

export const NewAddNewAddrContainer = styled.div`
  border-bottom: 2px solid grey;
  cursor: pointer;
`;

export const AddIcon = styled.span`
  margin-right: 10px;
  cursor: pointer;
`;

export const AddAddrLabel = styled.label`
  cursor: pointer;
`;
