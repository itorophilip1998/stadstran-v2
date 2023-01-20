import React, { useState } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import Axios from "axios";

export default function CreateJobModal(props) {
  const brandPageJobId = props.brandPageJobId;
  const brandPageId = props.brandPageId;
  const [loader, setLoader] = useState(false);
  const [headerImage, setHeaderImage] = useState("");
  const [headerImagePreview, setHeaderImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [information, setInformation] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const imageFileStyle = {
    padding: "10px",
    border: "1px solid #ffffff",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
    color: "#ffffff",
  };

  const onChangeFile = (e) => {
    setHeaderImage(e.target.files[0]);
    setHeaderImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const createJob = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const data = new FormData();
    data.append("image", headerImage);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

      .then((response) => {
        const url = response.data.url;

        Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob/job",
          {
            brandPageJobId: brandPageJobId,
            title: title,
            description: information,
            jobImageUrl: url,
            expiryDate: expiryDate,
          }
        )
          .then((response) => {
            setLoader(false);
            setAlertError(false);
            setAlertSuccess(true);
            setSuccessMessage("Food Truck created successfully");
            setInterval(function reload() {
              window.location = `/admin/brand-page/manager/${brandPageId}`;
            }, 8000);
          })
          .catch((e) => {
            setAlertError(true);
            setErrorMessage(e.response.data);
            setLoader(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      centered
      size="lg"
    >
      <MDBModalBody>
        <h6 className="mt-2">
          <strong>Create Job</strong>
        </h6>
        <hr />
        <form onSubmit={createJob}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
              {alertSuccess ? (
                <MDBAlert color="success">{successMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-10 offset-md-1"
              style={{
                backgroundImage: `url(${headerImagePreview})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                height: "150px",
                borderRadius: "20px",
              }}
            >
              <div className="form-group row mt-5">
                <div className="col-md-8 offset-md-2 text-center">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={onChangeFile}
                  />
                  <label htmlFor="file" style={imageFileStyle}>
                    Upload image{" "}
                    <span
                      className="fa fa-download"
                      style={{
                        backgroundColor: "#39729b",
                        color: "#ffffff",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row form-group mt-3">
            <div className="col-md-5 offset-md-1 mt-2">
              <h6 style={{ fontSize: "12px" }}>Job Title </h6>
              <input
                type="text"
                className="form-control text-center"
                style={{ borderRadius: "20px", fontSize: "10px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-5 mt-2">
              <h6 style={{ fontSize: "12px" }}>
                Job Application Expiration Date{" "}
              </h6>
              <input
                type="date"
                className="form-control text-center"
                style={{ borderRadius: "20px", fontSize: "10px" }}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row form-group mt-3">
            <div className="col-10 offset-1">
              <textarea
                className="form-control text-left"
                style={{ borderRadius: "10px", fontSize: "10px" }}
                onChange={(e) => setInformation(e.target.value)}
                defaultValue="Job Description"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
              {alertSuccess ? (
                <MDBAlert color="success">{successMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="form-group row mt-3">
            <div className="col-md-12 text-center">
              <MDBBtn
                type="submit"
                color="#39729b"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#39729b",
                  color: "#ffffff",
                }}
                className="waves-effect z-depth-1a"
                size="sm"
              >
                Create job advert
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
        <div className="mt-5 font-small text-center pb-3">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
