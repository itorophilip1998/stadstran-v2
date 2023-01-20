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

function AdminSignup() {
  const history = useHistory();

  const [modalSuccess, setModalSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirectLogin = () => {
    window.location = "/admin/0/login";
  };

  const onSubmitReg = (e) => {
    e.preventDefault();

    setLoader(!loader);

    Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/admin", {
      name: name,
      email: email,
      username: username,
      password: password,
    })
      .then((response) => {
        setModalSuccess(!modalSuccess);
        setLoader(false);
        setInterval(redirectLogin(), 3000);
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
        setAlertError(!alertError);
        setErrorMessage(e.response.data.data);
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
                  Get Started
                </MDBCardTitle>
                <form onSubmit={onSubmitReg}>
                  <div className="row">
                    <div className="col-10 offset-1">
                      {modalSuccess ? (
                        <MDBAlert color="success">
                          Redirecting to login page....{" "}
                          <div
                            className="spinner-grow text-success fast ml-2"
                            role="status"
                          >
                            <span className="sr-only mt-2">Loading...</span>
                          </div>
                        </MDBAlert>
                      ) : (
                        <div></div>
                      )}
                      {alertError ? (
                        <MDBAlert color="danger" dismiss>
                          {errorMessage}
                        </MDBAlert>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-10 offset-md-1">
                      <input
                        type="text"
                        placeholder="Name"
                        style={{ borderRadius: "15px" }}
                        className="form-control mt-3"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-10 offset-md-1">
                      <input
                        type="email"
                        placeholder="Email"
                        style={{ borderRadius: "15px" }}
                        className="form-control mt-3"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
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
                        required
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
                          Sign up
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
                  Already have an account?
                  <Link className="blue-text ml-1" to="/admin/0/login">
                    Sign in
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

export default AdminSignup;
