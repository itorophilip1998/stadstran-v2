import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import FormManagerComponents from "../../AppComponents/AdminComp/AdminFormManagerComponents/FormManagerComponent";
import { useHistory } from "react-router-dom";

function AdminFormManager(props) {
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
            <MDBCard style={{ width: "45rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <div>
                  <FormManagerComponents location={location} />
                </div>

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

export default AdminFormManager;
