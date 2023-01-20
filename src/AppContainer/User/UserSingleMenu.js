import React, { useState } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBBtn, MDBAlert } from "mdbreact";
import Axios from "axios";

import { Link, useHistory } from "react-router-dom";

import UserStyles from "../../AppStyles/UserStyles.module.css";

export default function UserSingleMenu(props) {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const singleMenuDetail = props.location.state.subMenudetail;
  const brandPageId = props.location.state.brandPageId;
  const clientId = localStorage.getItem("clientId");
  const menuItemId = singleMenuDetail.id;
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);

  if (counter <= 0) {
    decrementCounter = () => setCounter(1);
  }

  const addToCart = () => {
    setLoader(true);
    Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/cart", {
      brandPageId: brandPageId,
      clientId: clientId,
      menuItemId: menuItemId,
      quantity: counter,
    })
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage(`${singleMenuDetail.name} added to cart`);
      })
      .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <UserNavbar pseudoCartCount={loader} />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-8 offset-md-2 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            <div className="row">
              <div className="col-8 col-md-8 mt-2 font-small text-left ">
                <div
                  onClick={history.goBack}
                  className="black-text"
                  style={{ fontSize: "25px" }}
                >
                  <MDBIcon icon="chevron-circle-left" />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 text-center">
                <h4 style={{ fontWeight: "300" }}>
                  {singleMenuDetail.name} :
                  <span className="ml-2" style={{ color: "red" }}>
                    €{singleMenuDetail.price}
                  </span>
                </h4>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12 col-md-5 offset-md-1">
                <img
                  src={singleMenuDetail.imageUrl}
                  alt="drink 1"
                  className="img-fluid"
                  id={UserStyles.imgBoxed_lg}
                />
              </div>
              <div className="col-12 col-md-5 offset-md-1 mt-4">
                <div className="row">
                  <div className="col-12">
                    {alertError ? (
                      <MDBAlert color="danger">{errorMessage}</MDBAlert>
                    ) : alertSuccess ? (
                      <MDBAlert color="info" className="text-center">
                        {successMessage}
                        <Link
                          to={{
                            pathname: "/cart",
                            state: {
                              brandPageId: props.location.state.brandPageId,
                            },
                          }}
                        >
                          <MDBBtn
                            type="button"
                            color="blue"
                            style={{ borderRadius: "20px" }}
                            className="waves-effect z-depth-1a"
                            size="sm"
                          >
                            View Cart
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
                        </Link>
                      </MDBAlert>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>

                <div className="row mt-3">
                  <div
                    className="col-10 offset-1 text-left"
                    style={{
                      backgroundColor: "#E7E7E7",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <div className="row">
                      <div className="col-12 text-center">
                        <div className="row">
                          <div className="col-2 ml-5">
                            <MDBIcon
                              icon="minus-circle"
                              className="mt-3"
                              onClick={decrementCounter}
                            />
                          </div>
                          <div className="col-4 text-center mt-2 ml-2">
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                              {counter}
                            </p>
                          </div>
                          <div className="col-1">
                            <MDBIcon
                              icon="plus-circle"
                              className="mt-3"
                              onClick={incrementCounter}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center mt-1">
                        <h5>
                          <b>Total:</b>
                          <span className="ml-2" style={{ color: "red" }}>
                            €{(singleMenuDetail.price * counter).toFixed(2)}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <MDBBtn
                          type="button"
                          color="blue"
                          style={{ borderRadius: "20px" }}
                          className="waves-effect z-depth-1a"
                          size="sm"
                          onClick={addToCart}
                        >
                          Add to Cart
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-md-7 col-md-10">
                    <h5 style={{ fontWeight: "400" }}>Description</h5>
                    <p>{singleMenuDetail.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6 mt-2 font-small text-right">
                <div
                  onClick={history.goBack}
                  className="black-text"
                  style={{ fontSize: "15px" }}
                >
                  <MDBIcon icon="chevron-circle-left" />
                  <span className="ml-2" style={{ fontSize: "15px" }}>
                    Order More
                  </span>
                </div>
              </div>

              <div className="col-6 col-md-6 mt-2 font-small text-left">
                <Link to={{ pathname: "/cart" }}>
                  <div className="black-text" style={{ fontSize: "15px" }}>
                    <span className="mr-2" style={{ fontSize: "15px" }}>
                      Go to Cart
                    </span>
                    <MDBIcon icon="chevron-circle-right" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
