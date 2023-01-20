import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";
import Axios from "axios";
import { UserErrorPage } from "../UserErrorPage";

export default function StrandorteLocationModel(props) {
  const brandPageId = props.pageDetails.id;
  const [StrandDetails, setStrandDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagestrandorte/${brandPageId}`
    )
      .then((response) => {
        setStrandDetails(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="md"
      centered
    >
      {props.pageDetails.BrandPageStrandorte ? (
        <MDBModalBody>
          <div className="row">
            <div className="col-3 text-left">
              <div onClick={props.functionName} className="black-text">
                <MDBIcon icon="chevron-circle-left" />
              </div>
            </div>
            <div className="col-8 text-left">
              <h4 style={{ fontWeight: "400" }}> Strand Location</h4>
            </div>
          </div>
          <hr />

          {loading ? (
            <div className="col-12 mt-2 mb-2 text-center">
              <div
                className="spinner-grow text-primary fast ml-2"
                role="status"
              >
                <span className="sr-only mt-2">Loading...</span>
              </div>
            </div>
          ) : StrandDetails.deactivate ? (
            <div>
              <div className="row">
                <div
                  className="col-10 offset-1 text-left"
                  style={{
                    backgroundImage: `url(${StrandDetails.imageUrl})`,
                    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "150px",
                    borderRadius: "15px",
                  }}
                ></div>
              </div>
              <div className="row">
                <div className="col-10 offset-1 mt-3 font-small text-left ">
                  <h3>
                    <b>{StrandDetails.title}</b>
                  </h3>

                  <p className="mt-2">
                    <span style={{ fontSize: "12px" }}>
                      {StrandDetails.description}
                    </span>
                  </p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 text-center">
                  <div className="black-text" onClick={props.functionName}>
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
          ) : (
            <UserErrorPage errorText="Icon deactivated by admin." />
          )}
        </MDBModalBody>
      ) : (
        <span></span>
      )}
    </MDBModal>
  );
}
