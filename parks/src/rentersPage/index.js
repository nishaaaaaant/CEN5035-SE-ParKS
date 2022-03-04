import React, { lazy, Suspense } from "react";
import MyMap from "./MyMap";

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
      <h3 style={{ marginTop: 60 }}>Renters Page</h3>
      <MyMap />
    </div>
  );
};

export default React.memo(RentersPage);
