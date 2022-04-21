import React, { Component, lazy, Suspense } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Routes from "./routes";
const NavbarComponent = lazy(() => import("./common/navbar"));

const firebaseConfig = {
  apiKey: "AIzaSyDPedji5Lfzoym3LZgzvyklzexn-cHSYGE",
  authDomain: "parks-39379.firebaseapp.com",
  projectId: "parks-39379",
  storageBucket: "parks-39379.appspot.com",
  messagingSenderId: "404987069554",
  appId: "1:404987069554:web:5087840109ccca763ceeeb",
  measurementId: "G-H9J5XYF17V",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export class App extends Component {
  renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };
  render() {
    return (
      <>
        {this.renderNavbar()}
        <div
          style={{
            position: "absolute",
            top: 58,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Routes />
        </div>
      </>
    );
  }
}

export default App;
