/*eslint-disable*/



import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";

function OrderReport(props) {
  const locationId = props.match.params.locationId;
  const history = useHistory();
  const [orderReports, setOrderReports] = useState([]);
  const [searchOrderReports, setSearchOrderReports] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/completed/orders/${locationId}`
    )
      .then((response) => {
        setOrderReports(response.data.data);
        setSearchOrderReports(response.data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    return () => {
      return;
    };
  }, [locationId]);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  const refreshReport = () => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/completed/orders/${locationId}`
    )
      .then((response) => {
        setOrderReports(response.data.data);
        setSearchOrderReports(response.data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const searchOrder = (e) => {
    const searchDate = e.target.value;
    const convertedDate = new Date(searchDate);
    const searchArray = [];

    searchOrderReports.map((report) => {
      const reportDate = new Date(report.createdAt);

      if (reportDate.toDateString() === convertedDate.toDateString()) {
        searchArray.push(report);
      }
    });
    setOrderReports(searchArray);
  };

  return (
    <MDBContainer fluid className={AdminStyle.adminbody2}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "45rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-3">
                <div className="row">
                  <div className="col-12 text-center">
                    <h4>{orderReports.length} Brand Page order reports</h4>
                  </div>
                </div>
                <hr />

                <div className="row mt-2">
                  <div className="col-md-4 offset-md-1 col-12 text-center">
                    <p className="mt-1 text-left">Search by date</p>
                    <form>
                      <div className="form-group row">
                        <div>
                          <input
                            className="form-control"
                            type="Date"
                            placeholder="Search by Date"
                            aria-label="Search"
                            style={{ borderRadius: "15px" }}
                            onChange={searchOrder}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-7 col-12 mt-3  text-left">
                    <MDBBtn
                      type="button"
                      color="black"
                      style={{ borderRadius: "20px" }}
                      className="waves-effect z-depth-1a"
                      size="sm"
                      onClick={refreshReport}
                    >
                      Refresh All Reports
                    </MDBBtn>
                  </div>
                </div>
                <hr />

                <div className="row">
                  {orderReports.length === 0 ? (
                    <div className="col-12 text-center mt-2">
                      <h3>No Order Report Available</h3>
                    </div>
                  ) : (
                    orderReports.map((report) => {
                      return (
                        <div className="col-4" key={report.id}>
                          {report.ClientDetails.map((title) => {
                            return (
                              <div className="text-left" key={title.id}>
                                <p style={{ fontSize: "12px" }}>
                                  <b>{title.title}:</b>
                                  <br />
                                  {title.value}{" "}
                                </p>
                              </div>
                            );
                          })}
                          <p className="text-left" style={{ fontSize: "12px" }}>
                            <b>Date:</b>
                            <br />
                            {report.createdAt}
                          </p>
                        </div>
                      );
                    })
                  )}
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

export default OrderReport;
