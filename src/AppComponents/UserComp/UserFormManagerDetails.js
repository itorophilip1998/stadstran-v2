import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon, MDBInput, MDBBtn } from "mdbreact";
import Axios from "axios";

const UserFormManagerDetails = (props) => {
  const brandPageDetails = props.pageDetails;
  const brandPageId = brandPageDetails.id;
  const brandPageFormId = brandPageDetails.BrandPageForm.id;
  const [userFormModal, setUserFormModal] = useState(true);
  const [radio, setRadio] = useState(false);
  const [brandPageFormFields, setBrandPageFormFields] = useState();
  const [formItems, setFormItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageform/${brandPageFormId}`
    )
      .then((response) => {
        setBrandPageFormFields(response.data.data.FormItems);
        /////Check Form Time Status///////
        const currentDate = new Date();
        const saveDate = localStorage.getItem("saveDate");
        const fourHoursAgo = currentDate.getHours() - saveDate.getHours();
        console.log(fourHoursAgo);
        if (fourHoursAgo < 4) {
          localStorage.setItem("formStatus", false);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageFormId]);

  const toggleRadio = () => {
    setRadio(!radio);
    setShowButton(!showButton);
  };

  const toggleForm = () => {
    setUserFormModal(!userFormModal);
  };

  const formInputStyle = {
    borderRadius: "20px",
    border: "1px dotted #000000",
    fontSize: "12px",
  };

  const [modalSuccess, setModalSuccess] = useState(false);

  const changefield = (field, e) => {
    const fields = [...formItems];
    const index = fields.findIndex((element) => element.title === field.title);
    if (index === -1) {
      fields.push({
        title: e.target.placeholder,
        value: e.target.value,
      });
    } else {
      fields[index].title = e.target.placeholder;
      fields[index].value = e.target.value;
    }

    setFormItems(fields);
  };

  const registerClientSession = () => {
    const formStatus = true;
    const saveDate = new Date();

    localStorage.setItem("saveDate", saveDate);
    localStorage.setItem("formStatus", formStatus);
  };

  const redirect = () => {
    setUserFormModal(false);
  };

  const saveForm = (e) => {
    e.preventDefault();
    setLoader(!loader);

    Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/client", {
      brandPageId: brandPageId,
      formItems: formItems,
    })
      .then((response) => {
        localStorage.setItem("clientId", response.data.data.id);
        localStorage.setItem("brandPageId", brandPageId);
        setLoader(false);
        setModalSuccess(true);
        registerClientSession();
      })
      .catch((e) => {
        setLoader(false);
        // setAlertError(true);
        // setErrorMessage(e.response.data.data);
      });
  };

  return (
    <MDBModal
      isOpen={userFormModal}
      toggle={toggleForm}
      size="sm"
      backdrop={false}
    >
      <MDBModalBody>
        <h5 className="text-center">
          <MDBIcon icon="map-marker-alt" /> {brandPageDetails.name}
        </h5>
        <hr />
        {modalSuccess ? (
          <div className="text-center">
            <p>
              <MDBIcon
                far
                icon="check-circle"
                style={{ fontSize: "40px", color: "green" }}
              />
            </p>
            <p style={{ fontWeight: "400" }}>Form submitted successfully</p>
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
              onClick={redirect}
            >
              Continue
            </MDBBtn>
          </div>
        ) : brandPageFormFields ? (
          <div className="mt-3">
            <form onSubmit={saveForm}>
              {brandPageFormFields.map((field) => {
                return (
                  <div className="form-group row" key={field.id}>
                    <div className="col-12 col-md-12">
                      <input
                        type={field.formType}
                        className="form-control"
                        placeholder={field.title}
                        style={formInputStyle}
                        required={field.required}
                        onChange={(e) => changefield(field, e)}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="form-group row mt-4">
                <div className="col-2 col-md-2">
                  <MDBInput
                    onClick={toggleRadio}
                    checked={radio}
                    type="radio"
                    id="radio2"
                    style={{ fontSize: "8px" }}
                  />
                </div>
                <div className="col-9 col-md-9">
                  <label style={{ fontSize: "11px" }}>
                    By submitting this form, i agree to receive newsletters &
                    updates from stadstrand
                  </label>
                </div>
              </div>

              <div className="form-group row text-center mt-3 mb-3">
                <div className="col-12">
                  {showButton ? (
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
                      FINISH
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
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-12 text-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <h5>Loading brand page form..</h5>
            </div>
          </div>
        )}
      </MDBModalBody>
    </MDBModal>
  );
};

export default UserFormManagerDetails;
