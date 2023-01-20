/*eslint-disable*/


import React from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import {
  MDBContainer,
  MDBIcon,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
} from "mdbreact";

import { useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";

export default function EventDetail(props) {
  console.log(props);
  console.log(props.location.state.eventDetail);
  const history = useHistory();

  const singleJobDetail = props.location.state.eventDetail;
  const brandPageId = localStorage.getItem("brandPageId");

  const convertedDate = (eventDate) => {
    const currentDate = new Date(eventDate);
    return currentDate.toDateString();
  };

  const convertedTime = (eventTime) => {
    const currentDate = new Date(eventTime);
    const hour = currentDate.getHours();
    const min = currentDate.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    const Time = hour + ":" + min + " " + ampm;
    return Time;
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
              <div
                className="col-10 offset-1 text-left"
                style={{
                  backgroundImage: `url(${singleJobDetail.headerImage})`,
                  boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "150px",
                  borderRadius: "15px",
                }}
              >
                <div className="black-text" onClick={history.goBack}>
                  <MDBIcon
                    className="mt-2"
                    style={{ fontSize: "25px", color: "#ffffff" }}
                    icon="chevron-circle-left"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 offset-1 mt-4 mt-3 font-small text-left">
                <div className="row">
                  <div className="col-12">
                    <div>
                      <h6 style={{ fontWeight: "400" }}>Event Title</h6>
                      <h5 style={{ fontWeight: "500" }}>
                        {singleJobDetail.title}
                      </h5>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <h6 style={{ fontWeight: "400" }}>Date</h6>
                        <span
                          className="mt-3"
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            fontSize: "12px",
                            padding: "10px",
                          }}
                        >
                          {convertedDate(singleJobDetail.date)}
                          <MDBIcon
                            far
                            icon="calendar-alt"
                            style={{ marginLeft: "10px" }}
                          />{" "}
                        </span>{" "}
                        <br />
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <h6 style={{ fontWeight: "400" }}>Time</h6>
                        <span
                          className="mt-3"
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            fontSize: "12px",
                            padding: "10px",
                          }}
                        >
                          {convertedTime(singleJobDetail.date)}
                          <MDBIcon
                            far
                            icon="clock"
                            style={{ marginLeft: "10px" }}
                          />{" "}
                        </span>{" "}
                        <br />
                      </div>
                    </div>
                    <p className="mt-4">
                      <span className="mr-2" style={{ fontSize: "12px" }}>
                        <MDBIcon icon="map-marker-alt" />
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {singleJobDetail.address}
                      </span>{" "}
                      <br />
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-10 offset-1">
                    <MDBCarousel
                      activeItem={1}
                      length={singleJobDetail.EventImages.length}
                      showControls={false}
                      showIndicators={false}
                      className="z-depth-1"
                      slide
                      style={{ borderRadius: "10px" }}
                    >
                      <MDBCarouselInner>
                        {singleJobDetail.EventImages.map((eventSlideImg) => {
                          return (
                            <MDBCarouselItem
                              itemId={eventSlideImg.id}
                              key={eventSlideImg.id}
                            >
                              <MDBView>
                                <img
                                  className="d-block w-100"
                                  src={eventSlideImg.url}
                                  alt={eventSlideImg.id}
                                />
                              </MDBView>
                            </MDBCarouselItem>
                          );
                        })}
                      </MDBCarouselInner>
                    </MDBCarousel>
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
                      Additional Information
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
                      {singleJobDetail.information}
                    </span>
                  </div>
                </div>
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
