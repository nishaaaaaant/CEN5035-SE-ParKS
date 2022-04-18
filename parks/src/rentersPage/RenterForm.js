import React from "react";
import { useState } from "react";
import { newUserAddNewAddress } from "./ActionCreators";
import { useDispatch } from "react-redux";
import { RentersForm, TextInput, SubmitButton, CancelButton } from "./style";

function RenterForm(props) {
  const { handleOnCancelClick, handleOnSubmitClick, lngLat } = props;
  const dispatch = useDispatch();

  const [data, setData] = useState({
    PropertyName: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
    Mobile: "",
    Rate: "",
    NoOfSpace: "",
  });

  function submit(e) {
    e.preventDefault();

    const formData = {
      UserId: "62476408bed53e0ef1f17562",
      Features: {
        Type: "Point",
        Properties: {
          Address1: data.Address1,
          Address2: data.Address2,
          City: data.City,
          State: data.State,
          Zip: +data.Zip,
          Mobile: +data.Mobile,
          Rate: +data.Rate,
          NoOfSpace: data.NoOfSpace,
        },
        Geometry: {
          Type: "Point",
          Coordinates: [lngLat.lng, lngLat.lat],
        },
      },
      Type: "First",
    };

    console.log(JSON.stringify(data));

    // Call new user registraion API
    dispatch(newUserAddNewAddress(formData));
    handleOnSubmitClick();
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div>
      <RentersForm onSubmit={(e) => submit(e)}>
        <TextInput
          onChange={(e) => handle(e)}
          placeholder="Property Name"
          defaultValue={data.name}
          id="PropertyName"
          type="text"
          required
        ></TextInput>
        <TextInput
          onChange={(e) => handle(e)}
          defaultValue={data.addressLine1}
          placeholder="Address Line 1"
          id="Address1"
          type="text"
          required
        ></TextInput>
        <TextInput
          onChange={(e) => handle(e)}
          defaultValue={data.addressLine2}
          placeholder="Address Line 2"
          id="Address2"
          type="text"
        ></TextInput>
        <TextInput
          defaultValue={data.city}
          onChange={(e) => handle(e)}
          placeholder="City"
          type="text"
          id="City"
          required
        ></TextInput>
        <TextInput
          defaultValue={data.state}
          onChange={(e) => handle(e)}
          placeholder="State"
          type="text"
          id="State"
          required
        ></TextInput>
        <TextInput
          defaultValue={data.zipcode}
          onChange={(e) => handle(e)}
          placeholder="Zipcode"
          type="text"
          id="Zip"
          required
        ></TextInput>
        <TextInput
          defaultValue={data.mobile}
          onChange={(e) => handle(e)}
          placeholder="Mobile"
          type="tel"
          id="Mobile"
          required
        ></TextInput>
        <TextInput
          defaultValue={data.rph}
          onChange={(e) => handle(e)}
          placeholder="Rate Per Hour"
          type="number"
          id="Rate"
          required
        ></TextInput>
        <TextInput
          defaultValue={data.nos}
          onChange={(e) => handle(e)}
          placeholder="Number of Spaces"
          type="number"
          id="NoOfSpace"
          required
        ></TextInput>
        <div style={{ alignSelf: "flex-end", marginBottom: 10 }}>
          <CancelButton onClick={handleOnCancelClick}>Cancel</CancelButton>
          <SubmitButton onClick={submit}>Submit</SubmitButton>
        </div>
      </RentersForm>
    </div>
  );
}
export default RenterForm;
