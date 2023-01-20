import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function AdminEditFoodTruck(props) {
  const history = useHistory();
  const foodtruckId = props.match.params.foodtruckId;
  const [foodTruck, setFoodTruck] = useState({});
  const [headerImage, setHeaderImage] = useState("");
  const [headerImagePreview, setHeaderImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [information, setInformation] = useState("");
  const [checkloading, setCheckLoading] = useState(true);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [oldImage] = useState("");

  const imageFileStyle = {
    padding: "10px",
    border: "1px solid #ffffff",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
    color: "#ffffff",
  };

  const onChangeFile = (e) => {
    setHeaderImage(e.target.files[0]);
    setHeaderImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1//brandpagefoodtruck/foodtruck/${foodtruckId}`
    )
      .then((response) => {
        setCheckLoading(false);
        if (response.status === 200) {
          setFoodTruck(response.data.data);
          setHeaderImagePreview(response.data.data.imagePath);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [foodtruckId]);

  const updateFoodTruck = async (e) => {
    e.preventDefault();
    setLoader(!loader);

    let response;

    const dataFoodImage = new FormData();

    if (dataFoodImage) {
      dataFoodImage.append("image", headerImage);
      dataFoodImage.append("imageUrl", oldImage);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataFoodImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (e) {
        console.log(e.response);
      }
    }

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck/${foodtruckId}`,
      {
        address: address,
        information: information,
        title: title,
        imagePath: response ? response.data.url : null,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage("Updated successfully");
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <React.Fragment>
      <MDBContainer fluid className={AdminStyle.adminbody}>
        <AdminNavbar />
      </MDBContainer>
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="container">
          <div className="row">
            <div
              className="col-md-8 offset-md-2 text-center"
              style={{ background: "#ffffff", borderRadius: "10px" }}
            >
              <div className="row mt-3">
                <div className="col-12">
                  <h3>
                    <b>Edit Food Truck</b>
                  </h3>
                </div>
              </div>
              <hr />
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row">
                    {checkloading ? (
                      <div className="col-12 mt-2 mb-2 text-center">
                        <div
                          className="spinner-grow text-primary fast ml-2"
                          role="status"
                        >
                          <span className="sr-only mt-2">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 mt-2 mb-2 text-center">
                        <form onSubmit={updateFoodTruck}>
                          <div className="row">
                            <div className="col-10 offset-1">
                              {alertError ? (
                                <MDBAlert color="danger">
                                  {errorMessage}
                                </MDBAlert>
                              ) : (
                                <div></div>
                              )}
                              {alertSuccess ? (
                                <MDBAlert color="success">
                                  {successMessage}
                                </MDBAlert>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div
                              className="col-10 offset-1"
                              style={{
                                backgroundImage: `url(${headerImagePreview})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100% 100%",
                                boxShadow:
                                  "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                                height: "200px",
                                borderRadius: "20px",
                              }}
                            >
                              <div className="form-group row mt-5">
                                <div className="col-md-8 offset-md-2 text-center">
                                  <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={onChangeFile}
                                  />
                                  <label htmlFor="file" style={imageFileStyle}>
                                    Edit food header image
                                    <span
                                      className="fa fa-download"
                                      style={{
                                        backgroundColor: "#39729b",
                                        color: "#ffffff",
                                        padding: "5px",
                                        borderRadius: "10px",
                                      }}
                                    ></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row  mt-3">
                            <div className="col-10 offset-1 col-md-5 mt-2">
                              <div className="row form-group text-left">
                                <div className="col-md-12">
                                  <label>Food Truck Title</label>
                                  <input
                                    type="text"
                                    defaultValue={foodTruck.title}
                                    className="form-control "
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="row form-group text-left">
                                <div className="col-md-12 mt-2">
                                  <label>Food Truck Location</label>
                                  <input
                                    type="text"
                                    defaultValue={foodTruck.address}
                                    placeholder="Upload Event location"
                                    className="form-control"
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6">
                              <div className="row form-group mt-2">
                                <div className="col-md-12 text-left">
                                  <label>Food Truck Description</label>
                                  <textarea
                                    className="form-control text-left"
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                    }}
                                    rows="3"
                                    defaultValue={foodTruck.information}
                                    onChange={(e) =>
                                      setInformation(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <div className="form-group row mt-2">
                            <div className="col-md-12 text-center mb-3">
                              <div>
                                <MDBBtn
                                  type="submit"
                                  color="blue"
                                  style={{ borderRadius: "20px" }}
                                  className="waves-effect z-depth-1a"
                                  size="md"
                                >
                                  Update Food Truck
                                  {loader ? (
                                    <div
                                      className="spinner-grow spinner-grow-sm ml-2"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </MDBBtn>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 mt-5 font-small text-center pb-3">
                  <div onClick={history.goBack} className="black-text">
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
