import React, { useEffect, lazy, Suspense } from "react";
import GoogleLogin from "react-google-login";
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

const responseGoogle = (response) => {
  console.log(response);
  console.log(response.profileObj);
};

  return (
    <div>
      <h3>Parksss</h3>
      <GoogleLogin
          clientId="438076043163-e4m9b8jp6rnrgb731a48k5jraggoqs3n.apps.googleusercontent.com"
          buttonText="Login to ParkS"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
    </div>
  );
};

export default React.memo(Home);