import React, { lazy, Suspense, useState } from "react";
import MyMap from "./MyMap";
import RenterForm from "./RenterForm";
import { tempData } from "../buyersPage";

const NavbarComponent = lazy(() => import("../common/navbar"));
const AddressListBox = lazy(() => import("../buyersPage/AddressListBox"));

const RentersPage = () => {
  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };
  const [flag, setFlag] = useState(false);

  const onNewClick = () => {
    setFlag(true);
  };
  return (
    <div id="renterPageDiv">
      {renderNavbar()}
      <h3 style={{ marginTop: 60 }}>List of Renting Spaces</h3>
      <button onClick={onNewClick}>Add New Address</button>
      {!flag ? null : <RenterForm />}
      {tempData.map((ele, i) => {
        return (
          <>
            <AddressListBox
              key={i}
              data={ele}
              handleOnContinueClick={null}
              isCalledFromRenter={true}
            />
          </>
        );
      })}
    </div>
  );
};

export default React.memo(RentersPage);
