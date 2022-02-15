import React, { lazy, Suspense } from "react";

const NavbarComponent = lazy(() => import("../common/navbar"));

const About = () => {
  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  return renderNavbar();
};

export default React.memo(About);
