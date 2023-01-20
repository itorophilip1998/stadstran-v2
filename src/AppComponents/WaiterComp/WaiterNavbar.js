import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";

import { Link, BrowserRouter as Router } from "react-router-dom";

function WaiterNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const waiterId = localStorage.getItem("waiterid");
  const brandPageId = localStorage.getItem("brandPageId");

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <MDBNavbar style={{ backgroundColor: "#b5cdd9" }} dark expand="md">
        <MDBNavbarBrand>
          <Link
            to={{
              pathname: `/waiter/dashboard/${waiterId}`,
            }}
            className="text-uppercase"
            style={{ color: "#000000" }}
          >
            <img
              src="/images/others/StSt_logo.png"
              className="img-fluid"
              alt="logo"
              style={{ width: "80px" }}
            />
          </Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav center>
            <MDBNavItem active>
              <MDBNavLink
                to="#!"
                className="text-uppercase"
                style={{ color: "#000000" }}
              >
                DOWNLOAD ORDER REPORTING
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                to={{
                  pathname: `/form/reports/${brandPageId}`,
                }}
                className="text-uppercase"
                style={{ color: "#000000" }}
              >
                DOWNLOAD FORM REPORTING
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );
}

export default WaiterNavbar;
