/*eslint-disable*/


import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBAlert,
} from "mdbreact";
import Axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ConfirmationModal from "../../../AppComponents/ConfirmationModal";

// import Toggle from 'react-toggle';

function FormDetailFields(props) {
  const LocationDetail = props.location;
  const [fields, setFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldAutoFill, setFieldAutoFill] = useState(null);
  const [fieldEnabled] = useState(true);
  const [fieldRequired, setFieldRequired] = useState(true);

  const brandPageId = LocationDetail.id;
  const brandPageFormId = LocationDetail.BrandPageForm.id;
  const [enableAccompanyingPerson, setEnableAccompanyingPerson] =
    useState(true);
  const [requireAccompanyingPerson, setRequireAccompanyingPerson] =
    useState(false);
  const [deactivatePage, setDeactivatePage] = useState(null);
  const [enableNewsLetter, setEnableNewsLetter] = useState(true);
  const [loader, setLoader] = useState(false);
  const [modalAddField, setmodalAddField] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [iconSwitch, setIconSwitch] = useState(false);
  const [required, setRequired] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(true);

  const toggleModalAddField = () => {
    setmodalAddField(!modalAddField);
  };

  const SuccessModal = () => {
    setModalSuccess(!modalSuccess);
  };

  const onSubmitFormPage = () => {
    setLoader(!loader);
    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageform/formItems/${brandPageFormId}`,
      {
        brandPageId: brandPageId,
        enableNewsLetter: enableNewsLetter,
        deactivatePage: false,
        enableGetIcon: iconSwitch,
        enableAccompanyingPerson: enableAccompanyingPerson,
        requireAccompanyingPerson: requireAccompanyingPerson,
        formItems: fields,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        SuccessModal();
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
        setAlertError(!alertError);
        setErrorMessage(e.response.data.data);
      });
  };

  
  const saveBtnStyle = {
    fontSize: "12px",
    borderRadius: "20px",
  };

  function handleAdd() {
    const values = [...fields];
    fields.map((field) => {
      if (field.title.toString().toLowerCase() === fieldName.toLowerCase()) {
        return setNameAvailable(false);
      } else {
        setNameAvailable(true);
      }
    });
    console.log("nameAvailable", nameAvailable)
    let id = Math.random(25).toString(36).substring(6);
    if (nameAvailable) {
      values.push({
        id: id,
        title: fieldName,
        formType: fieldType,
        autoFilled: fieldAutoFill,
        enabled: fieldEnabled,
        required: fieldRequired,
      });
      setFields(values);
      setmodalAddField(!modalAddField);
    }
  }

  function handleRemove(id) {
    const values = [...fields];
    const index = values.findIndex((field) => field.id === id);
    values.splice(index, 1);
    setFields(values);
  }

  function handleAutoFill(id) {
    const values = [...fields];
    const index = values.findIndex((field) => field.id === id);
    const field = values[index];
    field.autoFilled = !field.autoFilled;
    values[index] = field;
    setFields(values);
  }

  function ToggleAutoFill() {
    const values = [...fields];
    values.forEach((field) => {
      field.autoFilled = !field.autoFilled;
    });
    setFieldAutoFill(!fieldAutoFill);
    setFields(values);
  }

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageform/${LocationDetail.BrandPageForm.id}`
    )
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setFields(data.FormItems);
        setEnableAccompanyingPerson(data.enableAccompanyingPerson);
        setEnableNewsLetter(data.enableNewsLetter);
        setDeactivatePage(data.deactivatePage);
      })
      .catch((e) => {
        setFields([]);
      });
  }, [LocationDetail.BrandPageForm.id]);

  const btnStyle = {
    fontSize: "9px",
    borderRadius: "20px",
  };

  const onDragEnd = (param) => {
    const sourceIndex = param.source.index;
    const destinationIndex = param.destination?.index;
    if (destinationIndex) {
      const oldFields = [...fields];
      const itemMoved = oldFields[sourceIndex];
      oldFields.splice(sourceIndex, 1);
      oldFields.splice(destinationIndex, 0, itemMoved);
      setFields(oldFields);
    }
  };

  return (
    <form className="mt-2">
      <MDBRow>
        <div className="col-12">
          <div className="text-center mb-2">
            {fieldAutoFill ? (
              <MDBBtn
                type="button"
                color="blue"
                style={{ borderRadius: "20px" }}
                className="waves-effect z-depth-1a"
                size="sm"
                onClick={ToggleAutoFill}
              >
                Enable Auto Fill
              </MDBBtn>
            ) : (
              <MDBBtn
                type="button"
                color="red"
                style={{ borderRadius: "20px" }}
                className="waves-effect z-depth-1a"
                size="sm"
                onClick={ToggleAutoFill}
              >
                Disable Auto Fill
              </MDBBtn>
            )}
          </div>
        </div>
      </MDBRow>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="form-items">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, i) => {
                return (
                  <Draggable key={i} draggableId={"draggable-" + i} index={i}>
                    {(provided, snapshot) => (
                      <div
                        className="row"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="col-12 col-md-6">
                          <div className="row mt-1">
                            <div className="col-9 mt-2">
                              <p
                                style={{
                                  border: "1px solid #000000",
                                  borderRadius: "15px",
                                  fontSize: "14px",
                                  padding: "10px",
                                }}
                              >
                                {field.title}
                              </p>
                            </div>
                            <div className="col-3">
                              <i
                                className="fa fa-minus-circle mt-3 ml-1"
                                onClick={() => handleRemove(field.id)}
                              ></i>
                              {/* <i className="fa fa-edit mt-3 ml-3" onClick={() => editSingleField(field.id)}></i> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="row">
                            <div className="col-10 mt-2">
                              <div className="row">
                                <div className="col-8">
                                  {field.autoFilled ? (
                                    <MDBBtn
                                      type="button"
                                      color="#39729b"
                                      style={btnStyle}
                                      size="sm"
                                      onClick={() => handleAutoFill(field.id)}
                                    >
                                      Add Autofill
                                    </MDBBtn>
                                  ) : (
                                    <MDBBtn
                                      type="button"
                                      color="#39729b"
                                      style={btnStyle}
                                      size="sm"
                                      onClick={() => handleAutoFill(field.id)}
                                    >
                                      Remove Autofill
                                    </MDBBtn>
                                  )}
                                </div>
                                <div className="col-4">
                                  <MDBBtn
                                    type="button"
                                    outline={required}
                                    color="blue"
                                    style={btnStyle}
                                    size="sm"
                                    onClick={() => setRequired(!required)}
                                  >
                                    Required
                                  </MDBBtn>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="row">
        <div className="col-10 offset-1">
          {alertError ? (
            <MDBAlert color="danger" dismiss>
              {errorMessage}
            </MDBAlert>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <MDBRow className="mt-3 mb-3">
        <MDBCol md="12" sm="12" xs="12">
          <span style={{ fontSize: "22px" }} onClick={toggleModalAddField}>
            Add new field <i class="fa fa-plus-circle"></i>
          </span>
        </MDBCol>
        <MDBModal
          isOpen={modalAddField}
          toggle={toggleModalAddField}
          size="sm"
          centered
        >
          <MDBModalBody>
            <form>
              <div className="form-group row">
                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Field Name"
                    className="form-control"
                    onChange={(e) => {
                      setFieldName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-12">
                  <select
                    className="browser-default custom-select"
                    onChange={(e) => {
                      setFieldType(e.target.value);
                    }}
                  >
                    <option>Select Field Type</option>
                    <option defaultValue="text">Text</option>
                    <option defaultValue="email">Email</option>
                    <option defaultValue="number">Number</option>
                    <option defaultValue="date">Date</option>
                    <option defaultValue="password">Password</option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-12">
                  <select
                    className="browser-default custom-select"
                    onChange={(e) => {
                      setFieldAutoFill(e.target.value);
                    }}
                  >
                    <option>Auto fill option</option>
                    <option defaultValue={true}>true</option>
                    <option defaultValue={false}>false</option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-12">
                  <select
                    className="browser-default custom-select"
                    onChange={(e) => {
                      setFieldRequired(e.target.value);
                    }}
                  >
                    <option>Required Option</option>
                    <option defaultValue={true}>true</option>
                    <option defaultValue={false}>false</option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <MDBBtn
                  type="button"
                  color="blue"
                  style={{ borderRadius: "20px" }}
                  className="waves-effect z-depth-1a"
                  size="sm"
                  onClick={() => handleAdd()}
                >
                  Add
                </MDBBtn>
              </div>
            </form>
          </MDBModalBody>
        </MDBModal>
      </MDBRow>

      <MDBRow className="mt-2">
        <MDBCol md={7} sm={12} xs={12}>
          <p>Would you like to offer to register accompanying persons?</p>
        </MDBCol>
        <MDBCol md={5} sm={12} xs={12}>
          <MDBRow>
            <MDBCol md={4} sm={4} xs={4}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitches"
                  readOnly
                  defaultChecked={enableAccompanyingPerson}
                  onChange={() => {
                    setEnableAccompanyingPerson(!enableAccompanyingPerson);
                  }}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitches"
                ></label>
              </div>
            </MDBCol>

            <MDBCol md={4} sm={4} xs={4}>
              <MDBBtn
                type="button"
                outline
                color="blue"
                style={{ borderRadius: "20px" }}
                size="sm"
                onClick={() => {
                  setRequireAccompanyingPerson(true);
                }}
              >
                Required
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mt-2">
        <MDBCol md={3} sm={6} xs={12}>
          <h5 className="mt-3" style={{ textAlign: "left" }}>
            Newsletter
          </h5>
        </MDBCol>
        <MDBCol md={4} sm={6} xs={12} className="mt-3">
          <div
            className="custom-control custom-switch"
            style={{ textAlign: "left" }}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitchesChecked"
              defaultChecked
              onChange={() => {
                setEnableNewsLetter(!enableNewsLetter);
              }}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitchesChecked"
            ></label>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mt-2">
        <MDBCol md={3} sm={6} xs={12}>
          <h5 className="mt-3" style={{ textAlign: "left" }}>
            Deactive Page
          </h5>
        </MDBCol>
        <MDBCol md={4} sm={6} xs={12} className="mt-3">
          <div
            className="custom-control custom-switch"
            style={{ textAlign: "left" }}
          >
            {console.log(deactivatePage)}
            <input
              type="checkbox"
              className="custom-control-input"
              id="deactivateSwitchesChecked"
              defaultChecked={deactivatePage}
              onChange={() => {
                setDeactivatePage(!deactivatePage);
              }}
            />
            <label
              className="custom-control-label"
              htmlFor="deactivateSwitchesChecked"
            ></label>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mt-2">
        <MDBCol md={3} sm={12} xs={12}>
          <h5 className="mt-3" style={{ textAlign: "left" }}>
            Get Icon
          </h5>
        </MDBCol>
        <MDBCol md={4} sm={12} xs={12} className="mt-3">
          <div
            className="custom-control custom-switch"
            style={{ textAlign: "left" }}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id="getIconSwitch"
              defaultChecked
              onChange={() => {
                setIconSwitch(!iconSwitch);
              }}
            />
            <label
              className="custom-control-label"
              htmlFor="getIconSwitch"
            ></label>
          </div>
        </MDBCol>
      </MDBRow>

      <div>
        <MDBBtn
          type="button"
          color="blue"
          style={saveBtnStyle}
          size="sm"
          onClick={onSubmitFormPage}
        >
          Save
          {loader ? (
            <div className="spinner-grow spinner-grow-sm ml-2" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div></div>
          )}
        </MDBBtn>

        <ConfirmationModal
          constName={modalSuccess}
          functionName={SuccessModal}
          successMessage="Brand Form Page Updated Successfully."
          redirect={`/admin/form/manager/${brandPageId}`}
        />
      </div>
    </form>
  );
}

export default FormDetailFields;
