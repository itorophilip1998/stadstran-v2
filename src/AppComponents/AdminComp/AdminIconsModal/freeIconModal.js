import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import AdminStyle from "../../../AppStyles/AdminStyles.module.css";
import DeactivateButton from "../../DeactivateButton";
import Axios from "axios";
import NotificationStatus from "../AdminNotificationStatus";

export default function FreeIconModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [icon, setIcon] = useState("");
  const [iconPreview, setIconPreview] = useState("");
  const [freeIconImage, setFreeIconImage] = useState("");
  const [freeIconImagePreview, setFreeIconImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showIconBtn, setShowIconBtn] = useState(false);
  const [notification, setNotification] = useState(false);
  const [loaderSave, setLoaderSave] = useState(false);
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefreeicon/${brandPageId}`
    )
      .then((response) => {
        const BrandPage = response.data.data;
        if (response.data.data !== null) {
          setEditButton(true);
        }
        setIconPreview(BrandPage.iconUrl);
        setFreeIconImagePreview(BrandPage.attachmentUrl);
        setDescription(BrandPage.description);
        setTitle(BrandPage.title);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const imageFileStyle = {
    padding: "10px",
    border: "1px dotted #CCCCCC",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
  };

  const onChangeUploadIcon = (e) => {
    setIcon(e.target.files[0]);
    setIconPreview(URL.createObjectURL(e.target.files[0]));
    setShowIconBtn(true);
  };

  const onChangeBgHeaderFile = (e) => {
    setFreeIconImage(e.target.files[0]);
    setFreeIconImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadIcon = () => {
    setLoaderSave(!loaderSave);

    const dataIcon = new FormData();
    dataIcon.append("file", icon);
    dataIcon.append("upload_preset", "ecrtech");
    dataIcon.append("cloud_name", "ecrtechdev");

    Axios.post(
      "https://api.cloudinary.com/v1_1/ecrtechdev/image/upload",
      dataIcon,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        localStorage.setItem("iconUrl", response.data.url);
        setLoaderSave(false);
        setShowIconBtn(false);
      })
      .catch((e) => {
        setLoaderSave(false);
      });
  };

  const createFreeIcon = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const dataFreeImage = new FormData();
    dataFreeImage.append("file", freeIconImage);
    dataFreeImage.append("upload_preset", "ecrtech");
    dataFreeImage.append("cloud_name", "ecrtechdev");

    Axios.post(
      "https://api.cloudinary.com/v1_1/ecrtechdev/image/upload",
      dataFreeImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

      .then((response) => {
        const iconUrl = localStorage.getItem("iconUrl");

        Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpagefreeicon",
          {
            brandPageId: brandPageId,
            iconUrl: iconUrl,
            attachmentUrl: response.data.url,
            deactivate: deactivatePage,
            description: description,
            title: title,
          }
        )
          .then((response) => {
            setLoader(false);
            setAlertError(false);
            setNotification(true);
            setEditButton(true);
          })
          .catch((e) => {
            setAlertError(true);
            setErrorMessage(e.response.data.data);
            setLoader(false);
          });
      })
      .catch((err) => console.log(err));
  };

  const updateFreeIcon = async (e) => {
    e.preventDefault();
    setLoader(!loader);
    let response;

    const dataFreeImage = new FormData();

    if (freeIconImage) {
      dataFreeImage.append("file", freeIconImage);
      dataFreeImage.append("upload_preset", "ecrtech");
      dataFreeImage.append("cloud_name", "ecrtechdev");

      try {
        response = await Axios.post(
          "https://api.cloudinary.com/v1_1/ecrtechdev/image/upload",
          dataFreeImage,
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

    const iconUrl = localStorage.getItem("iconUrl");

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefreeicon/${brandPageId}`,
      {
        iconUrl: iconUrl,
        attachmentUrl: response ? response.data.url : null,
        deactivate: deactivatePage,
        description: description,
        title: title,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertError(false);
        setNotification(true);
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
      {notification ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Free Icon updated successfully"
        />
      ) : (
        <div></div>
      )}
      <MDBModalBody>
        <h5>
          <strong>Edit Free icon</strong>
        </h5>

        <div className="row mt-5">
          <div className="col-md-12">
            <form onSubmit={createFreeIcon}>
              <div className="row">
                <div className="col-10 offset-1">
                  {alertError ? (
                    <MDBAlert color="danger">{errorMessage}</MDBAlert>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-8 offset-md-2 text-center">
                  <input
                    type="file"
                    id="file"
                    style={{
                      display: "none",
                      borderRadius: "500px",
                    }}
                    onChange={onChangeUploadIcon}
                  />
                  <label
                    htmlFor="file"
                    style={{
                      backgroundImage: `url(${iconPreview})`,
                      boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      backgroundColor: "#39729b",
                      color: "#ffffff",
                      width: "95px",
                      height: "95px",
                      borderRadius: "50%",
                      padding: "20px",
                      textAlign: "center",
                      fontSize: "10px",
                    }}
                  >
                    <span
                      className="fa fa-download"
                      style={{
                        backgroundColor: "#39729b",
                        color: "#ffffff",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    ></span>{" "}
                    <br />
                    Upload icon
                  </label>
                </div>
              </div>

              <div>
                {showIconBtn ? (
                  <MDBBtn
                    type="button"
                    color="black"
                    style={{ borderRadius: "20px" }}
                    className="waves-effect z-depth-1a"
                    size="sm"
                    onClick={uploadIcon}
                  >
                    update Icon
                    {loaderSave ? (
                      <div
                        className="spinner-grow spinner-grow-sm ml-2"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </MDBBtn>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="form-group row mt-5">
                <div className="col-md-8 offset-md-2 text-center">
                  <input
                    type="file"
                    id="file2"
                    style={{ display: "none" }}
                    onChange={onChangeBgHeaderFile}
                  />
                  <label htmlFor="file2" style={imageFileStyle}>
                    Upload header image/video{" "}
                    <span
                      className="fa fa-download"
                      style={{
                        backgroundColor: "#39729b",
                        color: "#ffffff",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      {" "}
                    </span>
                  </label>
                </div>
              </div>

              {freeIconImagePreview ? (
                <div className="row">
                  <div className="col-md-10 offset-md-1 text-center">
                    <img
                      src={freeIconImagePreview}
                      alt="img preview"
                      id={AdminStyle.imgBoxed2}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div className="form-group row">
                <div className="col-md-8 offset-md-2 text-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Title"
                    defaultValue={title}
                    style={{ borderRadius: "10px" }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-10 offset-md-1 text-center">
                  <label>Free Icon Description</label>
                  <textarea
                    className="form-control"
                    style={{ border: "1px dotted #000000" }}
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
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
                {editButton ? (
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
                    onClick={updateFreeIcon}
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
                      <span></span>
                    )}
                  </MDBBtn>
                )}
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
