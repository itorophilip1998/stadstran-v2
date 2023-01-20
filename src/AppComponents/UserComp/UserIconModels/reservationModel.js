import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon, MDBBtn, MDBAlert } from "mdbreact";
import Axios from "axios";

export default function ReservationModel(props) {
  const brandPageId = props.pageDetails.id;
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [redirectLoader, setRedirectLoader] = useState(false);
  const [reservationFormData, setReservationFormData] = useState([]);
  const clientId = localStorage.getItem("clientId");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagereservation/${brandPageId}`
    )
      .then((response) => {
        setFields(response.data.data.BrandPageReservationFormItems);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const inputStyle = {
    borderRadius: "10px",
    border: "1px dotted #000000",
    fontSize: "12px",
  };

  const singleFieldInput = (field, value) => {
    const formData = [...reservationFormData];
    const index = formData.findIndex(
      (element) => element.brandPageReservationFormItemId === field.id
    );
    if (index !== -1) {
      formData[index].content = value;
    } else {
      const data = {
        brandPageReservationFormItemId: field.id,
        content: value,
      };
      formData.push(data);
    }
    setReservationFormData(formData);
  };

  const redirect = (brandPageId) => {
    window.location = `/user/form/${brandPageId}`;
  };

  const saveReservation = (e) => {
    e.preventDefault();
    setLoader(true);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/reservation",
      {
        clientId: clientId,
        brandPageId: brandPageId,
        reservationFormData: reservationFormData,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage(
          "Congratulations! We have recieved your reservation."
        );
        setRedirectLoader(true);
        setInterval(redirect(brandPageId), 6000);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="sm"
      centered
    >
      <MDBModalBody>
        <div className="row">
          <div className="col-2 text-left">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" />
            </div>
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-10 text-center">
                <h5 style={{ fontWeight: "400" }}> Reservation Form</h5>
              </div>
            </div>
            {loading ? (
              <div className="col-12 mt-2 mb-2 text-center">
                <div
                  className="spinner-grow text-primary fast ml-2"
                  role="status"
                >
                  <span className="sr-only mt-2">Loading...</span>
                </div>
              </div>
            ) : fields.length < 1 ? (
              <h4>No Field Found</h4>
            ) : (
              <div>
                <form onSubmit={saveReservation}>
                  <div className="row">
                    <div className="col-10">
                      {alertError ? (
                        <MDBAlert color="danger">{errorMessage}</MDBAlert>
                      ) : alertSuccess ? (
                        <MDBAlert color="info">
                          {successMessage} <br />
                          {redirectLoader ? (
                            <div
                              className="spinner-grow spinner-grow-sm ml-2"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </MDBAlert>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-10 text-left">
                      {fields.map((field) => {
                        return field.formType === "textarea" ? (
                          <textarea
                            key={field.id}
                            className="form-control mt-3"
                            defaultValue={field.title}
                            onChange={(e) =>
                              singleFieldInput(field, e.target.value)
                            }
                            required
                          ></textarea>
                        ) : field.formType === "date" ? (
                          <div key={field.id}>
                            <input
                              type={field.formType}
                              className="form-control mt-3"
                              placeholder={field.title}
                              style={inputStyle}
                              onChange={(e) =>
                                singleFieldInput(field, e.target.value)
                              }
                              required
                            />
                            <p style={{ fontSize: "12px" }} className="ml-2">
                              Select Reservation Date
                            </p>
                          </div>
                        ) : (
                          <input
                            key={field.id}
                            type={field.formType}
                            className="form-control mt-3"
                            placeholder={field.title}
                            style={inputStyle}
                            onChange={(e) =>
                              singleFieldInput(field, e.target.value)
                            }
                            required
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-group row mt-5">
                    <div className="col-9 text-center">
                      <MDBBtn
                        type="submit"
                        color="blue"
                        style={{ borderRadius: "20px" }}
                        className="waves-effect z-depth-1a"
                        size="sm"
                      >
                        Send
                        {loader ? (
                          <div
                            className="spinner-grow spinner-grow-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
