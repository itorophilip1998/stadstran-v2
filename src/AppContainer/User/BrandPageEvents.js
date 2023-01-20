import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBBtn } from "mdbreact";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";

export default function BrandPageEvents(props) {
  const brandPageId = props.match.params.brandpageid;
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/${brandPageId}`
    )
      .then((response) => {
        setEventsList(response.data.data.Events);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const cardStyle = {
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    paddingTop: "20px",
  };

  const daysLeft = (eventDate) => {
    const countDownDate = new Date(eventDate).getTime();
    const currentDate = new Date().getTime();
    const timeDistance = countDownDate - currentDate;
    const days = Math.floor(timeDistance / (1000 * 60 * 60 * 24));
    return days;
  };

  const dateFormat = (createdDate) => {
    const dateObj = new Date(createdDate);
    const newdate = dateObj.toDateString();
    return newdate;
  };

  return (
    <React.Fragment>
      <UserNavbar />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-7 offset-md-3 mt-3 mb-5"
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
              <div className="col-10 text-left mt-1">
                <h2>
                  <b>Events</b>
                </h2>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-10 offset-1 mt-3">
                    <h4>
                      <b>Upcoming Events</b>
                    </h4>
                  </div>
                </div>

                {loading ? (
                  <div className="col-12 mt-2 mb-2 text-center">
                    <div
                      className="spinner-grow text-primary fast ml-2"
                      role="status"
                    >
                      <span className="sr-only mt-2">Loading...</span>
                    </div>
                  </div>
                ) : (
                  eventsList.slice(0, 4).map((event) => {
                    return (
                      <div className="row">
                        {daysLeft(event.date) < 0 ? (
                          <span></span>
                        ) : (
                          <div
                            className="col-10 offset-1 mt-2 mt-2 font-small text-left"
                            key={event.id}
                            style={cardStyle}
                          >
                            <div className="row">
                              <div className="col-12">
                                <img
                                  className="img-fluid"
                                  src={event.headerImage}
                                  alt={event.title}
                                  style={{ borderRadius: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="row mt-1">
                              <div className="col-12 text-center">
                                <div>
                                  {daysLeft(event.date) < 0 ? (
                                    <span>Event Completed</span>
                                  ) : (
                                    <p>
                                      <span
                                        style={{
                                          fontSize: "18px",
                                          fontWeight: "500",
                                          backgroundColor: "green",
                                          color: "#ffffff",
                                          paddingRight: "10px",
                                          paddingLeft: "10px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        {daysLeft(event.date)}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "500",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        Days to go
                                      </span>
                                    </p>
                                  )}

                                  <p>
                                    <span style={{ fontSize: "12px" }}>
                                      Posted {dateFormat(event.createdAt)}
                                    </span>{" "}
                                    <br />
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {event.title}
                                    </span>{" "}
                                    <br />
                                    <span
                                      className="mr-2"
                                      style={{ fontSize: "12px" }}
                                    >
                                      <MDBIcon icon="map-marker-alt" />
                                    </span>
                                    <span style={{ fontSize: "12px" }}>
                                      {event.address}
                                    </span>{" "}
                                    <br />
                                    <Link
                                      to={{
                                        pathname: `/event/details/${event.id}`,
                                        state: {
                                          eventDetail: event,
                                        },
                                      }}
                                    >
                                      <MDBBtn
                                        type="button"
                                        color="black"
                                        style={{ borderRadius: "20px" }}
                                        className="waves-effect z-depth-1a"
                                        size="sm"
                                      >
                                        i'am interested
                                      </MDBBtn>
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-10 offset-1 mt-4">
                    <h4>
                      <b>Completed Events</b>
                    </h4>
                  </div>
                </div>

                {eventsList.slice(0, 4).map((event) => {
                  return (
                    <div className="row">
                      {daysLeft(event.date) < 0 ? (
                        <div
                          className="col-10 offset-1 mt-2 mt-2 font-small text-left"
                          key={event.id}
                          style={cardStyle}
                        >
                          <div className="row">
                            <div className="col-12">
                              <img
                                className="img-fluid"
                                src={event.headerImage}
                                alt={event.title}
                                style={{ borderRadius: "10px" }}
                              />
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-12 text-center">
                              <div>
                                <p>
                                  <span>Event Completed</span>
                                </p>

                                <p>
                                  <span style={{ fontSize: "12px" }}>
                                    Event Date: {dateFormat(event.date)}
                                  </span>{" "}
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {event.title}
                                  </span>{" "}
                                  <br />
                                  <span
                                    className="mr-2"
                                    style={{ fontSize: "12px" }}
                                  >
                                    <MDBIcon icon="map-marker-alt" />
                                  </span>
                                  <span style={{ fontSize: "12px" }}>
                                    {event.address}
                                  </span>{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

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
                    Back to Menu Icons
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
