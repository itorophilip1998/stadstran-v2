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
import { Link, useHistory } from "react-router-dom";

function AdminReportManager(props) {
  const history = useHistory();
  const location = props.location.state.location;
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  const tabStyle = {
    width: "100px",
    height: "120px",
    backgroundColor: "#39729b",
    color: "#ffffff",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    transform: "skew(185deg)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const reportLists = [
    {
      id: "1",
      reportname: "Order Reports",
      link: `/order/reports/${location.id}`,
    },
    {
      id: "2",
      reportname: "Form Reports",
      link: `/form/reports/${location.id}`,
    },
    {
      id: "3",
      reportname: "Contact Reports",
      link: `/contact/reports/${location.id}`,
    },
    {
      id: "4",
      reportname: "Reservation Reports",
      link: `/reservation/reports/${location.id}`,
    },
    {
      id: "5",
      reportname: "Family And Friends Reports",
      link: `/family-friends/reports/${location.id}`,
    },
    {
      id: "6",
      reportname: "Feed Backs Reports",
      link: `/feedback/reports/${location.id}`,
    },
    {
      id: "7",
      reportname: "Lost and Found Reports",
      link: `/lost-found/reports/${location.id}`,
    },
  ];

  return (
    <MDBContainer fluid className={AdminStyle.adminbody2}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "45rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <div className="row">
                  <div className="col-12 text-center">
                    <h4>Brand Page Reports</h4>
                  </div>
                </div>
                <hr />

                <div className="row">
                  {reportLists.map((reportlist) => {
                    return (
                      <Link
                        to={reportlist.link}
                        className="col-8 offset-2 col-md-3 ml-5 mt-3"
                        style={tabStyle}
                        key={reportlist.id}
                      >
                        <div>
                          <h6
                            style={{
                              textAlign: "center",
                              padding: "35px 0px 5px 0px",
                              transform: "skew(170deg)",
                            }}
                          >
                            {reportlist.reportname}
                          </h6>
                        </div>
                      </Link>
                    );
                  })}
                  {/* <Link
                    to={{ pathname: `/order/reports/${location.id}` }}
                    className="col-8 offset-2 col-md-3 ml-3 mt-3"
                    style={tabStyle}
                  >
                    <div>
                      <h6
                        style={{
                          textAlign: "center",
                          padding: "35px 0px 5px 0px",
                          transform: "skew(170deg)",
                        }}
                      >
                        Order Reports
                      </h6>
                    </div>
                  </Link>

                  <Link
                    to={{ pathname: `/form/reports/${location.id}` }}
                    className="col-8 offset-2 col-md-3 offset-md-1 mt-3"
                    style={tabStyle}
                  >
                    <div>
                      <h6
                        style={{
                          textAlign: "center",
                          padding: "35px 0px 5px 0px",
                          transform: "skew(170deg)",
                        }}
                      >
                        Form Reports
                      </h6>
                    </div>
                  </Link>

                  <Link
                    to={{ pathname: `/contact/reports/${location.id}` }}
                    className="col-8 offset-2 col-md-3 offset-md-1 mt-3"
                    style={tabStyle}
                  >
                    <div>
                      <h6
                        style={{
                          textAlign: "center",
                          padding: "35px 0px 5px 0px",
                          transform: "skew(170deg)",
                        }}
                      >
                        Contact Reports
                      </h6>
                    </div>
                  </Link> */}
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

export default AdminReportManager;
