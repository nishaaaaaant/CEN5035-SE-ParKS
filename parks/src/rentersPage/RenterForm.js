import React from "react";
import Axios from "axios";
import { useState } from "react";

function RenterForm(props) {
  const url = "";
  const [data, setData] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    mobile: "",
    rph: "",
    nos: "",
  });

  function submit(e) {
    e.preventDefault();
    console.log(data);
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          placeholder="Name"
          defaultValue={data.name}
          id="name"
          type="text"
          required
        ></input>
        <input
          onChange={(e) => handle(e)}
          //   value={data.addressLine1}
          defaultValue={data.addressLine1}
          placeholder="Address Line 1"
          id="addressLine1"
          type="text"
          required
        ></input>
        <input
          onChange={(e) => handle(e)}
          defaultValue={data.addressLine2}
          placeholder="Address Line 2"
          id="addressLine2"
          type="text"
        ></input>
        <input
          defaultValue={data.city}
          onChange={(e) => handle(e)}
          placeholder="City"
          type="text"
          id="city"
          required
        ></input>
        <input
          defaultValue={data.state}
          onChange={(e) => handle(e)}
          placeholder="State"
          type="text"
          id="state"
          required
        ></input>
        <input
          defaultValue={data.zipcode}
          onChange={(e) => handle(e)}
          placeholder="Zipcode"
          type="text"
          id="zipcode"
          required
        ></input>
        <input
          defaultValue={data.mobile}
          onChange={(e) => handle(e)}
          placeholder="Mobile"
          type="tel"
          id="mobile"
          required
        ></input>
        <input
          defaultValue={data.rph}
          onChange={(e) => handle(e)}
          placeholder="Rate Per Hour"
          type="number"
          id="rph"
          required
        ></input>
        <input
          defaultValue={data.nos}
          onChange={(e) => handle(e)}
          placeholder="Number of Spaces"
          type="number"
          id="nos"
          required
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default RenterForm;
