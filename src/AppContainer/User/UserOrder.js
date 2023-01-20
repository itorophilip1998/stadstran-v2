import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBBtn } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";
import Axios from "axios";

export default function UserOrder(props) {
  const clientId = localStorage.getItem("clientId");
  const history = useHistory();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/client/orders/${clientId}`
    )
      .then((response) => {
        console.log(response);
        setOrderList(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }, [clientId]);

  //   const orderList = [
  //     {
  //       id: "1",
  //       cartproductname: "Fresh Cold - Summer Love Beer",
  //       cartproductprice: "10.04",
  //       cartproductqty: "2",
  //       cartprouductimg: "/images/others/softdrink1.png",
  //       orderStatus: "1",
  //     },
  //     {
  //       id: "2",
  //       cartproductname: "Lime & Salt",
  //       cartproductprice: "9.04",
  //       cartproductqty: "1",
  //       cartprouductimg: "/images/others/softdrink2.png",
  //       orderStatus: "2",
  //     },
  //     {
  //       id: "3",
  //       cartproductname: "Salt Tea",
  //       cartproductprice: "11.04",
  //       cartproductqty: "1",
  //       cartprouductimg: "/images/others/softdrink3.png",
  //       orderStatus: "2",
  //     },
  //     {
  //       id: "4",
  //       cartproductname: "Life Water",
  //       cartproductprice: "16.04",
  //       cartproductqty: "1",
  //       cartprouductimg: "/images/others/softdrink4.png",
  //       orderStatus: "2",
  //     },
  //   ];

  return (
    <React.Fragment>
      <UserNavbar />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-6 offset-md-3 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            <div className="row">
              <div className="col-11 mt-2 font-small text-left ">
                <div
                  onClick={history.goBack}
                  className="black-text"
                  style={{ fontSize: "25px" }}
                >
                  <MDBIcon icon="chevron-circle-left" />
                  <span
                    className="ml-5"
                    style={{ fontSize: "35px", fontWeight: "400" }}
                  >
                    {" "}
                    My Orders
                  </span>
                </div>
              </div>
            </div>
            <hr />

            {loading ? (
              <div className="col-12 mt-2 mb-2 text-center">
                <div
                  className="spinner-grow text-primary fast ml-2"
                  role="status"
                >
                  <span className="sr-only mt-2">Loading...</span>
                </div>
              </div>
            ) : orderList < 1 ? (
              <div className="col-9 offset-2 mt-2 mb-2">
                <h4>No Order found</h4>
              </div>
            ) : (
              orderList.map((cart) => {
                return (
                  <div key={cart.id}>
                    <div className="row mt-3">
                      <div className="col-3 col-md-3 offset-1">
                        <img
                          src={cart.cartprouductimg}
                          alt="drink 1"
                          className="img-fluid"
                          id={UserStyles.imgBoxed_md}
                        />
                      </div>
                      <div className="col-5 col-md-5 mt-3">
                        <div className="row">
                          <div className="col-12 text-left">
                            <h5 style={{ fontWeight: "400" }}>
                              {cart.cartproductname}{" "}
                            </h5>
                            <span style={{ color: "red" }}>
                              €{cart.cartproductprice}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 col-md-3 mt-3">
                        {(() => {
                          switch (cart.orderStatus) {
                            case "1":
                              return (
                                <span
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  Order in Progress
                                </span>
                              );
                            case "2":
                              return (
                                <span
                                  style={{ color: "green", fontSize: "12px" }}
                                >
                                  Order Completed
                                </span>
                              );
                            default:
                              return (
                                <span
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  Order in Progress
                                </span>
                              );
                          }
                        })()}
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
            )}

            <hr />

            <div className="row mt-3">
              <div className="col-12 text-center">
                <Link to={{ pathname: "/menu" }}>
                  <MDBBtn
                    type="button"
                    color="blue"
                    style={{ borderRadius: "20px" }}
                    className="waves-effect z-depth-1a"
                    size="sm"
                  >
                    ORDER MORE
                  </MDBBtn>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
