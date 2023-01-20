import React, { useState } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import Axios from "axios";
import MultiImageInput from "react-multiple-image-input";

export default function CreateEventIconModal(props) {
  const brandPageEventId = props.brandPageEventId;
  const brandPageId = props.brandPageId;
  const [loader, setLoader] = useState(false);
  const [headerImage, setHeaderImage] = useState("");
  const [headerImagePreview, setHeaderImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [information, setInformation] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventImagesLinks, setEventImagesLinks] = useState([]);
  const [eventImages, setEventImages] = useState({});
  const [activateCountDown, setActivateCountDown] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const createEvent = async (e) => {
    e.preventDefault();
    setLoader(true);

    const eventImgs = [];
    for (let image in eventImages) {
      let url = await uploadToCloudinary(eventImages[image]);
      eventImgs.push(url);
      setEventImagesLinks(eventImgs);
    }

    const dataImage = new FormData();
    dataImage.append("image", headerImage);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      dataImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

      .then((response) => {
        Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpageevent/event",
          {
            brandPageEventId: brandPageEventId,
            headerImage: response.data.url,
            title: title,
            address: address,
            date: date,
            information: information,
            eventLink: eventLink,
            activateCountDown: activateCountDown,
            eventImages: eventImagesLinks,
          }
        )
          .then(() => {
            setLoader(false);
            setAlertError(false);
            setAlertSuccess(true);
            setSuccessMessage("Event created successfully");
            setInterval(function reload() {
              window.location = `/admin/brand-page/manager/${brandPageId}`;
            }, 3000);
          })
          .catch((e) => {
            setAlertError(true);
            setErrorMessage(e.response.data.data);
            setLoader(false);
          });
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  const setImage = (value) => {
    setEventImages(value);
  };

  const crop = {
    unit: "%",
    aspect: 4 / 3,
    width: "100",
  };

  const uploadToCloudinary = async (file) => {
    let returnedImgUrl = "";
    const dataImage = new FormData();
    dataImage.append("file", file);
    dataImage.append("upload_preset", "ecrtech");
    dataImage.append("cloud_name", "ecrtechdev");

    try {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/ecrtechdev/image/upload",
        dataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      returnedImgUrl = response.data.url;
    } catch (err) {
      console.log(err);
    }

    return returnedImgUrl;
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      centered
      size="lg"
    >
      <MDBModalBody>
        <h6 className="mt-2">
          <strong>Create Event</strong>
        </h6>
        <hr />
        <form onSubmit={createEvent}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
              {alertSuccess ? (
                <MDBAlert color="success">{successMessage}</MDBAlert>
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
                boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                height: "250px",
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
                    Upload event header image{" "}
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
            </div>
          </div>

          <div className="row  mt-3">
            <div className="col-6 mt-2">
              <div className="row form-group">
                <div className="col-md-12">
                  <input
                    type="text"
                    placeholder="Upload event title"
                    className="form-control text-center"
                    style={{ borderRadius: "20px", fontSize: "10px" }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-12 mt-2">
                  <input
                    type="text"
                    name=""
                    placeholder="Upload Event location"
                    className="form-control text-center"
                    style={{ borderRadius: "20px", fontSize: "12px" }}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-2">
                  <input
                    type="date"
                    placeholder="Date"
                    className="form-control text-center"
                    style={{ borderRadius: "20px", fontSize: "12px" }}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="row form-group mt-2">
                <div className="col-md-12 text-left">
                  <textarea
                    className="form-control text-left"
                    style={{ borderRadius: "10px", fontSize: "12px" }}
                    rows="3"
                    placeholder="Upload event information"
                    onChange={(e) => setInformation(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="row form-group mt-2">
                <div className="col-md-12 text-left">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter link"
                    style={{ borderRadius: "20px", fontSize: "12px" }}
                    onChange={(e) => setEventLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="row mt-2">
            <div className="col-md-12">
              <label>Upload Event Images</label>
              <MultiImageInput
                images={eventImages}
                setImages={setImage}
                theme={{
                  background: "#ffffff",
                  outlineColor: "#111111",
                  textColor: "rgba(255,255,255,0.6)",
                  buttonColor: "#ff0e1f",
                  modalColor: "#ffffff",
                }}
                cropConfig={{ crop, ruleOfThirds: true }}
              />
            </div>
          </div>
          <hr />

          <div className="row mt-2">
            <div className="col-md-12">
              <div className="custom-control custom-switch mt-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="eventCountSwitch"
                  onChange={() => {
                    setActivateCountDown(!activateCountDown);
                  }}
                />
                <label
                  className="custom-control-label"
                  htmlFor="eventCountSwitch"
                >
                  Activate event countdown
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
              {alertSuccess ? (
                <MDBAlert color="success">{successMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>

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
                  Save Event
                  {loader ? (
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
