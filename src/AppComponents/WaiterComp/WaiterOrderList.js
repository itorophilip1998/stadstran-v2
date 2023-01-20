import React, { useState } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";
import { useHistory } from "react-router-dom";
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedOrders";
import AllOrders from "./allOrders";

export default function WaiterOrderList() {
  const [view, setView] = useState("all");

  const history = useHistory();

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/waiter/login";
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row mt-2">
          <div className="col-5 offset-1 mt-3 font-small pb-3">
            <div onClick={history.goBack} className="black-text">
              <MDBIcon icon="chevron-circle-left" /> Back
            </div>
          </div>
          <div className="col-5 mt-3 font-small pb-3 text-right">
            <div onClick={logout} className="black-text">
              Log out <MDBIcon icon="sign-out-alt" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="mt-3">
              <h3 className="black-text">
                {view === "all"
                  ? "All Orders"
                  : view === "pending"
                  ? "Pending Orders"
                  : "Completed Orders"}
              </h3>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="row mb-4 text-center" style={{ overflowX: "auto" }}>
            <div
              className="col-12 col-md-12 text-center"
              style={{ overflowX: "auto" }}
            >
              <MDBBtn
                type="button"
                color={view === "all" ? "blue" : "white"}
                style={{ borderRadius: "20px" }}
                className="waves-effect z-depth-1a"
                size="sm"
                onClick={() => setView("all")}
              >
                All
              </MDBBtn>
              <MDBBtn
                type="button"
                color={view === "pending" ? "blue" : "white"}
                style={{ borderRadius: "20px" }}
                className="waves-effect z-depth-1a"
                size="sm"
                onClick={() => setView("pending")}
              >
                Pending 
              </MDBBtn>

              <MDBBtn
                type="button"
                color={view === "completed" ? "blue" : "white"}
                style={{
                  borderRadius: "20px",
                }}
                className="waves-effect z-depth-1a"
                size="sm"
                onClick={() => setView("completed")}
              >
                Completed 
              </MDBBtn>
            </div>
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="row">
              {view === "all" ? (
                <AllOrders />
              ) : view === "pending" ? (
                <PendingOrders />
              ) : (
                <CompletedOrders />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
