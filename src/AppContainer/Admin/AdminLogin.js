/*eslint-disable*/



import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBIcon,
  MDBAlert,
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function AdminLogin() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirectToLocation = (adminid) => {
    window.location = `/admin/set-location/${adminid}`;
  };

  const adminLogin = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const instance = Axios.create({
      withCredentials: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    instance
      .post("https://stadtstrandapi.ecrapps.website/api/v1/admin/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const adminid = response.data.data.id;
        setInterval(redirectToLocation(adminid), 1000);
        localStorage.setItem("token", response.data.token);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
        setAlertError(true);
        // setErrorMessage(e.response.data.data);
        console.log("login error " + e.response)
      });
  };

  return (
    <MDBContainer fluid className={AdminStyle.adminbody2}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "30rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <MDBCardTitle cascade className="text-center">
                  Sign in
                </MDBCardTitle>
                <p>to access your brand Page</p>
                <form onSubmit={adminLogin}>
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
                        placeholder="Username"
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

                <p className="mt-2 font-medium text-center">
                  Don't have an account?
                  <Link className="blue-text ml-1" to="/admin/0/signup">
                    Sign up
                  </Link>
                </p>

                <div className="mt-2 font-small text-center">
                  <div onClick={history.goBack} className="black-text">
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}

export default AdminLogin;
