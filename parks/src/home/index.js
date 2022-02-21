import React, { lazy, Suspense } from "react";
// import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

// Style imports
import { HomeContainer, AvtarBox, AvtarContainer } from "./styles";

const NavbarComponent = lazy(() => import("../common/navbar"));

const Home = () => {
  let navigate = useNavigate();
  // const dispatch = useDispatch();

  // const {
  //   homepage: { homePageData },
  // } = useSelector((state) => state);

  // // Call new user registraion API
  // useEffect(() => {
  //   dispatch(newUserRegistraion());
  // }, [dispatch]);

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   console.log(response.profileObj);
  // };

  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  const handleOnBuyersClick = () => {
    navigate("/buyer");
  };

  const handleOnRentersClick = () => {
    navigate("/renter");
  };

  return (
    <HomeContainer>
      {renderNavbar()}

      <AvtarContainer>
        <AvtarBox onClick={handleOnRentersClick}>
          Looking for renting a parking space?
        </AvtarBox>
        <AvtarBox onClick={handleOnBuyersClick}>
          Looking for parking space?
        </AvtarBox>
      </AvtarContainer>
    </HomeContainer>
  );
};

export default React.memo(Home);
