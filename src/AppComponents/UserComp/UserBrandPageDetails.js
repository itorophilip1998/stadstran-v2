import React from "react";
import { MDBIcon } from "mdbreact";

const UserBrandPageDetails = (props) => {
  const circleIcon = {
    width: "95px",
    height: "95px",
    background: "#ffffff",
    borderRadius: "50%",
    border: "1px solid #ffffff",
  };

  const descriptionStyle = {
    // border: "1px dotted #ffffff",
    // borderRadius: "10px",
    color: "#ffffff",
    padding: "5px",
  };

  const socialStyle = {
    fontSize: "30px",
    color: "#ffffff",
    marginBottom: "30px",
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${props.pageDetails.locationImagePath})`,
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "auto",
      }}
    >
      <div className="container">
        <div className="row" style={{ padding: "10px", color: "#ffffff" }}>
          <h5>
            <MDBIcon icon="map-marker-alt" /> {props.pageDetails.name}
          </h5>
        </div>
        <div className="row">
          <div className="col-12 col-md-12 text-center">
            <img
              src={props.pageDetails.logoPath}
              alt="Brand page logo"
              style={circleIcon}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 mt-4 text-center">
            <p style={descriptionStyle}>{props.pageDetails.description}</p>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-10 col-md-10 text-center">
            {props.pageDetails.BrandPageSocialMedium.SocialMedias.map(
              (medialink) => {
                return (
                  <span key={medialink.id}>
                    {medialink.title === "Facebook" ? (
                      <a
                        href={medialink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2"
                      >
                        <MDBIcon
                          className="ml-5"
                          fab
                          icon="facebook"
                          style={socialStyle}
                        />
                      </a>
                    ) : medialink.title === "Twitter" ? (
                      <a
                        href={medialink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2"
                      >
                        <MDBIcon
                          className="ml-5"
                          fab
                          icon="twitter-square"
                          style={socialStyle}
                        />
                      </a>
                    ) : medialink.title === "Instagram" ? (
                      <a
                        href={medialink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2"
                      >
                        <MDBIcon
                          className="ml-5"
                          fab
                          icon="instagram"
                          style={socialStyle}
                        />
                      </a>
                    ) : (
                      <div></div>
                    )}
                  </span>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBrandPageDetails;
