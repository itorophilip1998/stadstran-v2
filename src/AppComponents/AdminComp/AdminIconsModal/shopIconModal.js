import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import NotificationStatus from "../AdminNotificationStatus";
import Axios from "axios";

export default function ShopIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [shopUrl, setShopUrl] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageshop/${brandPageId}`
    )
      .then((response) => {
        const BrandPage = response.data.data;
        if (response.data.data !== null) {
          setEditButton(true);
        }
        setShopUrl(BrandPage.externalUrl);
        setDeactivatePage(BrandPage.deactivate);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const createShopUrl = (e) => {
    e.preventDefault();
    setLoader(!loader);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpageshop",
      {
        brandPageId: brandPageId,
        externalUrl: shopUrl,
        deactivate: deactivatePage,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
        setEditButton(true);
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  const updateShopUrl = (e) => {
    e.preventDefault();
    setLoader(!loader);

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageshop/${brandPageId}`,
      {
        externalUrl: shopUrl,
        deactivate: deactivatePage,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Shop url updated Successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5 className="mt-2">
          <strong>Edit Shop url </strong>
        </h5>

        <hr />
        <form onSubmit={createShopUrl}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row form-group">
                <div className="col-md-8 offset-md-2">
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      border: "1px dotted #cccccc",
                      borderRadius: "20px",
                    }}
                    defaultValue={shopUrl}
                    onChange={(e) => setShopUrl(e.target.value)}
                    placeholder="Enter shop url"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <DeactivateButton
                    toggle={() => {
                      setDeactivatePage(!deactivatePage);
                    }}
                    deactivatePage={deactivatePage}
                  />
                  <div className="mt-2">
                    {editButton ? (
                      <MDBBtn
                        type="button"
                        color="#39729b"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                        }}
                        className="waves-effect z-depth-1a"
                        size="md"
                        onClick={()=> updateShopUrl()}
                      >
                        Update
                        {loader ? (
                          <div
                            className="spinner-border spinner-border-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </MDBBtn>
                    ) : (
                      <MDBBtn
                        type="submit"
                        color="#39729b"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                        }}
                        className="waves-effect z-depth-1a"
                        size="md"
                      >
                        Save
                        {loader ? (
                          <div
                            className="spinner-border spinner-border-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </MDBBtn>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
