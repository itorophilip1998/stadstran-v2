import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import LocationManagerTabs from "../../AppComponents/AdminComp/AdminLocationComponents/LocationManagerTabs";
import { useHistory } from "react-router-dom";

function AdminLocationManager(props) {
  const history = useHistory();
  const location = props.location.state.location;
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  return (
    <MDBContainer fluid className={AdminStyle.adminbody}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "30rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <MDBCardTitle cascade="true" className="text-center">
                  <span onClick={history.goBack}>
                    <MDBIcon icon="long-arrow-alt-left" />
                  </span> <span className="ml-5">Location Manager</span>
                </MDBCardTitle>
                <MDBRow className="mt-5">
                  <LocationManagerTabs location={location} />
                </MDBRow>

                <div className="row mt-5 font-small text-center pb-3">
                  <div className="col-6 black-text " onClick={history.goBack}>
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </div>
                  <div className="col-6 black-text " onClick={logout}>
                    Log out <MDBIcon icon="sign-out-alt" />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}

export default AdminLocationManager;
