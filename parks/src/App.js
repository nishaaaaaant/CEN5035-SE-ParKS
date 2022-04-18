import React, { Component, lazy, Suspense } from "react";
import Routes from "./routes";
const NavbarComponent = lazy(() => import("./common/navbar"));

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
