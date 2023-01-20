import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import NotificationStatus from "../AdminNotificationStatus";
import Axios from "axios";

export default function ContactIconModal(props) {
  const brandPageId = props.locationId;

  const [deactivatePage, setDeactivatePage] = useState(true);
  const [strandort, setStrandort] = useState("");
  const [loaderImgOpener, setLoaderImgOpener] = useState(false);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [oldImage, setOldImage] = useState("");

  const imageFileStyle = {
    padding: "10px",
    border: "1px dotted #000000",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "20px",
    textAlign: "center",
    fontSize: "12px",
    color: "#000000",
    background: "#ffffff",
  };

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setLoaderImgOpener(false);
  };

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagestrandorte/${brandPageId}`
    )
      .then((response) => {
        const brandPageResponse = response.data.data;
        if (response.data.data !== null) {
          setEditButton(true);
        }
        //console.log(brandPageResponse);
        setDeactivatePage(response.data.data.deactivate);
        setStrandort(brandPageResponse);
        setImagePreview(brandPageResponse.imageUrl);
        setOldImage(brandPageResponse.imageUrl);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const createStrandorte = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const data = new FormData();
    data.append("image", image);

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
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpagestrandorte",
          {
            brandPageId: brandPageId,
            title: title,
            description: description,
            deactivate: deactivatePage,
            imageUrl: url,
          }
        )
          .then((response) => {
            setLoader(false);
            setAlertError(false);
            setNotificationStatus(true);
            setEditButton(true);
          })
          .catch((e) => {
            setLoader(false);
            setAlertError(true);
            setErrorMessage(e.response.data.data);
          });
      })
      .catch((err) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        console.log(err);
      });
  };

  const updateStrandortel = async (e) => {
    e.preventDefault();
    setLoader(!loader);

    let response;

    const dataStrandortelImage = new FormData();

    if (dataStrandortelImage) {
      dataStrandortelImage.append("image", image);
      dataStrandortelImage.append("imageUrl", oldImage);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataStrandortelImage,
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
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagestrandorte/${brandPageId}`,
      {
        title: title,
        description: description,
        deactivate: deactivatePage,
        imageUrl: response ? response.data.url : null,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
      })
      .catch((e) => {
        console.log(e.response);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      centered
      backdrop={false}
    >
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Strandorte details updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <form onSubmit={createStrandorte}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-10 offset-md-1"
              style={{
                background: `url("${imagePreview}") no-repeat`,
                boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                height: "200px",
                borderRadius: "20px",
                objectFit: "contain",
              }}
            >
              <div className="form-group row mt-4">
                <div className="col-md-6 offset-md-3 text-center ">
                  <input
                    type="text"
                    name="location_title"
                    className="form-control text-center"
                    style={{
                      background: "#ffffff",
                      border: "1px dotted #000000",
                      color: "#000000",
                      borderRadius: "20px",
                    }}
                    defaultValue={strandort.title}
                    placeholder="Location Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row mt-5">
                <div className="col-md-8 offset-md-2 text-center">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onClick={() => setLoaderImgOpener(true)}
                    onChange={(e) => onChangeFile(e)}
                  />
                  <label htmlFor="file" style={imageFileStyle}>
                    Upload image
                    <MDBIcon
                      icon="cloud-download-alt"
                      className="mt-2 ml-3"
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
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row form-group">
                <div className="col-md-8 offset-md-2">
                  <label htmlFor="exampleFormControlTextarea1">
                    Upload Location text
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    defaultValue={strandort.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <DeactivateButton
                toggle={() => {
                  setDeactivatePage(!deactivatePage);
                }}
                deactivatePage={deactivatePage}
              />

              <div className="mt-2">
                {strandort.length < 1 ? (
                  <MDBBtn
                    type="submit"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="md"
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
                ) : editButton ? (
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
                    onClick={updateStrandortel}
                  >
                    Update
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
                ) : (
                  <MDBBtn
                    type="submit"
                    color="#39729b"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                    }}
                    className="waves-effect z-depth-1a"
                    size="md"
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
                      <span>hello</span>
                    )}
                  </MDBBtn>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="mt-5 font-small text-center pb-3">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
