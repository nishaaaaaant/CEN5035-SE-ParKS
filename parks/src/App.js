import React, { Component } from "react";
import GoogleLogin from "react-google-login";

export class App extends Component {
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="438076043163-e4m9b8jp6rnrgb731a48k5jraggoqs3n.apps.googleusercontent.com"
          buttonText="Login to ParkS"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default App;
