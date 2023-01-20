import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import Axios from "axios";
import NotificationStatus from "../AdminNotificationStatus";

export default function ContactIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [contactForms, setContactForms] = useState([]);
  const [contactDescription, setContactDescription] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagecontactus/${brandPageId}`
    )
      .then((response) => {
        if (response.data.data !== null) {
          setEditButton(true);
        }
        const brandPageResponse = response.data.data.BrandPageContactUsItems;
        setDeactivatePage(response.data.data.deactivate);
        setContactForms(brandPageResponse);
        setContactDescription(response.data.data.description);
      })
      .catch((e) => {
        //console.log(e.response);
      });
  }, [brandPageId]);

  const addNewField = () => {
    const fields = [...contactForms];
    fields.push({
      title: "New field",
      formType: "Select field type",
    });
    setContactForms(fields);
  };

  const removeField = (field) => {
    const fields = [...contactForms];
    const index = fields.findIndex((element) => element === field);
    fields.splice(index, 1);
    setContactForms(fields);
  };

  const changefieldTitle = (field, e) => {
    const fields = [...contactForms];
    const index = fields.findIndex((element) => element === field);
    fields[index].title = e.target.value;
    setContactForms(fields);
  };

  const changefieldFormType = (field, e) => {
    const fields = [...contactForms];
    const index = fields.findIndex((element) => element === field);
    fields[index].formType = e.target.value;
    setContactForms(fields);
  };

  const createContactFields = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendFields = contactForms.map((field) => {
      return { title: field.title, formType: field.formType };
    });

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagecontactus",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage,
        description: contactDescription,
        contactUsItems: sendFields,
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

  const updateContactForm = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendFields = contactForms.map((field) => {
      return { title: field.title, formType: field.formType };
    });

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagecontactus/${brandPageId}`,
      {
        deactivate: deactivatePage,
        description: contactDescription,
        contactUsItems: sendFields,
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
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      centered
      backdrop={false}
    >
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Contact updated Successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5>
          <strong>Edit Contact </strong>
        </h5>
        <hr />

        <div className="row mt-2">
          <div className="col-md-12">
            <form onSubmit={createContactFields}>
              <div className="row">
                <div className="col-10 offset-1">
                  {alertError ? (
                    <MDBAlert color="danger">{errorMessage}</MDBAlert>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              {contactForms.length < 1 ? (
                <div className="row form-group mt-2">
                  <div className="col-md-10 offset-md-1">
                    <div className="row mt-1">
                      <div className="col-12">
                        Insert contact field
                        <i
                          className="fa fa-plus-circle ml-5 mt-3"
                          onClick={addNewField}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                contactForms.map((field, index) => {
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
                              onChange={(e) => changefieldFormType(field, e)}
                            >
                              <option defaultValue={field.formType}>
                                {field.formType}
                              </option>
                              <option defaultValue="text">text</option>
                              <option defaultValue="number">number</option>
                              <option defaultValue="email">email</option>
                              <option defaultValue="date">date</option>
                              <option defaultValue="textarea">textarea</option>
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
                              placeholder={field.title}
                              //   defaultValue={field.title}
                              onChange={(e) => changefieldTitle(field, e)}
                            />
                          </div>
                          <div className="col-3">
                            {contactForms.length - 1 === index ? (
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

              <div className="row form-group">
                <div className="col-md-10 offset-md-1">
                  <label>Comment Description</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    onChange={(e) => setContactDescription(e.target.value)}
                    defaultValue={contactDescription}
                  ></textarea>
                </div>
              </div>

              <DeactivateButton
                toggle={() => {
                  setDeactivatePage(!deactivatePage);
                }}
                deactivatePage={deactivatePage}
              />

              <div className="mt-2">
                {contactForms.length < 1 ? (
                  <div></div>
                ) : editButton ? (
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
                    onClick={updateContactForm}
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
