import React, { useState, useEffect } from "react";
import Axios from "axios";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import NotificationStatus from "../AdminNotificationStatus";

export default function SocialMediaIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [socialMedias, setSocialMedias] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagesocialmedia/${brandPageId}`
    )
      .then((response) => {
        const brandPageResponse = response.data.data.SocialMedias;
        setDeactivatePage(response.data.data.deactivate);
        setSocialMedias(brandPageResponse);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const addNewField = () => {
    const fields = [...socialMedias];
    fields.push({
      title: "Facebook",
      url: "http://",
    });
    setSocialMedias(fields);
  };

  const removeField = (field) => {
    const fields = [...socialMedias];
    const index = fields.findIndex((element) => element === field);
    fields.splice(index, 1);
    setSocialMedias(fields);
  };

  const changefieldTitle = (field, e) => {
    const fields = [...socialMedias];
    const index = fields.findIndex((element) => element === field);
    fields[index].title = e.target.value;
    setSocialMedias(fields);
  };

  const changefieldUrl = (field, e) => {
    const fields = [...socialMedias];
    const index = fields.findIndex((element) => element === field);
    fields[index].url = e.target.value;
    setSocialMedias(fields);
  };

  const createSocialMedia = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendFields = socialMedias.map((field) => {
      return { title: field.title, url: field.url };
    });

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagesocialmedia",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage,
        socialMedias: sendFields,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
      })
      .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Social media links updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5>
          <strong>Social Media </strong>
        </h5>
        <p>Select Social media links for user to access</p>
        <hr />
        <div className="row mt-2">
          <div className="col-md-12">
            <form onSubmit={createSocialMedia}>
              <div className="row">
                <div className="col-10 offset-1">
                  {alertError ? (
                    <MDBAlert color="danger">{errorMessage}</MDBAlert>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              {socialMedias.length < 1 ? (
                <div className="row form-group mt-2">
                  <div className="col-md-10 offset-md-1">
                    <div className="row mt-1">
                      <div className="col-12">
                        Insert social media link
                        <i
                          className="fa fa-plus-circle ml-5 mt-3"
                          onClick={addNewField}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                socialMedias.map((field, index) => {
                  return (
                    <div className="row form-group mt-1" key={index}>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-4 mt-1">
                            <select
                              className="form-control"
                              style={{
                                border: "inset dotted #000000",
                                borderRadius: "10px",
                                fontSize: "12px",
                              }}
                              onChange={(e) => changefieldTitle(field, e)}
                            >
                              <option defaultValue={field.title}>
                                {field.title}
                              </option>
                              <option defaultValue="facebook">Facebook</option>
                              <option defaultValue="twitter">Twitter</option>
                              <option defaultValue="instagram">
                                Instagram
                              </option>
                            </select>
                          </div>
                          <div className="col-5 mt-1">
                            <input
                              className="form-control mb-3 mt-0"
                              style={{
                                border: "inset dotted #000000",
                                borderRadius: "10px",
                                fontSize: "12px",
                              }}
                              type="text"
                              defaultValue={field.url}
                              onChange={(e) => changefieldUrl(field, e)}
                            />
                          </div>
                          <div className="col-3">
                            {socialMedias.length - 1 === index ? (
                              <i
                                className="fa fa-plus-circle mt-3 "
                                onClick={addNewField}
                              ></i>
                            ) : (
                              <span></span>
                            )}

                            <i
                              className="fa fa-minus-circle mt-3 ml-3"
                              onClick={() => removeField(field)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <DeactivateButton
                toggle={() => {
                  setDeactivatePage(!deactivatePage);
                }}
                deactivatePage={deactivatePage}
              />
              <div className="mt-2">
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
              </div>
            </form>
          </div>
        </div>

        <div className="mt-5 font-small text-center pb-3">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
