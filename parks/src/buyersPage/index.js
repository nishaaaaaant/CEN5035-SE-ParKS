import React, { lazy, Suspense } from "react";
import MyMap from "./MyMap";

const NavbarComponent = lazy(() => import("../common/navbar"));

const BuyersPage = () => {
  // const position = [51.505, -0.09];

  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  // const myMap = L.map("parksMap", {
  //   center: [37.7749, -122.4194],
  //   zoom: 13,
  // });

  return (
    <div id="buyerPageDiv">
      {renderNavbar()}
      <h3 style={{ marginTop: 60 }}>Buyers Page</h3>
      <MyMap />
    </div>
  );
};

export default React.memo(BuyersPage);
