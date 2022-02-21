import React, { lazy, Suspense } from "react";

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
    <div>
      {renderNavbar()}
      <h3 style={{ marginTop: 60 }}>Renters Page</h3>
    </div>
  );
};

export default React.memo(RentersPage);
