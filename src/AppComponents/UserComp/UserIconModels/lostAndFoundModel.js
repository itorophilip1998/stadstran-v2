import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon, MDBBtn, MDBAlert } from "mdbreact";
import Axios from "axios";
import { UserErrorPage } from "../UserErrorPage";

export default function LostAndFoundModel(props) {
  const brandPageId = props.pageDetails.id;
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [redirectLoader, setRedirectLoader] = useState(false);
  const [lostItemFormData, setLostItemFormData] = useState([]);
  const clientId = localStorage.getItem("clientId");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalDetails, setModalDetails] = useState();

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagelostandfound/${brandPageId}`
    )
      .then((response) => {
        setModalDetails(response.data.data);
        setFields(response.data.data.LostAndFounds);
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
    const formData = [...lostItemFormData];
    const index = formData.findIndex(
      (element) => element.lostAndFoundId === field.id
    );
    if (index !== -1) {
      formData[index].content = value;
    } else {
      const data = {
        lostAndFoundId: field.id,
        content: value,
      };
      formData.push(data);
    }
    setLostItemFormData(formData);
  };

  const redirect = (brandPageId) => {
    window.location = `/user/form/${brandPageId}`;
  };

  const saveLostAndFound = (e) => {
    e.preventDefault();
    setLoader(true);

    Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/lost/item", {
      clientId: clientId,
      brandPageId: brandPageId,
      lostItemFormData: lostItemFormData,
    })
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage(
          "Sorry to hear about your lost item, we will get back to you as soon as possible."
        );
        setRedirectLoader(true);
        setInterval(redirect(brandPageId), 10000);
      })
      .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
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
          <div className="col-2 text-left">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" />
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
          ) : modalDetails.deactivate ? (
            <div className="col-10">
              <div className="row">
                <div className="col-10 text-center">
                  <img
                    src="/images/others/lostandfoundlogo.jpeg"
                    className="img-fluid"
                    style={{ borderRadius: "500px", width: "120px" }}
                    alt="family logo"
                  />
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
                  <form onSubmit={saveLostAndFound}>
                    <div className="row">
                      <div className="col-10">
                        {alertError ? (
                          <MDBAlert color="danger">{errorMessage}</MDBAlert>
                        ) : alertSuccess ? (
                          <MDBAlert color="info">
                            {successMessage}
                            <br />
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
          ) : (
            <UserErrorPage errorText="Icon deactivated by admin." />
          )}
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
