import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import NotificationStatus from "../AdminNotificationStatus";
import Axios from "axios";

export default function ContactIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [taxis, setTaxis] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagetaxi/${brandPageId}`
    )
      .then((response) => {
       if (response.data.data !== null) {
          setEditButton(true);
        }
        const brandPageResponse = response.data.data.Taxis;
        setDeactivatePage(response.data.data.deactivate);
        const getTaxis = brandPageResponse.map((element) => element.url);
        setTaxis(getTaxis);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const addNewField = () => {
    const fields = [...taxis];
    fields.push("https://");
    setTaxis(fields);
  };

  const removeField = (field) => {
    const fields = [...taxis];
    const index = fields.findIndex((element) => element === field);
    fields.splice(index, 1);
    setTaxis(fields);
  };

  const changeFieldUrl = (field, e) => {
    const fields = [...taxis];
    const index = fields.findIndex((element) => element === field);
    fields[index] = e.target.value;
    setTaxis(fields);
  };

  const createTaxiUrl = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendTaxis = taxis.map((field) => {
      return field;
    });

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagetaxi/taxi",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage,
        taxis: sendTaxis,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
      })
      .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const updateTaxiUrl = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendTaxis = taxis.map((field) => {
      return field;
    });

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagetaxi/${brandPageId}`,
      {
        deactivate: deactivatePage,
        taxis: sendTaxis,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Taxi link updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5 className="mt-2">
          <strong>Edit Taxi url </strong>
        </h5>

        <hr />

        <form onSubmit={createTaxiUrl}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              {taxis.length < 1 ? (
                <div className="row form-group mt-2">
                  <div className="col-md-10 offset-md-1">
                    <div className="row mt-1">
                      <div className="col-12">
                        Insert new taxi url
                        <i
                          className="fa fa-plus-circle ml-5 mt-3"
                          onClick={addNewField}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                taxis.map((field, index) => {
                  return (
                    <div className="row form-group mt-1" key={index}>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-8 offset-1 mt-1">
                            <input
                              className="form-control mb-3 mt-0"
                              style={{
                                border: "inset dotted #000000",
                                borderRadius: "10px",
                                fontSize: "12px",
                              }}
                              type="text"
                              defaultValue={field}
                              onChange={(e) => changeFieldUrl(field, e)}
                            />
                          </div>
                          <div className="col-3">
                            {taxis.length - 1 === index ? (
                              <i
                                className="fa fa-plus-circle mt-3 "
                                onClick={addNewField}
                              ></i>
                            ) : (
                              <span></span>
                            )}

                            <i
                              className="fa fa-minus-circle mt-3 ml-3"
                              onClick={() => removeField(field)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <DeactivateButton
                toggle={() => {
                  setDeactivatePage(!deactivatePage);
                }}
                deactivatePage={deactivatePage}
              />

              <div className="mt-2">
                {taxis.length < 1 ? (
                  <div></div>
                ) : editButton ? (
                  <MDBBtn
                    type="button"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="md"
                    onClick={updateTaxiUrl}
                  >
                    Update
                    {loader ? (
                      <div
                        className="spinner-border spinner-border-sm ml-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    type="submit"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="md"
                  >
                    Save
                    {loader ? (
                      <div
                        className="spinner-border spinner-border-sm ml-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </MDBBtn>
                )}
              </div>

              {/* <div className="mt-2">
                {taxis.length < 1 ? (
                  <div></div>
                ) : (
                  <MDBBtn
                    type="submit"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="md"
                  >
                    Save
                    {loader ? (
                      <div
                        className="spinner-border spinner-border-sm ml-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </MDBBtn>
                )}
              </div> */}
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
