import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";
import Axios from "axios";
import { UserErrorPage } from "../UserErrorPage";

export default function ShopModel(props) {
  const brandPageId = props.pageDetails.id;
  const [shopDetails, setShopDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageshop/${brandPageId}`
    )
      .then((response) => {
        setShopDetails(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="sm"
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
            <h4 style={{ fontWeight: "400" }}> Stadt Shop </h4>
          </div>
        </div>
        <hr />
        {loading ? (
          <div className="col-12 mt-2 mb-2 text-center">
            <div className="spinner-grow text-primary fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </div>
        ) : shopDetails.deactivate ? (
          <div className="row">
            <div className="col-12 col-md-12 text-center">
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <div>
                    <a
                      href={shopDetails.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MDBIcon
                        icon="store-alt"
                        style={{
                          backgroundImage: `url(/images/others/beachparty.jpg)`,
                          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                          fontSize: "80px",
                          padding: "15px",
                          borderRadius: "20px",
                          color: "#ffffff",
                        }}
                      />
                    </a>
                  </div>
                  <div className="mt-2">Connect to shop</div>
                </div>
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
