import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function AdminEditJob(props) {
  const history = useHistory();
  const jobId = props.match.params.jobId;
  const [job, setJob] = useState({});
  const [headerImage, setHeaderImage] = useState("");
  const [headerImagePreview, setHeaderImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  //const [information, setInformation] = useState("");
  const [checkloading, setCheckLoading] = useState(true);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [oldImage] = useState("");

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

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob/job/${jobId}`
    )
      .then((response) => {
        setCheckLoading(false);
        console.log(response);
        if (response.status === 200) {
          setJob(response.data.data);
          setHeaderImagePreview(response.data.data.jobImageUrl);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [jobId]);

  const convertedDate = (jobDate) => {
    const currentDate = new Date(jobDate);
    return currentDate.toDateString();
  };

  const updateJob = async (e) => {
    e.preventDefault();
    setLoader(!loader);

    let response;

    const dataJobImage = new FormData();

    if (dataJobImage) {
      dataJobImage.append("image", headerImage);
      dataJobImage.append("imageUrl", oldImage);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataJobImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (e) {
        console.log(e.response);
      }
    }

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob/${jobId}`,
      {
        description: description,
        expiryDate: date,
        title: title,
        jobImageUrl: response ? response.data.url : null,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage("Updated successfully");
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <React.Fragment>
      <MDBContainer fluid className={AdminStyle.adminbody}>
        <AdminNavbar />
      </MDBContainer>
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="container">
          <div className="row">
            <div
              className="col-md-8 offset-md-2 text-center"
              style={{ background: "#ffffff", borderRadius: "10px" }}
            >
              <div className="row mt-3">
                <div className="col-12">
                  <h3>
                    <b>Edit Job</b>
                  </h3>
                </div>
              </div>
              <hr />
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row">
                    {checkloading ? (
                      <div className="col-12 mt-2 mb-2 text-center">
                        <div
                          className="spinner-grow text-primary fast ml-2"
                          role="status"
                        >
                          <span className="sr-only mt-2">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 mt-2 mb-2 text-center">
                        <form onSubmit={updateJob}>
                          <div className="row">
                            <div className="col-10 offset-1">
                              {alertError ? (
                                <MDBAlert color="danger">
                                  {errorMessage}
                                </MDBAlert>
                              ) : (
                                <div></div>
                              )}
                              {alertSuccess ? (
                                <MDBAlert color="success">
                                  {successMessage}
                                </MDBAlert>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div
                              className="col-10 offset-1"
                              style={{
                                backgroundImage: `url(${headerImagePreview})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100% 100%",
                                boxShadow:
                                  "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                                height: "200px",
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
                                    Upload job header image
                                    <span
                                      className="fa fa-download"
                                      style={{
                                        backgroundColor: "#39729b",
                                        color: "#ffffff",
                                        padding: "5px",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      {" "}
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row  mt-3">
                            <div className="col-10 offset-1 col-md-5 mt-2">
                              <div className="row form-group text-left">
                                <div className="col-md-12">
                                  <label>Job Title</label>
                                  <input
                                    type="text"
                                    defaultValue={job.title}
                                    className="form-control "
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 mt-2 text-left">
                                  <label>
                                    Job Expiration Date -
                                    {convertedDate(job.expiryDate)}
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6">
                              <div className="row form-group mt-2">
                                <div className="col-md-12 text-left">
                                  <label>Job Description</label>
                                  <textarea
                                    className="form-control text-left"
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                    }}
                                    rows="3"
                                    defaultValue={job.description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <div className="form-group row mt-2">
                            <div className="col-md-12 text-center mb-3">
                              <div>
                                <MDBBtn
                                  type="submit"
                                  color="blue"
                                  style={{ borderRadius: "20px" }}
                                  className="waves-effect z-depth-1a"
                                  size="md"
                                >
                                  Update Job
                                  {loader ? (
                                    <div
                                      className="spinner-grow spinner-grow-sm ml-2"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </MDBBtn>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 mt-5 font-small text-center pb-3">
                  <div onClick={history.goBack} className="black-text">
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
