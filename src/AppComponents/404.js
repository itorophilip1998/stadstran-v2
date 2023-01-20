/*eslint-disable*/

import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBIcon,
  MDBAlert,
} from "mdbreact";
import AdminStyle from "../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../AppComponents/AdminComp/AdminNavbar";
import { Link, useHistory } from "react-router-dom";


function AdminLogin() {
  const history = useHistory()

  return (
    <MDBContainer fluid className={AdminStyle.adminbody2}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "30rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <MDBCardTitle cascade className="text-center">
                  404
                </MDBCardTitle>
                <p className="fs.2">Seems you lost your way</p>

                <div className="mt-2 font-small text-center">
                  <a  onClick={history.goBack} className="black-text">
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}

export default AdminLogin;
