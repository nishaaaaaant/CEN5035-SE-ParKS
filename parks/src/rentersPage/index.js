import React, { lazy, Suspense, useState } from "react";
import MyMap from "./MyMap";
import RenterForm from "./RenterForm";
import { tempData } from "../buyersPage";
import {
  ListOfAddrContainer,
  NewAddNewAddrContainer,
  AddIcon,
  AddAddrLabel,
} from "./style";

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

  const handleOnCancelClick = () => {
    setFlag(false);
  };

  const renderAddressList = () => {
    return (
      <ListOfAddrContainer>
        <h4>List of Rented Spaces</h4>
        {/* <button onClick={onNewClick}>Add New Address</button> */}
        <NewAddNewAddrContainer onClick={onNewClick}>
          <AddIcon>+</AddIcon>
          <AddAddrLabel>Add new Address</AddAddrLabel>
        </NewAddNewAddrContainer>
        {tempData.map((ele, i) => {
          return (
            <AddressListBox
              key={i}
              data={ele}
              handleOnContinueClick={null}
              isCalledFromRenter={true}
            />
          );
        })}
      </ListOfAddrContainer>
    );
  };

  return (
    <div id="renterPageDiv">
      {renderNavbar()}
      {!flag ? (
        renderAddressList()
      ) : (
        <RenterForm handleOnCancelClick={handleOnCancelClick} />
      )}
    </div>
  );
};

export default React.memo(RentersPage);
