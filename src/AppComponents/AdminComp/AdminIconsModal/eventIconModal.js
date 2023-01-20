import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import CreateEvent from "../../AdminComp/AdminIconsModal/createEventIconModal";
import Axios from "axios";

export default function EventIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(null);
  // const [deactivatePage, setDeactivatePage] = useState(null);
  const [checkEventStatus, setCheckEventStatus] = useState(null);
  const [modalCreateEvent, setModalCreateEvent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [events, setEvents] = useState([]);
  const [brandPageEventId, setBrandPageEventId] = useState("");
  const [checkloading, setCheckLoading] = useState(true);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toogleCreateEvent = () => {
    setModalCreateEvent(!modalCreateEvent);
  };

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/${brandPageId}`
    )
      .then((response) => {
        setCheckLoading(false);
        if (response.data.data == null) {
          setCheckEventStatus(false);
        } else {
          setAlert(null);
          setCheckEventStatus(true);
          setEvents(response.data.data.Events);
          setDeactivatePage(response.data.data.deactivate);
          setBrandPageEventId(response.data.data.id);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const createBrandPageEvent = () => {
    setLoader(!loader);
    Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent", {
      brandPageId: brandPageId,
      deactivate: deactivatePage ?? false,
    })
      .then((response) => {
        setBrandPageEventId(response.data.data.id);
        setLoader(false);
        setCheckEventStatus(true);
        setAlert(true);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const deleteEvent = (eventId) => {
    Axios.delete(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/${eventId}`
    )
      .then((response) => {
        Axios.get(
          `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/${eventId}`
        ).then((response) => {
          const eventResponse = response.data.data;
          setEvents(eventResponse);
        });
        setAlertSuccess(true);
        setSuccessMessage("Event deleted Successfully");
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const editEvent = (eventId) => {
    window.location = `/admin/edit-event/${eventId}`;
  };

  const updateBrandPageEvent = () => {
    setLoader(!loader);
    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/brandPage/${brandPageId}`,
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

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      <MDBModalBody>
        <h5 className="mt-2">
          <strong>Events</strong>
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
        ) : checkEventStatus ? (
          <div className="row">
            <div className="col-12">
              <div className="form-group row">
                <div className="col-10 offset-1">
                  {alert ? (
                    <MDBAlert color="success">
                      <strong>Congratulation!</strong> your brand page event tab
                      has been created successfully. Let's get started with
                      creating events.
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
                    onClick={toogleCreateEvent}
                  >
                    Create event
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
                        Welcome to the Brand Page Event customizer. Please click
                        on the button below to start setting up events.
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
                          Your event page will be ready in a seconds
                          <div
                            className="spinner-grow spinner-grow-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </MDBBtn>
                      ) : (
                        <>
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
                            onClick={createBrandPageEvent}
                          >
                            Start Event customization
                          </MDBBtn>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="row mt-3">
          {events && events.length < 1 ? (
            <span></span>
          ) : (
            events.map((event, index) => {
              return (
                <div
                  className="col-md-3 ml-2"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "20px",
                    background: `url(${event.headerImage}) no-repeat fixed center`,
                    opacity: "12",
                  }}
                  key={event.id}
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
                        onClick={() => editEvent(event.id)}
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
                        onClick={() => deleteEvent(event.id)}
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

        <CreateEvent
          constName={modalCreateEvent}
          functionName={toogleCreateEvent}
          brandPageEventId={brandPageEventId}
          brandPageId={brandPageId}
        />

        <form>
          {checkEventStatus ? (
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
                  onClick={updateBrandPageEvent}
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
