import React from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";
import MapContainer from "../../MapContainer";

export default function WelcomeUserModal(props) {
  const descriptionStyle = {
    color: "#000000",
    padding: "5px",
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="lg"
      centered
    >
      {props.pageDetails.BrandPageWelcomeText ? (
        <MDBModalBody>
          <div
            className="container-fluid"
            style={{
              backgroundImage: `url(${props.pageDetails.BrandPageWelcomeText.imagePath})`,
              boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "200px",
              borderRadius: "15px",
            }}
          >
            <div className="row" style={{ padding: "10px", color: "#ffffff" }}>
              <div className="col-md-12 text-center mt-5">
                <h3
                  className="text-center"
                  style={{
                    marginTop: "30px",
                    fontWeight: "400",
                  }}
                >
                  <MDBIcon icon="map-marker-alt" /> Welcome to{" "}
                  {props.pageDetails.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="container-fluid mt-3">
            <div className="row">
              <div
                className="col-12 mt-2 text-center"
                style={{ marginTop: "20px" }}
              >
                <p style={descriptionStyle}>
                  {/* {props.pageDetails.BrandPageWelcomeText.welcomeText} */}
                </p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12 col-md-12">
                <MapContainer
                  lat={props.pageDetails.lat}
                  log={props.pageDetails.lng}
                />
              </div>
            </div>

            <div className="mt-5 font-small text-center pb-3">
              <div onClick={props.functionName} className="black-text">
                <MDBIcon icon="chevron-circle-left" /> Back
              </div>
            </div>
          </div>
        </MDBModalBody>
      ) : (
        <span></span>
      )}
    </MDBModal>
  );
}
