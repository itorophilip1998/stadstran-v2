import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBAlert,
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function AdminWaiterManager(props) {
  console.log(props);
  const history = useHistory();
  const [waiterDetails, setWaiterDetails] = useState([]);
  const adminId = props.location.state.location.adminId;
  const brandPageId = props.location.state.location.id;
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/admin/${adminId}`
    )
      .then((response) => {
        console.log(response.data.data[0].Waiters);
        setWaiterDetails(response.data.data[0].Waiters);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [adminId]);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  const waiterSignup = (e) => {
    e.preventDefault();
    setLoader(!loader);

    Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/waiter", {
      brandPageId: brandPageId,
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response);
        setAlertSuccess(true);
        setSuccessMessage("Waiter created successfully");
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      })
      .finally(()=> {setLoader(false)})
  };

  return (
    <MDBContainer fluid className={AdminStyle.adminbody2}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "45rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <div className="row">
                  <div className="col-12 text-center">
                    <h3>Waiter Manager</h3>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-5 offset-1">
                    <div className="row">
                      <div className="col-12">
                        <h5>Create new waiter</h5>
                        <form className="mt-3" onSubmit={waiterSignup}>
                          <div className="row">
                            <div className="col-10 offset-1">
                              {alertSuccess ? (
                                <MDBAlert color="info">
                                  {successMessage}
                                </MDBAlert>
                              ) : (
                                <div></div>
                              )}
                              {alertError ? (
                                <MDBAlert color="danger">
                                  {errorMessage}
                                </MDBAlert>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                style={{ borderRadius: "15px" }}
                                placeholder="Waiter Username"
                                onChange={(e) => {
                                  setUsername(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-12">
                              <input
                                type="password"
                                className="form-control"
                                style={{ borderRadius: "15px" }}
                                placeholder="Waiter Password"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-12">
                              <MDBBtn
                                type="submit"
                                color="blue"
                                style={{ borderRadius: "20px" }}
                                className="waves-effect z-depth-1a"
                                size="md"
                              >
                                Create waiter
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
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="row">
                      <div className="col-12">
                        <h5>Registered waiters</h5>
                        <div className="table-responsive">
                          <table className="table">
                            {waiterDetails.map((waiter) => {
                              return (
                                <tr>
                                  <th className="mt-2">{waiter.username}</th>
                                  <th>
                                    <MDBIcon icon="edit" color="blue" /> Edit
                                  </th>
                                </tr>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-5 font-small text-center pb-3">
                  <div className="col-6 black-text " onClick={history.goBack}>
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </div>
                  <div className="col-6 black-text " onClick={logout}>
                    Log out <MDBIcon icon="sign-out-alt" />
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

export default AdminWaiterManager;
