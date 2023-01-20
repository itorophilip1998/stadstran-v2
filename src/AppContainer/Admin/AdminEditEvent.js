import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function AdminEditEvent(props) {
  const history = useHistory();
  const eventId = props.match.params.eventId;
  const [event, setEvent] = useState({});
  const [headerImage, setHeaderImage] = useState("");
  const [headerImagePreview, setHeaderImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [information, setInformation] = useState("");
  const [activateCountDown, setActivateCountDown] = useState(false);
  const [checkloading, setCheckLoading] = useState(true);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [oldImage, setOldImage] = useState("");

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
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/event/${eventId}`
    )
      .then((response) => {
        setCheckLoading(false);
        if (response.status === 200) {
          setEvent(response.data.data);
          setHeaderImagePreview(response.data.data.headerImage);
          setOldImage(response.data.data.headerImage);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [eventId]);

  const convertedDate = (eventDate) => {
    const currentDate = new Date(eventDate);
    return currentDate.toDateString();
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    setLoader(!loader);

    let response;

    const dataEventImage = new FormData();

    if (dataEventImage) {
      dataEventImage.append("image", headerImage);
      dataEventImage.append("imageUrl", oldImage);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataEventImage,
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
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/${eventId}`,
      {
        address: address,
        date: date,
        information: information,
        title: title,
        eventLink: eventLink,
        headerImage: response ? response.data.url : null,
        activateCountDown: activateCountDown,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage("Updated successfully");
      })
      .catch((e) => {
        console.log(e.response);
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
      <MDBContainer fluid style={{ background: "#b5cdd9" }}>
        <div className="container">
          <div className="row">
            <div
              className="col-md-8 offset-md-2 text-center"
              style={{ background: "#ffffff", borderRadius: "10px" }}
            >
              <div className="row mt-3">
                <div className="col-2 font-small text-center pb-3">
                  <div onClick={history.goBack} className="black-text">
                   <h4> <MDBIcon icon="chevron-circle-left" /> </h4>
                  </div>
                </div>
                <div className="col-8">
                  <h4>
                    <b>Edit Event</b>
                  </h4>
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
                        <form onSubmit={updateEvent}>
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
                                height: "350px",
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
                                    Upload event header image
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
                                  <label>Event Title</label>
                                  <input
                                    type="text"
                                    defaultValue={event.title}
                                    className="form-control "
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="row form-group text-left">
                                <div className="col-md-12 mt-2">
                                  <label>Event Address</label>
                                  <input
                                    type="text"
                                    defaultValue={event.address}
                                    placeholder="Upload Event location"
                                    className="form-control"
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 mt-2 text-left">
                                  <label>
                                    Event Date - {convertedDate(event.date)}
                                  </label>
                                  <input
                                    type="date"
                                    defaultValue={event.date}
                                    className="form-control"
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setDate(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6">
                              <div className="row form-group mt-2">
                                <div className="col-md-12 text-left">
                                  <label>Event Description</label>
                                  <textarea
                                    className="form-control text-left"
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                    }}
                                    rows="3"
                                    defaultValue={event.information}
                                    onChange={(e) =>
                                      setInformation(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                              </div>

                              <div className="row form-group mt-2">
                                <div className="col-md-12 text-left">
                                  <label>Event URL</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={event.eventLink}
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) =>
                                      setEventLink(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <div className="row mt-2">
                            <div className="col-md-12">
                              <div className="custom-control custom-switch mt-2">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="eventCountSwitch"
                                  defaultChecked={event.activateCountDown}
                                  onChange={() => {
                                    setActivateCountDown(!activateCountDown);
                                  }}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="eventCountSwitch"
                                >
                                  Activate event countdown
                                </label>
                              </div>
                            </div>
                          </div>

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
                                  Update Event
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
