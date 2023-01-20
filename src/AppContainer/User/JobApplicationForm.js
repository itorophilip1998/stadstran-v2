import React, { useState } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import Axios from "axios";
import { MDBContainer, MDBIcon, MDBBtn, MDBAlert } from "mdbreact";

import { useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";
import ConfirmationModal from "../../AppComponents/ConfirmationModal";

export default function JobApplicationForm(props) {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [applicationText, setApplicationText] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const singleJobDetail = props.location.state.jobDetail;

  const imageFileStyle = {
    padding: "10px",
    border: "1px dotted #CCCCCC",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
  };

  const cardStyle = {
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    paddingTop: "20px",
  };

  const submitApplication = () => {
    setModalSuccess(!modalSuccess);
  };

  const dateFormat = (createdDate) => {
    const dateObj = new Date(createdDate);
    const newdate = dateObj.toDateString();
    return newdate;
  };

  const submitJobApplication = (e) => {
    e.preventDefault();
    setLoader(true);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/job/application",
      {
        jobId: singleJobDetail.id,
        name: name,
        email: email,
        applicationText: applicationText,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertError(false);
        submitApplication();
        //setInterval(redirect(), 5000);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <UserNavbar />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-5 offset-md-3 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            <div className="row mt-3">
              <div className="col-2 text-left">
                <div onClick={history.goBack} className="black-text">
                  <MDBIcon
                    className="mt-2"
                    style={{ fontSize: "25px", color: "#000000" }}
                    icon="chevron-circle-left"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10 offset-1"></div>
            </div>

            <div className="row">
              <div
                className="col-10 offset-1 mt-4 mt-3 font-small text-left"
                style={cardStyle}
              >
                <div className="row">
                  <div className="col-5">
                    <img
                      className="img-fluid"
                      src={singleJobDetail.jobImageUrl}
                      alt={singleJobDetail.title}
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div className="col-7">
                    <div>
                      <h5 style={{ fontWeight: "500" }}>
                        {singleJobDetail.title}
                      </h5>
                      <p>
                        <span className="mr-2" style={{ fontSize: "12px" }}>
                          <MDBIcon icon="clock" />
                        </span>
                        <span style={{ fontSize: "12px" }}>
                          Application Close Date:{" "}
                          {dateFormat(singleJobDetail.expiryDate)}
                        </span>
                        <br />
                        <span style={{ fontSize: "10px" }}>
                          Posted {dateFormat(singleJobDetail.createdAt)}
                        </span>{" "}
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col-12">
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#000000",
                      }}
                      className="mt-4"
                    >
                      Job Detail Description
                    </span>{" "}
                    <br />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "300",
                        color: "#020202",
                      }}
                      className="mt-4"
                    >
                      {singleJobDetail.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 offset-1 mt-3">
                {alertError ? (
                  <MDBAlert color="danger">{errorMessage}</MDBAlert>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/* <div className="row mt-2">
              <div className="col-10 offset-1 text-center">
                <img
                  src="/images/others/applyLogo.png"
                  className="img-fluid"
                  style={{ borderRadius: "500px", width: "80px" }}
                  alt="Apply logo"
                />
              </div>
            </div> */}

            <form onSubmit={submitJobApplication}>
              <div className="form-group row mt-3">
                <div className="col-10 offset-1 text-left">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    style={imageFileStyle}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group row mt-3">
                <div className="col-10 offset-1 text-left">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    style={imageFileStyle}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-10 offset-1 mt-3 text-left">
                  <textarea
                    className="form-control"
                    style={imageFileStyle}
                    defaultValue="Application"
                    onChange={(e) => {
                      setApplicationText(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-12 text-center">
                  <MDBBtn
                    type="submit"
                    color="blue"
                    style={{ borderRadius: "20px" }}
                    className="waves-effect z-depth-1a"
                    size="sm"
                  >
                    Apply
                    {loader ? (
                      <div
                        className="spinner-grow spinner-grow-sm ml-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </MDBBtn>

                  <ConfirmationModal
                    constName={modalSuccess}
                    functionName={submitApplication}
                    successMessage="Thank you for Applying. We will get back to you soon."
                    redirect={`/jobs/apply/${singleJobDetail.id}`}
                  />
                </div>
              </div>
            </form>

            <div className="row mt-3">
              <div className="col-12 text-center">
                <div onClick={history.goBack} className="black-text">
                  <MDBIcon
                    className="mt-2"
                    style={{ fontSize: "15px", color: "#000000" }}
                    icon="chevron-circle-left"
                  />
                  <span
                    className="ml-1"
                    style={{ fontSize: "15px", color: "#000000" }}
                  >
                    Back
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
