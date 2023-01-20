import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import CreateFoodTruck from "./createFoodTruckModal";
import Axios from "axios";

export default function FoodTruckIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [checkTruckStatus, setCheckTruckStatus] = useState(null);
  const [modalCreateFoodTruck, setModalCreateFoodTruck] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [brandPageFoodTruckId, setBrandPageFoodTruckId] = useState("");
  const [checkloading, setCheckLoading] = useState(true);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck/${brandPageId}`
    )
      .then((response) => {
        setCheckLoading(false);
        if (response.data.data == null) {
          setCheckTruckStatus(false);
        } else {
          setAlert(null);
          setCheckTruckStatus(true);
          setFoodTrucks(response.data.data.FoodTrucks);
          setDeactivatePage(response.data.data.deactivate);
          setBrandPageFoodTruckId(response.data.data.id);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  });

  const createBrandPageFoodTruck = () => {
    setLoader(!loader);
    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage,
      }
    )
      .then((response) => {
        console.log(response);
        setBrandPageFoodTruckId(response.data.data.id);
        setLoader(false);
        setCheckTruckStatus(true);
        setAlert(true);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const toogleCreateFoodTruck = () => {
    setModalCreateFoodTruck(!modalCreateFoodTruck);
  };

  const deleteFoodTruck = (foodtruckId) => {
    Axios.delete(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck/${foodtruckId}`
    )
      .then((response) => {
        setAlertSuccess(true);
        setSuccessMessage("Food Truck deleted successfully");
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const editFoodTruck = (foodtruckId) => {
    window.location = `/admin/edit-foodtruck/${foodtruckId}`;
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      <MDBModalBody>
        <div className="mt-1 font-small text-left">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
        <h6 className="mt-2">
          <strong>Food Trucks</strong>
        </h6>
        <hr />
        <div className="row">
          <div className="col-10 offset-1">
            {alertError ? (
              <MDBAlert color="danger">{errorMessage}</MDBAlert>
            ) : (
              <div></div>
            )}
            {alertSuccess ? (
              <MDBAlert color="info">{successMessage}</MDBAlert>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {checkloading ? (
          <div className="col-12 mt-2 mb-2">
            <div className="spinner-grow fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </div>
        ) : checkTruckStatus ? (
          <div className="row">
            <div className="col-12">
              <div className="form-group row">
                <div className="col-10 offset-1">
                  {alert ? (
                    <MDBAlert color="success">
                      <strong>Congratulation!</strong> your brand page food
                      truck tab has been created successfully. Let's get started
                      with creating your food trucks.
                    </MDBAlert>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
              <div className="form-group row mt-2">
                <div className="col-md-12 text-center">
                  <MDBBtn
                    type="button"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="sm"
                    onClick={toogleCreateFoodTruck}
                  >
                    Create Food Truck
                  </MDBBtn>
                </div>
              </div>
              
            </div>
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-md-12">
              <form>
                <div className="form-group row mt-2">
                  <div className="col-10 offset-1 text-center">
                    <h6>
                      <b>
                        Welcome to the Brand Page Food Truck customizer. Please
                        click on the button below to start setting up your food
                        trucks.
                      </b>
                    </h6>
                    <div>
                      {loader ? (
                        <MDBBtn
                          type="button"
                          color="#39729b"
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#39729b",
                            color: "#ffffff",
                          }}
                          className="waves-effect z-depth-1a mt-4"
                          size="md"
                          disabled
                        >
                          Your Food truck Page will be ready in a seconds
                          <div
                            className="spinner-grow spinner-grow-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </MDBBtn>
                      ) : (
                        <MDBBtn
                          type="button"
                          color="#39729b"
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#39729b",
                            color: "#ffffff",
                          }}
                          className="waves-effect z-depth-1a mt-4"
                          size="md"
                          onClick={createBrandPageFoodTruck}
                        >
                          Start Food truck customization
                        </MDBBtn>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row mt-3">
          {foodTrucks.length < 1 ? (
            <span></span>
          ) : (
            foodTrucks.map((foodtruck, index) => {
              return (
                <div
                  className="col-md-3 ml-2"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "20px",
                    background: `url(${foodtruck.imagePath}) no-repeat fixed center`,
                    opacity: "12",
                  }}
                  key={foodtruck.id}
                >
                  <div className="row mt-3" style={{ color: "#ffffff" }}>
                    <div className="col-md-12">
                      <MDBBtn
                        type="button"
                        color="#39729b"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                          padding: "5px",
                        }}
                        className="waves-effect z-depth-1a"
                        size="sm"
                        onClick={() => editFoodTruck(foodtruck.id)}
                      >
                        Edit
                      </MDBBtn>
                      <MDBBtn
                        type="button"
                        color="#39729b"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                          padding: "5px",
                        }}
                        className="waves-effect z-depth-1a"
                        size="sm"
                        onClick={() => deleteFoodTruck(foodtruck.id)}
                      >
                        Delete
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <CreateFoodTruck
          constName={modalCreateFoodTruck}
          functionName={toogleCreateFoodTruck}
          brandPageFoodTruckId={brandPageFoodTruckId}
          brandPageId={brandPageId}
        />

        <div className="row">
          <div className="col-12"> 
            <DeactivateButton
                    toggle={() => {
                      setDeactivatePage(!deactivatePage);
                    }}
                    deactivatePage={deactivatePage}
            />
          </div>
        </div>

        <div className="mt-5 font-small text-center pb-3">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
