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
      <h3 style={{ marginTop: 60 }}>Buyers Page</h3>
        <MyMap />
    </div>
  );
};

export default React.memo(BuyersPage);
