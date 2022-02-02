import React, { useEffect, lazy, Suspense } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchHomePageData } from "./ActionCreators";

// Style imports
// import { Container, Header, Body, MissionContainer, Footer } from "./styles";

// Lazy loading of components
// const FilterComponent = lazy(() => import("../filters"));
// const MissionCardComponent = lazy(() => import("../mission-card"));

const Home = () => {
//   const dispatch = useDispatch();

//   const {
//     homepage: { homePageData },
//   } = useSelector((state) => state);

//   // Call Homepage data API
//   useEffect(() => {
//     dispatch(fetchHomePageData());
//   }, [dispatch]);

  return (
    <div>
      <h3>Parksss</h3>
    </div>
  );
};

export default React.memo(Home);