import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import Axios from "axios";
import NotificationStatus from "../AdminNotificationStatus";

export default function ReservationIconModal(props) {
  const brandPageId = props.locationId;
  const [description, setDescription] = useState("");
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [formItems, setFormItems] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagereservation/${brandPageId}`
    )
      .then((response) => {
        if (response.data.data !== null) {
          setEditButton(true);
        }
        const brandPageResponse =
          response.data.data.BrandPageReservationFormItems;
        setDeactivatePage(response.data.data.deactivate);
        setFormItems(brandPageResponse);
        setDescription(response.data.data[0].comments);
      })
      .catch((e) => {
        //console.log(e.response);
      });
  }, [brandPageId]);

  const addNewField = () => {
    const fields = [...formItems];
    fields.push({
      title: "New field",
      formType: "Select field type",
    });
    setFormItems(fields);
  };

  const removeField = (field) => {
    const fields = [...formItems];
    const index = fields.findIndex((element) => element === field);
    fields.splice(index, 1);
    setFormItems(fields);
  };

  const changefieldTitle = (field, e) => {
    const fields = [...formItems];
    const index = fields.findIndex((element) => element === field);
    fields[index].title = e.target.value;
    setFormItems(fields);
  };

  const changefieldFormType = (field, e) => {
    const fields = [...formItems];
    const index = fields.findIndex((element) => element === field);
    fields[index].formType = e.target.value;
    setFormItems(fields);
  };

  const createReservationForm = (e) => {
    e.preventDefault();
    setLoader(true);
    const sendFields = formItems.map((field) => {
      return { title: field.title, formType: field.formType };
    });

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagereservation",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage,
        comments: description,
        formItems: sendFields,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
        setEditButton(true);
      })
      .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const updateReservation = (e) => {
    e.preventDefault();
    setLoader(true);
    const sendFields = formItems.map((field) => {
      return { title: field.title, formType: field.formType };
    });

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagereservation/${brandPageId}`,
      {
        deactivate: deactivatePage,
        comments: description,
        formItems: sendFields,
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
          notificationMessage="Reservation updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5>
          <b>Edit Reservation Icon</b>
        </h5>
        <p>
          Enter a number of field to be displayed on brand page reservation form
        </p>
        <hr />
        <form onSubmit={createReservationForm}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {formItems.length < 1 ? (
            <div className="row form-group mt-2">
              <div className="col-md-10 offset-md-1">
                <div className="row mt-1">
                  <div className="col-12">
                    Add First Field
                    <i
                      className="fa fa-plus-circle ml-5 mt-3"
                      onClick={addNewField}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            formItems.map((field, index) => {
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
                           <option defaultValue="time">time</option>
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
                        {formItems.length - 1 === index ? (
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

          <div className="row form-group mt-3">
            <div className="col-md-10 offset-md-1">
              <label>Enter Description Text</label>
              <textarea
                style={{ border: "1px dotted #000000" }}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
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
            {formItems.length < 1 ? (
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
                onClick={updateReservation}
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

          <div className="mt-5 font-small text-center pb-3">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" /> Back
            </div>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
