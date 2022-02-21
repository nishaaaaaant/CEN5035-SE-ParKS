import React, { lazy, Suspense } from "react";

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
    <div>
      {renderNavbar()}
      <h3 style={{ marginTop: 60 }}>Buyers Page</h3>
    </div>
  );
};

export default React.memo(BuyersPage);
