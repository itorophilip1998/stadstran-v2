import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import CreateJob from "../../AdminComp/AdminIconsModal/createJobModal";
import Axios from "axios";

export default function JobIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(null);
  const [checkJobStatus, setCheckJobStatus] = useState(null);
  const [modalCreateJob, setModalCreateJob] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [brandPageJobId, setBrandPageJobId] = useState("");
  const [checkloading, setCheckLoading] = useState(true);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob/${brandPageId}`
    )
      .then((response) => {
        setCheckLoading(false);
        if (response.data.data == null) {
          setCheckJobStatus(false);
        } else {
          setAlert(null);
          setCheckJobStatus(true);
          setJobs(response.data.data.Jobs);
          setDeactivatePage(response.data.data.deactivate);
          setBrandPageJobId(response.data.data.id);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const createBrandPageJob = () => {
    setLoader(!loader);
    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage ?? false,
      }
    )
      .then((response) => {
        setBrandPageJobId(response.data.data.id);
        setLoader(false);
        setCheckJobStatus(true);
        setAlert(true);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const updateBrandPageJob = () => {
    setLoader(!loader);
    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob/brandPage/${brandPageId}`,
      {
        deactivate: deactivatePage,
      }
    )
      .then((response) => {
        setAlert(true);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const toogleCreateJob = () => {
    setModalCreateJob(!modalCreateJob);
  };

  const deleteJob = (jobId) => {
    Axios.delete(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck/${jobId}`
    )
      .then((response) => {
        setAlertSuccess(true);
        setSuccessMessage("Job deleted successfully");
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const editJob = (jobId) => {
    window.location = `/admin/edit-job/${jobId}`;
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      <MDBModalBody>
        <div className="mt-1 font-small text-left">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
        <h5 className="mt-2">
          <strong>Jobs</strong>
        </h5>
        <hr />

        <div className="row">
          <div className="col-10 offset-1">
            {alertError ? (
              <MDBAlert color="danger">{errorMessage}</MDBAlert>
            ) : (
              <div></div>
            )}
            {alertSuccess ? (
              <MDBAlert color="info">{successMessage}</MDBAlert>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {checkloading ? (
          <div className="col-12 mt-2 mb-2">
            <div className="spinner-grow fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </div>
        ) : checkJobStatus ? (
          <div className="row">
            <div className="col-12">
              <div className="form-group row">
                <div className="col-10 offset-1">
                  {alert ? (
                    <MDBAlert color="success">
                      <strong>Congratulation!</strong> your brand page Job
                      portal has been created successfully. Let's get started
                      with creating Job offers.
                    </MDBAlert>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
              <div className="form-group row mt-2">
                <div className="col-md-12 text-center">
                  <MDBBtn
                    type="button"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="sm"
                    onClick={toogleCreateJob}
                  >
                    Create new job ad
                  </MDBBtn>
                </div>
              </div>
              <DeactivateButton
                toggle={() => {
                  setDeactivatePage(!deactivatePage);
                }}
                deactivatePage={deactivatePage}
              />
            </div>
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-md-12">
              <form>
                <div className="form-group row mt-2">
                  <div className="col-10 offset-1 text-center">
                    <h6>
                      <b>
                        Welcome to the Brand Page Job portal. Please click on
                        the button below to start creating job offers.
                      </b>
                    </h6>
                    <div>
                      {loader ? (
                        <MDBBtn
                          type="button"
                          color="#39729b"
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#39729b",
                            color: "#ffffff",
                          }}
                          className="waves-effect z-depth-1a mt-4"
                          size="md"
                          disabled
                        >
                          Your Job portal will be ready in a seconds
                          <div
                            className="spinner-grow spinner-grow-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </MDBBtn>
                      ) : (
                        <MDBBtn
                          type="button"
                          color="#39729b"
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#39729b",
                            color: "#ffffff",
                          }}
                          className="waves-effect z-depth-1a mt-4"
                          size="md"
                          onClick={createBrandPageJob}
                        >
                          Start Job portal customization
                        </MDBBtn>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row mt-3">
          {jobs.length < 1 ? (
            <span></span>
          ) : (
            jobs.map((job, index) => {
              return (
                <div
                  className="col-md-3 ml-2"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "20px",
                    background: `url(${job.jobImageUrl}) no-repeat fixed center`,
                    opacity: "12",
                  }}
                  key={job.id}
                >
                  <div className="row mt-3" style={{ color: "#ffffff" }}>
                    <div className="col-md-12">
                      <MDBBtn
                        type="button"
                        color="#39729b"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                          padding: "5px",
                        }}
                        className="waves-effect z-depth-1a"
                        size="sm"
                        onClick={() => editJob(job.id)}
                      >
                        Edit
                      </MDBBtn>
                      <MDBBtn
                        type="button"
                        color="#39729b"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                          padding: "5px",
                        }}
                        className="waves-effect z-depth-1a"
                        size="sm"
                        onClick={() => deleteJob(job.id)}
                      >
                        Delete
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <CreateJob
          constName={modalCreateJob}
          functionName={toogleCreateJob}
          brandPageJobId={brandPageJobId}
          brandPageId={brandPageId}
        />

        <form>
          {checkJobStatus ? (
            <div className="form-group row mt-2">
              <div className="col-md-12 text-center">
                <MDBBtn
                  type="button"
                  color="#39729b"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#39729b",
                    color: "#ffffff",
                  }}
                  className="waves-effect z-depth-1a"
                  size="sm"
                  onClick={updateBrandPageJob}
                >
                  Update Page Status
                </MDBBtn>
              </div>
            </div>
          ) : (
            <span></span>
          )}
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
