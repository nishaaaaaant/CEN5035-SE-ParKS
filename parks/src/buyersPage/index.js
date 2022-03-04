import React, { lazy, Suspense } from "react";
import MyMap from "./MyMap";

const NavbarComponent = lazy(() => import("../common/navbar"));

const BuyersPage = () => {
  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  return (
    <div id="buyerPageDiv">
      {renderNavbar()}
      <div style={{ marginTop: 60 }}>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <MyMap />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BuyersPage);
