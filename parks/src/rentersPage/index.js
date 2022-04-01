import React, { lazy, Suspense } from "react";
import MyMap from "./MyMap";
import RenterForm from "./RenterForm";

const NavbarComponent = lazy(() => import("../common/navbar"));

const RentersPage = () => {
  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  return (
    <div id="renterPageDiv">
      {renderNavbar()}
      <RenterForm />
    </div>
  );
};

export default React.memo(RentersPage);
