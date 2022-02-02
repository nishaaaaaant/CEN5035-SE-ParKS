import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./home"));

const AppRoutes = () => (
  <Suspense fallback={""}>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;