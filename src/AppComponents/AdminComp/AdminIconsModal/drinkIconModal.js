import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import NotificationStatus from "../AdminNotificationStatus";
import AdminStyle from "../../../AppStyles/AdminStyles.module.css";
import Axios from "axios";

export default function DrinkIconModal(props) {
  const brandPageId = props.locationId;

  const [loader, setLoader] = useState(false);
  const [loaderImgOpener, setLoaderImgOpener] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [drinkMenuImage, setDrinkMenuImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [drinkComponents, setDrinkComponents] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagedrinkmenu/${brandPageId}`
    )
      .then((response) => {
        const drinkResponse = response.data.data;
        setDrinkComponents(drinkResponse);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const onChangeFile = (e) => {
    setDrinkMenuImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setLoaderImgOpener(false);
  };

  const saveDrinkImage = () => {
    setLoader(!loader);
    const data = new FormData();
    data.append("image", drinkMenuImage);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        const url = response.data.url;

        Axios.post(
          `https://stadtstrandapi.ecrapps.website/api/v1/brandpagedrinkmenu`,
          {
            brandPageId: brandPageId,
            imageUrl: url,
          }
        )
          .then((response) => {
            Axios.get(
              `https://stadtstrandapi.ecrapps.website/api/v1/brandpagedrinkmenu/${brandPageId}`
            ).then((response) => {
              const drinkResponse = response.data.data;
              setDrinkComponents(drinkResponse);
            });
            setLoader(false);
            setNotificationStatus(true);
            setImagePreview("");
          })
          .catch((e) => {
            console.log(e.response);
            setLoader(false);
            setAlertError(true);
            setErrorMessage(e.response.data.data);
          });
      })
      .catch((err) => console.log(err));
  };

  const deleteDrink = (drinkId) => {
    console.log(drinkId);
    Axios.delete(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagedrinkmenu/${drinkId}`
    )
      .then((response) => {
        Axios.get(
          `https://stadtstrandapi.ecrapps.website/api/v1/brandpagedrinkmenu/${brandPageId}`
        ).then((response) => {
          const drinkResponse = response.data.data;
          setDrinkComponents(drinkResponse);
        });
        setAlertSuccess(true);
        setSuccessMessage("Drink Menu Deleted Successfully");
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const imageFileStyle = {
    padding: "10px",
    border: "1px dotted #CCCCCC",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Drink menu updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5>
          <strong>Upload Drink Menu </strong>
        </h5>
        <p>Upload Drink menu file. Images supported only</p>
        <hr />

        <div className="row mt-5">
          <div className="col-md-12">
            <form>
              {
                <div className="row mb-3">
                  {drinkComponents.map((drink) => {
                    return (
                      <div
                        className="col-md-4 text-center ml-2"
                        style={{
                          background: `url(${drink.imageUrl}) no-repeat fixed center`,
                          height: "150px",
                          width: "150px",
                          borderRadius: "20px",
                          color: "#ffffff",
                          objectFit: "scale-down",
                        }}
                        key={drink.id}
                      >
                        <MDBBtn
                          type="button"
                          color="#39729b"
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#39729b",
                            color: "#ffffff",
                          }}
                          className="waves-effect z-depth-1a mt-5"
                          size="sm"
                          onClick={() => deleteDrink(drink.id)}
                        >
                          Delete
                        </MDBBtn>
                      </div>
                    );
                  })}
                </div>
              }
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
              {imagePreview ? (
                <div className="row mb-3">
                  <div className="col-md-10 offset-md-1 text-center">
                    <img
                      src={imagePreview}
                      alt="img preview"
                      id={AdminStyle.imgBoxed}
                      accept="image/*"
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div className="form-group row">
                <div className="col-md-8 offset-md-2 text-center">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onClick={() => setLoaderImgOpener(true)}
                    onChange={(e) => onChangeFile(e)}
                  />
                  <label htmlFor="file" style={imageFileStyle}>
                    Upload menu image
                    <MDBIcon
                      className="ml-4"
                      icon="cloud-download-alt"
                      style={{
                        backgroundColor: "#39729b",
                        color: "#ffffff",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    />
                    {loaderImgOpener ? (
                      <div
                        className="spinner-grow text-primary ml-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-8 offset-md-2 text-center">
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
                    onClick={saveDrinkImage}
                  >
                    Save
                    {loader ? (
                      <div
                        className="spinner-border spinner-border-sm ml-3"
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
            </form>
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
