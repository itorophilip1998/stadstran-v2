import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBAlert,
} from "mdbreact";
import WaiterStyles from "../../AppStyles/WaiterStyles.module.css";
import Axios from "axios";

function WaiterLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirectToDashboard = (waiterid) => {
    window.location = `/waiter/dashboard/${waiterid}`;
  };

  const waiterLogin = (e) => {
    e.preventDefault();
    setLoader(!loader);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/waiter/login",
      {
        username: username,
        password: password,
      }
    )
      .then((response) => {
        const waiterid = response.data.data.id;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("brandPageId", response.data.data.brandPageId);
        localStorage.setItem("waiterid", response.data.data.id);
        setInterval(redirectToDashboard(waiterid), 1000);
      })
      .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  return (
    <MDBContainer fluid className={WaiterStyles.waiterbody2}>
      <MDBContainer fluid style={{ backgroundColor: "#b5cdd9" }}>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12" className="mt-4 mb-4">
              <img
                src="/images/others/StSt_logo.png"
                alt="logo"
                style={{ width: "100px" }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer>
        <MDBRow>
          <MDBCol className={WaiterStyles.cardAlignMiddle}>
            <MDBCard style={{ width: "30rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <MDBCardTitle cascade className="text-center">
                  Waiter Sign in
                </MDBCardTitle>
                <p>to access your brand Page</p>
                <form onSubmit={waiterLogin}>
                  <div className="row">
                    <div className="col-10 offset-1">
                      {alertError ? (
                        <MDBAlert color="danger">{errorMessage}</MDBAlert>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-10 offset-md-1">
                      <input
                        type="text"
                        placeholder="Waiter Username"
                        style={{ borderRadius: "15px" }}
                        className="form-control mt-3"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-10 offset-md-1">
                      <input
                        type="password"
                        placeholder="Password"
                        style={{ borderRadius: "15px" }}
                        className="form-control mt-3"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 text-center mb-3">
                      <div>
                        <MDBBtn
                          type="submit"
                          color="blue"
                          style={{ borderRadius: "20px" }}
                          className="waves-effect z-depth-1a"
                          size="md"
                        >
                          Log in
                          {loader ? (
                            <div
                              className="spinner-grow spinner-grow-sm ml-2"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </MDBBtn>
                      </div>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}

export default WaiterLogin;
