/*eslint-disable*/


import React, { useState, useEffect, useCallback } from "react";
import { MDBFormInline, MDBBadge, MDBIcon } from "mdbreact";
import Axios from "axios";
//import AddToHomescreen from "react-add-to-homescreen";

//import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Link } from "react-router-dom";

const iconStyle = {
  paddingTop: "0px",
  backgroundColor: "#ffffff",
  height: "70px",
  width: "70px",
  borderRadius: "50%",
  display: "inline-block",
  fontSize: "9px",
  textAlign: "center",
};

function UserNavbar({ pseudoCartCount }) {
  const brandPageId = localStorage.getItem("brandPageId");
  const clientId = localStorage.getItem("clientId");
  const [cartCount, setCartCount] = useState(0);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const getCart = useCallback(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/carts/count/${clientId}`
    )
      .then((response) => {
        setCartCount(response.data.data.count);
      })
      .catch((e) => {});
  }, [clientId]);

  useEffect(() => {
    getCart();
  }, [pseudoCartCount]);

  // const handleAddToHomescreenClick = () => {
  //   alert(`
  //     1. Open Share menu
  //     2. Tap on "Add to Home Screen" button`);
  // };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installPWA = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      alert("Not supported")
      return;
    }
    alert("supported")
    promptInstall.prompt();
  };

  const currentCount = pseudoCartCount ?? 0;

  return (
    <div className="container-fluid" style={{ backgroundColor: "#b5cdd9" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3  mt-3">
            <Link
              to={{
                pathname: `/user/form/${brandPageId}`,
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
          </div>

          <div className="col-9 mt-2 mb-2">
            <div className="row text-center">
              <div className="col-4 text-center mt-4">
                <Link
                  to={{
                    pathname: "/cart",
                  }}
                  className="text-uppercase"
                  style={{ color: "#000000" }}
                >
                  <MDBBadge color="danger" style={{ fontSize: "8px" }}>
                    {/* {window.location.pathname.includes("cart") ?  cartCount : 5} */}
                    {cartCount}
                  </MDBBadge>
                  <MDBIcon icon="shopping-cart" style={{ fontSize: "16px" }} />
                </Link>
              </div>
              <div className="col-3 text-center mt-4">
                <Link
                  to={{ pathname: "/user/orders" }}
                  className="text-uppercase"
                  style={{ color: "#000000" }}
                >
                  <MDBBadge color="danger" style={{ fontSize: "8px" }}>
                    0
                  </MDBBadge>
                  <MDBIcon icon="bell" style={{ fontSize: "16px" }} />
                </Link>
              </div>
              <div className="col-5 text-center">
                <div
                  className="md-form my-0"
                  // onAddToHomescreenClick={handleAddToHomescreenClick}
                >
                  <MDBFormInline waves>
                    <span
                      onClick={installPWA}
                      style={iconStyle}
                      href="#contact"
                    >
                      <MDBIcon className="mt-3" icon="cloud-download-alt" />
                      <br />
                      Download
                      <br />
                      Icon
                    </span>
                  </MDBFormInline>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AddToHomescreen onAddToHomescreenClick={handleAddToHomescreenClick} /> */}
    </div>
  );
}

export default UserNavbar;
