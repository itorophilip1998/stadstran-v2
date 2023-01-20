import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon } from "mdbreact";
import MapContainer from "../../AppComponents/MapContainer";
import { Link } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";
import Axios from "axios";

export default function AboutBrandPage(props) {
  const brandPageId = props.match.params.brandpageid;
  const [aboutDetails, setAboutDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState();
  const [log, setLog] = useState();

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageabout/${brandPageId}`
    )
      .then((response) => {
        console.log(response);
        setAboutDetails(response.data.data);
        setLat(response.data.data.BrandPage.lat);
        setLog(response.data.data.BrandPage.lng);
        setLoading(false);
        // setScreenLoader(false);
        // setBrandPageDetail(response.data.data);
      })
      .catch((e) => {});
  }, [brandPageId]);

  return (
    <React.Fragment>
      <UserNavbar />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-6 offset-md-3 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            {loading ? (
              <div className="col-12 mt-2 mb-2 text-center">
                <div
                  className="spinner-grow text-primary fast ml-2"
                  role="status"
                >
                  <span className="sr-only mt-2">Loading...</span>
                </div>
              </div>
            ) : aboutDetails.deactivate ? (
              <div>
                <div className="row">
                  <div
                    className="col-10 offset-1 text-left"
                    style={{
                      backgroundImage: `url(${aboutDetails.imageUrl})`,
                      boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      height: "150px",
                      borderRadius: "15px",
                    }}
                  >
                    <div className="black-text">
                      <Link
                        to={{
                          pathname: `/user/form/${brandPageId}`,
                        }}
                      >
                        <MDBIcon
                          className="mt-2"
                          style={{ fontSize: "25px", color: "#ffffff" }}
                          icon="chevron-circle-left"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10 offset-1 mt-3 font-small text-left ">
                    <h3>
                      <b>About</b>
                    </h3>

                    <span
                      style={{ fontSize: "12px", fontWeight: "500" }}
                      className="mt-4"
                    >
                      {aboutDetails.subTitle}
                    </span>

                    <p className="mt-2">
                      <span style={{ fontSize: "12px" }}>
                        Mon - Fri: {aboutDetails.weekDayStart} -{" "}
                        {aboutDetails.weekDayEnd}
                      </span>{" "}
                      <br />
                      <span style={{ fontSize: "12px" }}>
                        Sat & Sun / Public Holidays: {aboutDetails.weekendStart}{" "}
                        - {aboutDetails.weekendEnd}
                      </span>{" "}
                      <br />
                      <span style={{ fontSize: "12px", fontWeight: "500" }}>
                        (Depending on the Weather)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  {aboutDetails < 1 ? (
                    <span></span>
                  ) : (
                    aboutDetails.Abouts.map((aboutsession) => {
                      return (
                        <div
                          className="col-10 offset-1 mt-3 font-small text-left"
                          key={aboutsession.id}
                        >
                          <span
                            style={{ fontSize: "12px", fontWeight: "500" }}
                            className="mt-4"
                          >
                            {aboutsession.title}
                          </span>

                          <p className="mt-2">
                            <span style={{ fontSize: "12px" }}>
                              {aboutsession.description}
                            </span>
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="row">
                  <div
                    className="col-10 offset-1"
                    style={{
                      padding: "20px",
                      border: "1px dotted #000000",
                      borderRadius: "15px",
                    }}
                  >
                    {aboutDetails.BrandPage < 1 ? (
                      <span></span>
                    ) : (
                      <MapContainer lat={lat} log={log} />
                    )}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 text-center">
                    <div className="black-text">
                      <Link
                        to={{
                          pathname: `/user/form/${brandPageId}`,
                        }}
                      >
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
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <span>You can not view page</span>
            )}
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
