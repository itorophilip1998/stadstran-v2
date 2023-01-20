import React from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  // MDBNotification
} from "mdbreact";

const ConfirmationModal = (props) => {
  const redirect = () => {
    window.location = props.redirect;
  };
  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="sm"
      centered
    >
      <MDBModalHeader toggle={props.functionName}></MDBModalHeader>
      <MDBModalBody>
        <div className="text-center">
          <p>
            <MDBIcon
              far
              icon="check-circle"
              style={{ fontSize: "40px", color: "green" }}
            />
          </p>
          <p style={{ fontWeight: "400" }}>{props.successMessage}</p>
        </div>
        <div className="text-center">
          <MDBBtn
            type="button"
            color="blue"
            style={{ borderRadius: "20px" }}
            className="waves-effect z-depth-1a"
            size="sm"
            onClick={redirect}
          >
            Ok
          </MDBBtn>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
};

export default ConfirmationModal;
