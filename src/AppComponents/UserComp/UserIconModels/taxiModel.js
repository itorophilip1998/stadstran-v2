import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";
import Axios from "axios";
import { UserErrorPage } from "../UserErrorPage";

export default function TaxiModel(props) {
  const brandPageId = props.pageDetails.id;
  const [taxiDetails, setTaxiDetails] = useState();
  const [taxis, setTaxis] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagetaxi/${brandPageId}`
    )
      .then((response) => {
        setTaxiDetails(response.data.data);
        setTaxis(response.data.data.Taxis);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const iconStyle = {
    backgroundImage: `url(/images/others/beachparty.jpg)`,
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    fontSize: "60px",
    padding: "10px",
    borderRadius: "20px",
    color: "#ffffff",
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="md"
      centered
    >
      <MDBModalBody>
        <div className="row">
          <div className="col-3 text-left">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" />
            </div>
          </div>
          <div className="col-8 text-left">
            <h4 style={{ fontWeight: "400" }}> Available Taxi(s)</h4>
          </div>
        </div>
        <hr />

        {loading ? (
          <div className="col-12 mt-2 mb-2 text-center">
            <div className="spinner-grow text-primary fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </div>
        ) : taxiDetails.deactivate ? (
          <div className="row">
            <div className="col-12 col-md-12 text-center">
              <div className="row">
                {taxis.map((taxi) => {
                  return (
                    <div className="col-4 text-center mt-4" key={taxi.id}>
                      <div>
                        <a href={taxi.url} target="_blank" rel="noreferrer">
                          <MDBIcon icon="taxi" style={iconStyle} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <UserErrorPage errorText="Icon deactivated by admin." />
        )}
      </MDBModalBody>
    </MDBModal>
  );
}
