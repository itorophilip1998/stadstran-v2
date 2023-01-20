import React, { Component } from "react";
import WaiterNavbar from "../../AppComponents/WaiterComp/WaiterNavbar";
import WaiterOrderList from "../../AppComponents/WaiterComp/WaiterOrderList";

class WaiterHomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <WaiterNavbar />
        <WaiterOrderList />
      </React.Fragment>
    );
  }
}

export default WaiterHomePage;
