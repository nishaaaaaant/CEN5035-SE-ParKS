import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./home"));
const BuyersPage = lazy(() => import("./buyersPage"));
const RentersPage = lazy(() => import("./rentersPage"));
const Login = lazy(() => import("./login"));
const RegisterPage = lazy(() => import("./registration"));
const About = lazy(() => import("./about"));
const User = lazy(() => import("./user"));

const AppRoutes = () => (
  <Suspense fallback={""}>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/buyer" element={<BuyersPage />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route exact path="/renter" element={<RentersPage />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/registration" element={<RegisterPage />}></Route>
      <Route exact path="/update-user" element={<User />}></Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
