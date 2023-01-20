/*eslint-disable*/


import React, { useState, useEffect, useCallback } from "react";
import WaiterStyle from "../../AppStyles/WaiterStyles.module.css";
import { MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBAlert } from "mdbreact";
import MapContainer from "../MapContainer";
import Axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import AxiosConfig from "../../helpers/AxiosConfig";

export const CompletedOrders = () => {
  const [showModal, setShowModal] = useState(false);
  // const [waiterOrder, setWaiterModal] = useState();
  const brandPageId = localStorage.getItem("brandPageId");
  const [waitersOrders, setWaitersOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRoute, setShowRoute] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [conpletingOrder, setCompletingOrder] = useState(false)

  // const toggleList = (waiterOrder) => {
  //   setWaiterModal(waiterOrder);
  //   setSingleListModal(!singleListModal);
  // };

  const getOrder = useCallback(() => {
    AxiosConfig.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/completed/orders/${brandPageId}`
    )
      .then((response) => {
        console.log("waiter", response.data.data);
        setWaitersOrders(response.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  useEffect(() => getOrder(), []);

  const completeOrder = useCallback((id) => {
    setCompletingOrder(true)
    AxiosConfig.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/confirm/order/${id}`
    )
      .then((res) => {
        setOrderCompleted(true)
        setTimeout(()=> setShowModal(false), 2000)
      })
      .catch((error) => console.log(error))
      .finally(()=> setCompletingOrder(false))
  }, []);

  const createRoute = () => null;
  const completed = () => null;
  //   const waitersOrders = [
  //     {
  //       id: "1",
  //       orderRefNob: "GWY342ES2321",
  //       fullname: "Chime Emmanuel",
  //       order: [
  //         {
  //           id: "1",
  //           menu: "Evolution Fresh Cold Juice",
  //           quantity: "2",
  //           price: "10.99",
  //           total: "21.98",
  //           menuImg: "/images/others/softdrink1.png",
  //           dateTime: "14:34pm 14 March 2021",
  //         },
  //       ],
  //     },
  //     {
  //       id: "2",
  //       orderRefNob: "AAE112ES2321",
  //       fullname: "Solomon Job",
  //       order: [
  //         {
  //           id: "1",
  //           menu: "Evolution Fresh Cold Juice",
  //           quantity: "2",
  //           price: "10.99",
  //           total: "21.98",
  //           menuImg: "/images/others/softdrink2.png",
  //           dateTime: "03:04pm 10 March 2021",
  //         },
  //         {
  //           id: "2",
  //           menu: "Smoked Fish and Garri",
  //           quantity: "1",
  //           price: "25.99",
  //           total: "25.99",
  //           menuImg: "/images/others/softdrink3.png",
  //           dateTime: "03:04pm 10 March 2021",
  //         },
  //       ],
  //     },
  //   ];
  // if (1) return<></>
  return (
    <div className="col-md-12">
      {loading ? (
        <div className="col-12 text-center mt-2 mb-2">
          <div className="spinner-grow text-primary fast ml-2" role="status">
            <span className="sr-only mt-2">Loading...</span>
          </div>
        </div>
      ) : waitersOrders.length < 1 ? (
        <div className="row">
          <div className="col-12 text-center mt-2 mb-2">
            <h2>No Order found</h2>
          </div>

          <div className="col-12 text-center mt-2 mb-2">
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
      ) : (
        waitersOrders.map((waiterOrder) => {
          return (
            //console.log(waitersOrders[1].order)
            <div
              className="row shadow-sm bg-light mt-3"
              key={waiterOrder.id}
              id={WaiterStyle.id}
            >
              <div className="col-12 col-md-12">
                <div className="row py-2">
                  <div className="col-8 col-md-8">
                    <h5>{waiterOrder.BrandPage?.name}</h5>
                  </div>
                  <div className="col-4 col-md-4 text-right">
                    {/* <MDBIcon
                      icon="cog"
                      onClick={() => setShowModal(true)}
                      style={{ fontSize: "25px" }}
                    /> */}
                    <MDBModal
                      isOpen={showModal}
                      toggle={() => setShowModal(!showModal)}
                    >
                      <MDBModalBody>
                        {waiterOrder ? (
                          <div>
                            <div className="row">
                              <div className="col-9 col-md-9 text-left">
                                <div className="black-text">
                                  <h5>{waiterOrder.BrandPage.name}</h5>
                                </div>
                              </div>
                              <div className="col-3 col-md-3 text-right">
                                <div
                                  onClick={() => setShowModal(null)}
                                  className="black-text"
                                >
                                  <MDBIcon icon="chevron-circle-left" /> Close
                                </div>
                              </div>
                            </div>
                            {orderCompleted && (
                              <div className="row">
                                <MDBAlert color="success">

                                </MDBAlert>
                              </div>
                            )}
                            <hr />
                            <div className="row">
                              <div className="col-md-12">
                                {waiterOrder.CompletedOrders.map((order) => {
                                  return (
                                    <div className="row" key={order.id}>
                                      <div className="col-3 col-md-3">
                                        <img
                                          src={
                                            order.MenuItem?.imageUrl ??
                                            "https://cdn-icons-png.flaticon.com/128/7296/7296951.png"
                                          }
                                          id={order.id}
                                          className="img-fluid"
                                          alt="orderList"
                                        />
                                      </div>
                                      <div className="col-8 col-md-8 mt-2 text-left">
                                        <div className="row">
                                          <div className="col-7 col-md-7">
                                            <p>
                                              <span
                                                style={{
                                                  fontSize: "18px",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                {/* Order */}
                                                {order.MenuItem?.name}
                                              </span>{" "}
                                              <br />
                                              <b>
                                                Quantity {order.MenuItem?.qty}
                                              </b>
                                              <br />
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                  marginTop: "1rem",
                                                }}
                                              >
                                                {dayjs(order.createdAt).format(
                                                  "DD/MM/YYYY"
                                                )}
                                              </span>
                                            </p>
                                          </div>

                                          <div className="col-5 col-md-5">
                                            <div className="row">
                                              <div className="col-6 col-md-6 mt-1">
                                                <h6></h6>
                                              </div>
                                              <div className="col-6 col-md-6">
                                                <h5 style={{ color: "red" }}>
                                                  ${order.MenuItem?.price}
                                                </h5>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            {/* <h5>{waiterOrder.fullname}</h5>  */}
                            <hr />
                            <div className="row">
                              <div className="col-12 col-md-12">
                                <MapContainer
                                  showRoute={showRoute}
                                  destinationRoute={{
                                    lat: waiterOrder.waiterOrderLocLactitude,
                                    lng: waiterOrder.orderLocLongitude,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="row mt-5">
                              <div className="col-12 col-md-12 text-center">
                                <MDBBtn
                                  type="button"
                                  color="blue"
                                  style={{ borderRadius: "20px" }}
                                  className="waves-effect z-depth-1a"
                                  size="sm"
                                  onClick={() => setShowRoute(!showRoute)}
                                >
                                  Create Route
                                </MDBBtn>

                                <MDBBtn
                                  type="button"
                                  color="white"
                                  style={{
                                    borderRadius: "20px",
                                    color: "#000000",
                                  }}
                                  className="waves-effect z-depth-1a"
                                  size="sm"
                                  loading={conpletingOrder}
                                  onClick={() => completeOrder(waiterOrder.id)}
                                >
                                  Completed
                                </MDBBtn>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </MDBModalBody>
                    </MDBModal>
                  </div>
                </div>
                {waiterOrder.CompletedOrders.map((order) => {
                  return (
                    <div className="row" key={order.id}>
                      <div className="col-3 col-md-3">
                        <img
                          src={
                            order.MenuItem?.imageUrl ??
                            "https://cdn-icons-png.flaticon.com/128/7296/7296951.png"
                          }
                          id={order.id}
                          className="img-fluid"
                          alt="orderList"
                        />
                      </div>
                      <div className="col-9 col-md-9 mt-2">
                        <div className="row">
                          <div className="col-7 col-md-7">
                            <p>
                              <span
                                style={{ fontSize: "18px", fontWeight: "bold" }}
                              >
                                {order.MenuItem?.name}
                              </span>{" "}
                              <b>Quantity: {order.MenuItem?.qty}</b>
                              <br />
                              <br />
                              <span style={{ fontSize: "10px" }}>
                                {dayjs(order.createdAt).format("DD/MM/YYYY")}
                              </span>
                            </p>
                          </div>

                          <div className="col-5 col-md-5">
                            <div className="row mt-5">
                              <div className="col-4 col-md-4 mt-1">
                                <h6>
                                  {/* <b>{order.MenuItem?.qty}</b> */}
                                </h6>
                              </div>
                              <div className="col-5 col-md-5">
                                <span
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "red",
                                  }}
                                >
                                  ${order.MenuItem?.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CompletedOrders;
