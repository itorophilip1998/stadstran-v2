
/*eslint-disable*/


import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import {
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBAlert,
} from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";
import Axios from "axios";
import { geolocated } from "react-geolocated";
import useScript from "../../hooks/useScript";
import AxiosUnzer from "../../helpers/AxiosUnzer";
import { v4 as uuid } from "uuid";

function UserCart(props) {
  const brandPageId = localStorage.getItem("brandPageId");
  const clientId = localStorage.getItem("clientId");
  const [cartList, setCartList] = useState(props.location.state.cartList);
  const [finalAmount, setFinalAmount] = useState(0);
  const [brandPageDetails, setBrandPageDetails] = useState([]);
  // const [loader, setLoader] = useState(false);
  const [showModaol, setShowModal] = useState(false);
  const [payPageId, setPayPageId] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [delLoader, setDelLoader] = useState(false);


  const UNZER_URL = "https://static.unzer.com/v1/checkout.js";

  useEffect(() => {
    setLoading(false);
    total(props.location.state.cartList);
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/user/${brandPageId}`
    )
      .then((response) => {
        setBrandPageDetails(response.data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId, props.location.state.cartList]);

  localStorage.setItem("coords", JSON.stringify({
    latitude: props.coords?.latitude,
    longitude: props.coords?.longitude,
  }))


  const incrementCounter = (cart) => {
    const cartData = [...cartList];
    const index = cartData.findIndex((element) => element.id === cart.id);
    cartData[index].quantity = cart.quantity + 1;
    setCartList(cartData);
    total(cartData);
  };

  const decrementCounter = (cart) => {
    const cartData = [...cartList];
    const index = cartData.findIndex((element) => element.id === cart.id);
    cartData[index].quantity = cart.quantity - 1;
    if (cart.quantity <= 0) {
      cartData[index].quantity = 1;
    }
    setCartList(cartData);
    total(cartData);
  };

  const removeItem = (cart) => {
    setDelLoader(true);
    const cartId = cart.id;
    Axios.delete(`https://stadtstrandapi.ecrapps.website/api/v1/cart/${cartId}`)
      .then((response) => {
        setDelLoader(false);
      })
      .catch((e) => {
        setDelLoader(false);
      });
  };

  const total = (newCartList) => {
    let totalAmount = 0;
    for (let cart of newCartList) {
      const initial = cart.MenuItem.price * cart.quantity;
      totalAmount = totalAmount + initial;
    }
    setFinalAmount(totalAmount.toFixed(2));
  };

  // const checkout = () => {
  //   setLoader(true);

  //   Axios.post("https://stadtstrandapi.ecrapps.website/api/v1/checkout", {
  //     brandPageId: brandPageId,
  //     clientId: clientId,
  //     amount: finalAmount,
  //     orderLocLactitude: props.coords.latitude,
  //     orderLocLongitude: props.coords.longitude,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       setLoader(false);
  //     })
  //     .catch((e) => {
  //       console.log(e.response);
  //       setLoader(false);
  //     });
  // };

  // console.log("props.coord", props.coords);

  // const makePayment = (token) => {
  //   const body = {
  //     token,
  //     finalAmount,
  //   };

  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   return fetch(
  //     `https://stadtstrandapi.ecrapps.website/api/v1/stripe/checkout/`,
  //     {
  //       method: "POST",
  //       headers,
  //       body: JSON.stringify(body),
  //     }
  //   )
  //     .then((response) => {
  //       console.log("RESPONSE", response);
  //       const { status } = response;
  //       console.log("STATUS ", status);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useScript(UNZER_URL);

  useEffect(() => {
    var checkout = new window.checkout(`${payPageId}`);
    if (payPageId === "") return;
    checkout.init();
    checkout.open();
    checkout.success();
  }, [payPageId]);

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
              <div className="col-9 col-md-9 mt-2 font-small text-left ">
                <div
                  onClick={history.goBack}
                  className="black-text"
                  style={{ fontSize: "25px" }}
                >
                  <div>
                    <MDBIcon icon="chevron-circle-left" />
                    <span
                      className="ml-5"
                      style={{ fontSize: "35px", fontWeight: "400" }}
                    >
                      Checkout
                    </span>
                  </div>
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
            <hr />
            <div className="row">
              <div className="col-9 col-md-9 offset-md-1 mt-2 font-small text-left ">
                <h6>ORDER POSITION</h6>

                <h6 className="mt-4">
                  <b>{brandPageDetails.name}</b>
                </h6>

                <p className="mt-4">{brandPageDetails.address}</p>
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
            ) : cartList < 1 ? (
              <span>Cart Empty</span>
            ) : (
              cartList.map((cart) => {
                return (
                  <div key={cart.id}>
                    <div className="row mt-3">
                      <div className="col-3">
                        <img
                          src={cart.MenuItem.imageUrl}
                          alt={cart.MenuItem.name}
                          className="img-fluid"
                          id={UserStyles.imgBoxed_md}
                        />
                      </div>
                      <div className="col-9">
                        <div className="row">
                          <div className="col-12 text-left">
                            <h5 style={{ fontWeight: "400" }}>
                              {cart.MenuItem.name}
                            </h5>
                            <p>{cart.MenuItem.description.substr(0, 50)}...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-4 text-left">
                            <span
                              className="ml-3"
                              style={{ color: "red", fontSize: "18px" }}
                            >
                              €
                              {(cart.MenuItem.price * cart.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div className="col-4 text-center">
                            <MDBIcon
                              icon="minus-circle"
                              className="mt-2 mr-3"
                              onClick={() => decrementCounter(cart)}
                            />
                            {cart.quantity}
                            <MDBIcon
                              icon="plus-circle"
                              className="mt-2 ml-2"
                              onClick={() => incrementCounter(cart)}
                            />
                          </div>
                          <div className="col-4 text-right">
                            <MDBIcon
                              icon="trash"
                              className="mt-2 mr-3"
                              onClick={() => removeItem(cart)}
                            />
                            {delLoader ? (
                              <div
                                className="spinner-grow spinner-grow-sm ml-3"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
            )}
            {/* 
            <div className="row">
              <div className="col-10 col-md-10 offset-md-1 mt-2 font-small text-left ">
                <h6>PAYMENT METHOD</h6>

                <select className="browser-default custom-select form-control">
                  <option>Choose payment method</option>
                  <option value="1">Banking Card</option>
                  <option value="2">Paypal</option>
                  <option value="3">Apple Pay</option>
                  <option value="3">Google Pay</option>
                </select>
              </div>
            </div> 
            <hr />
            */}

            <div className="row mt-3">
              <div className="col-12 text-center">
                <h6>TOTAL ORDER CREATED</h6>
                <span style={{ color: "red" }}>€{finalAmount}</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                {/* {props.coords && ( */}
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: "20px" }}
                >
                  Make Payments of €{finalAmount}
                </button>
                {/* <StripeCheckout
                  stripeKey="pk_test_U3exqk6VyPl2mcUlle5o3rFw"
                  token={makePayment}
                  name="Stripe Payment"
                  amount={finalAmount * 100}
                  description="Big Data Stuff" // the pop-in header subtitle
                  image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
                  allowRememberMe={true}
                >
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: "20px" }}
                  >
                    Make Payments of €{finalAmount}
                  </button>
                </StripeCheckout> */}
                {/* )} */}
              </div>
            </div>
            <CustomerInfo
              showModal={showModaol}
              setShowModal={setShowModal}
              cart={cartList}
              setPayPageId={setPayPageId}
              brandPageId={brandPageId}
            />
            <hr />
            {/* <div className="row mt-3">
              <div className="col-12 text-center">
                <MDBBtn
                  type="button"
                  color="blue"
                  style={{ borderRadius: "20px" }}
                  className="waves-effect z-depth-1a"
                  size="lg"
                >
                  Make Payments of €{finalAmount}
                </MDBBtn>
              </div>
            </div> */}
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}

// const CustomerForm = ({userFormModal, toggleForm }) => {
//   const createCustomer = 'https://api.unzer.com/v1//payments/authorize'
//   var config = {
//     method: 'post',
//     headers: {
//       'Authorization': 'Basic cy1wcml2LTJhMTBHUG5uYlJ2SzVlNmV3UVNucjVXNG1RTkNvbU45Og=='
//     },
//     // data : data
//   };

//   useEffect(()=> {
//     axios({...config, url :'https://api.unzer.com/v1//payments/authorize', data: ""})
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }, [])

//   return (
//     <MDBModal
//     isOpen={userFormModal}
//     toggle={toggleForm}
//     size="sm"
//     backdrop={false}
//   >
//     <MDBModalBody>
//       <h5 className="text-center">
//         CUSTOMER INFORMATION
//       </h5>
//       <hr />
//       {modalSuccess ? (
//         <div className="text-center">
//           <p>
//             <MDBIcon
//               far
//               icon="check-circle"
//               style={{ fontSize: "40px", color: "green" }}
//             />
//           </p>
//           <p style={{ fontWeight: "400" }}>Form submitted successfully</p>
//           <MDBBtn
//             type="button"
//             color="#39729b"
//             style={{
//               borderRadius: "20px",
//               backgroundColor: "#39729b",
//               color: "#ffffff",
//             }}
//             className="waves-effect z-depth-1a"
//             size="md"
//             onClick={redirect}
//           >
//             Continue
//           </MDBBtn>
//         </div>
//       ) : brandPageFormFields ? (
//         <div className="mt-3">
//           <form onSubmit={handleSubmit}>

//                 <div className="form-group row" key={field.id}>
//                   <div className="col-12 col-md-12">
//                     <input
//                       type={field.formType}
//                       className="form-control"
//                       placeholder={field.title}
//                       style={formInputStyle}
//                       required={field.required}
//                       onChange={(e) => changefield(field, e)}
//                     />
//                   </div>
//                 </div>

//             <div className="form-group row mt-4">
//               <div className="col-2 col-md-2">
//                 <MDBInput
//                   onClick={toggleRadio}
//                   checked={radio}
//                   type="radio"
//                   id="radio2"
//                   style={{ fontSize: "8px" }}
//                 />
//               </div>
//               <div className="col-9 col-md-9">
//                 <label style={{ fontSize: "11px" }}>
//                   By submitting this form, i agree to receive newsletters &
//                   updates from stadstrand
//                 </label>
//               </div>
//             </div>

//             <div className="form-group row text-center mt-3 mb-3">
//               <div className="col-12">
//                 {showButton ? (
//                   <MDBBtn
//                     type="submit"
//                     color="#39729b"
//                     style={{
//                       borderRadius: "20px",
//                       backgroundColor: "#39729b",
//                       color: "#ffffff",
//                     }}
//                     className="waves-effect z-depth-1a"
//                     size="md"
//                   >
//                     FINISH
//                     {loader ? (
//                       <div
//                         className="spinner-grow spinner-grow-sm ml-3"
//                         role="status"
//                       >
//                         <span className="sr-only">Loading...</span>
//                       </div>
//                     ) : (
//                       <span></span>
//                     )}t
//                   </MDBBtn>
//                 ) : (
//                   <span></span>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="row mt-5">
//           <div className="col-12 text-center">
//             <div className="spinner-grow text-primary" role="status">
//               <span className="sr-only">Loading...</span>
//             </div>
//             <h5>Loading brand page form..</h5>
//           </div>
//         </div>
//       )}
//     </MDBModalBody>
//   </MDBModal>
//   )
// }

const CustomerInfo = ({
  showModal,
  setShowModal,
  cart,
  setPayPageId,
  brandPageId,
}) => {
  const [loader, setLoader] = useState(false);
  // const [showButton, setShowButton] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    customerId: "",
    basketId: "",
  });
  const [basketItems, setBasketItems] = useState([]);
  const REDIRECT_URL = `https://stadstrandapp.herokuapp.com/user/form/${brandPageId}`
  // const REDIRECT_URL = `127.0.0.1:3000/user/form/${brandPageId}`;

  const LOGO_IMAGE =
    "https://stadstrandapp.herokuapp.com/images/others/StSt_logo.png";

  const basketItemReferenceId = uuid().slice(0, 7);
  const initBasketItems = useCallback(() => {
    cart.map((item) => {
      const basketItemReferenceId = uuid().slice(0, 7);
      // item.MenuItem.price * item.quantity;
      return setBasketItems((prev) => [
        ...prev,
        {
          title: item.MenuItem.name,
          subTitle: item.MenuItem.description,
          basketItemReferenceId,
          quantity: item.quantity,
          amountPerUnitGross: item.MenuItem.price,
          amountDiscountPerUnitGross: 0,
          vat: 0,
          // type: "goods",

          // imageUrl: item.MenuItem.imageUrl,
        },
      ]);
      // return basketItems.push();
    });
  }, [basketItems]);

  useEffect(() => cart && initBasketItems(), []);

  const [grossPrice, setGrossPrice] = useState(0);
  let calcGrossPrice = 0;
  useMemo(() => {
    basketItems.map(
      (item) => (calcGrossPrice += item.amountPerUnitGross * item.quantity)
    );
    setGrossPrice(Math.fround(calcGrossPrice).toFixed(2));
  }, [basketItems]);

  console.log("grossPrice", grossPrice);

  const createCustomer = async (customerData) => {
    await AxiosUnzer.post("v1/customers", { ...customerData })
      .then((res) => {
        setStatus("customerCreated");
        setIsFormSubmitted(true);
        setData((prev) => ({ ...prev, customerId: res.data.id }));
        createBasket();
      })
      .catch((error) => {
        setErrorMessage(
          "An Error occured while creating Customer, Please try again"
        );
      })
      .finally(() => setLoader(false));
  };

  const orderId = uuid().slice(0, 7);
  const createBasket = async () => {
    await AxiosUnzer.post("v2/baskets", {
      currencyCode: "EUR",
      orderId,
      totalValueGross: grossPrice,
      // note: "",
      basketItems,
    })
      .then((res) => {
        setStatus("basketCreated");
        setData((prev) => ({ ...prev, basketId: res.data.id }));
      })
      .catch((error) => {
        setErrorMessage(
          "An Error occured while creating Basket, Please try again"
        );
      });
  };

  const invoiceId = uuid().slice(0, 7);
  const authorizeOrderId = uuid().slice(0, 7);

  useEffect(() => {
    if (data.basketId === "" || data.customerId === "") return;
    AxiosUnzer.post("v1/paypage/charge", {
      amount: `${grossPrice}`,
      currency: "EUR",
      returnUrl: REDIRECT_URL,
      orderId: `Order-${authorizeOrderId}`,
      invoiceId: `shop-invoice-${invoiceId}`,
      logoImage: LOGO_IMAGE,
      shopName: cart[0].BrandPage.name,
      tagline: "Choose payment method",
      resources: {
        customerId: data.customerId,
        basketId: data.basketId,
      },
    })
      .then((res) => {
        setStatus("basketCreated");
        setShowModal(false);
        setPayPageId(res.data.id);
        localStorage.setItem("payment", JSON.stringify({
          id: res.data.resources.paymentId,
          amount: grossPrice,
        }))
      })
      .catch((error) => {
        setErrorMessage("An Error occured, Please try again");
      });
  }, [data.customerId, data.basketId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const item = e.target;
    const firstName = item[0].value.split(" ")[0];
    const lastName = item[0].value.split(" ")[1] ?? "--";
    const customerData = {
      lastname: firstName,
      firstname: lastName,
      phone: item[1].value,
      email: item[2].value,
    };
    createCustomer({ ...customerData });
  };

  if (submitting) {
    return (
      <div className="row mt-5">
        <div className="col-12 text-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Submitting customer informtion...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MDBModal
      isOpen={showModal}
      // toggle={toggleForm}
      size="sm"
      backdrop={false}
    >
      <MDBModalBody>
        <h5 className="text-center">Customer Information</h5>
        <div className="row">
          <div className="col-10 offset-1">
            {errorMessage ? (
              <MDBAlert color="danger">{errorMessage}</MDBAlert>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <hr />

        {isFormSubmitted ? (
          <div className="text-center">
            <p>
              <MDBIcon
                far
                icon="check-circle"
                style={{ fontSize: "40px", color: "green" }}
              />
            </p>

            {status === "pending" ? (
              <>
                <div
                  className="spinner-grow spinner-grow-sm ml-2"
                  role="status"
                >
                  <span className="sr-only">Creating Customer...</span>
                </div>
              </>
            ) : status === "customerCreated" ? (
              <>
                <p style={{ fontWeight: "400" }}>Customer Created</p>
                <div
                  className="spinner-grow spinner-grow-sm ml-2"
                  role="status"
                >
                  <span className="sr-only">Creating Basket...</span>
                </div>
              </>
            ) : (
              status === "basketCreated" && (
                <>
                  <p style={{ fontWeight: "400" }}>Basket Created</p>
                  <div
                    className="spinner-grow spinner-grow-sm ml-2"
                    role="status"
                  >
                    <span className="sr-only">Creating Transaction...</span>
                  </div>
                </>
              )
            )}
            <br />
            {errorMessage && (
              <MDBBtn
                type="button"
                color="#39729b"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#39729b",
                  color: "#ffffff",
                }}
                className="waves-effect z-depth-1a"
                size="md"
                onClick={() => setIsFormSubmitted(false)}
              >
                Retry
              </MDBBtn>
            )}
          </div>
        ) : (
          <div className="mt-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="col-12 col-md-12">
                  <input
                    name="customerName"
                    type="text"
                    className="form-control"
                    placeholder={"Full Name"}
                    style={formInputStyle}
                    required
                    // onChange={(e) => changefield(field, e)}
                  />
                  <br />
                  <input
                    name="customerPhone"
                    type="number"
                    className="form-control"
                    placeholder={"Customer Phone number"}
                    style={formInputStyle}
                    required
                    // onChange={(e) => changefield(field, e)}
                  />
                  <br />
                  <input
                    name="customerEmail"
                    type="email"
                    className="form-control"
                    placeholder={"Customer Email"}
                    style={formInputStyle}
                    required={false}
                    // onChange={(e) => changefield(field, e)}
                  />
                </div>
              </div>

              <div className="form-group row text-center mt-3 mb-3">
                <div className="col-12">
                  <MDBBtn
                    type="submit"
                    color="#39729b"
                    disabled={loader}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="md"
                  >
                    CREATE Customer
                    {loader ? (
                      <div
                        className="spinner-grow spinner-grow-sm ml-3"
                        role="status"
                      >
                        <span className="sr-only">Creating Customer...</span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </MDBBtn>
                </div>
              </div>
            </form>
          </div>
        )}
      </MDBModalBody>
    </MDBModal>
  );
};

const formInputStyle = {
  borderRadius: "20px",
  border: "1px dotted #000000",
  fontSize: "12px",
};

export default geolocated()(UserCart);
