import React, { Component } from "react";
import AllRoutes from "./allRoutes";
import dotenv from "dotenv";
// import Unzer from '@unzer/nodejs-sdk';

 // Creating an unzer instance with your public key
//  var unzerInstance = new Unzer('s-pub-2a10156OrsiAKsbGpexvWY1XzeVwhsBj');


dotenv.config();

class App extends Component {
  render() {
    return (
      
        <AllRoutes />
      
    )
  }
}

export default App;
