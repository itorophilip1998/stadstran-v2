import React, { useEffect, useState } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon } from "mdbreact";
import AdminStyle from "../../../AppStyles/AdminStyles.module.css";
import NotificationStatus from "../AdminNotificationStatus";
import Axios from "axios";

export default function WelcomeModal(props) {
  //console.log(props.locationId);
  //const adminId = props.match.params.adminId;
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [imageWelcomePreview, setImageWelcomePreview] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [loader, setLoader] = useState(false);
  const brandPageId = props.locationId;
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagewelcome/${brandPageId}`
    )
      .then((response) => {
        const welcomeFile = response.data.data;
        setOldImage(welcomeFile.imagePath);
        setImageWelcomePreview(welcomeFile.imagePath);
        setWelcomeText(welcomeFile.welcomeText);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const imageFileStyle = {
    padding: "10px",
    border: "1px dotted #CCCCCC",
    marginLeft: "12px",
    width: "60%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
    backgroundColor: "#ffffff",
  };

  const welcomeChangeFile = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
    setImageWelcomePreview(URL.createObjectURL(e.target.files[0]));
  };

  const createWelcomePage = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const data = new FormData();
    data.append("image", image);
    data.append("imageUrl", oldImage);
    // data.append("cloud_name", "ecrtechdev");

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
        console.log(response);
        if (oldImage) {
          Axios.put(
            `https://stadtstrandapi.ecrapps.website/api/v1/brandpagewelcome/${brandPageId}`,
            {
              welcomeText: welcomeText,
              imagePath: url,
            }
          )
            .then((response) => {
              const welcomeFile = response.data.data;
              setImageWelcomePreview(welcomeFile.imagePath);
              setWelcomeText(welcomeFile.welcomeText);
              setNotificationStatus(true);
              setLoader(false);
            })
            .catch((e) => {
              console.log(e.response);
              setLoader(false);
            });
        } else {
          Axios.post(
            "https://stadtstrandapi.ecrapps.website/api/v1/brandpagewelcome",
            {
              brandPageId: brandPageId,
              welcomeText: welcomeText,
              imagePath: url,
            }
          )
            .then((response) => {
              const welcomeFile = response.data.data;
              setImageWelcomePreview(welcomeFile.imagePath);
              setWelcomeText(welcomeFile.welcomeText);
              setNotificationStatus(true);
              setLoader(false);
            })
            .catch((e) => {
              console.log(e.response);
              setLoader(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Admin Notification"
          notificationMessage="Welcome page updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h3>Welcome</h3>
        <form onSubmit={createWelcomePage}>
          {imageWelcomePreview ? (
            <div className="row">
              <div className="col-md-10 offset-md-1 text-center">
                <img
                  src={imageWelcomePreview}
                  alt="img preview"
                  id={AdminStyle.imgBoxed}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="form-group mt-5">
            <input
              type="file"
              className="form-control"
              id="file2"
              style={{ display: "none" }}
              onChange={welcomeChangeFile}
            />
            <label htmlFor="file2" style={imageFileStyle}>
              Add location image <br />
              <MDBIcon
                icon="cloud-download-alt"
                style={{
                  backgroundColor: "#39729b",
                  color: "#ffffff",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              />
            </label>
          </div>
          <div className="row form-group mt-4">
            <div className="col-md-10 offset-md-1 mt-4">
              <textarea
                className="form-control text-center"
                style={{ border: "1px dotted black", borderRadius: "10px" }}
                onChange={(e) => {
                  setWelcomeText(e.target.value);
                }}
                defaultValue={welcomeText}
                rows="5"
              ></textarea>
            </div>
          </div>

          {loader ? (
            <div className="spinner-border fast ml-2 mt-3" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          ) : (
            <div>
              <MDBBtn
                type="submit"
                color="blue"
                style={{ borderRadius: "20px" }}
                className="waves-effect z-depth-1a"
                size="md"
              >
                save
              </MDBBtn>
              <MDBBtn
                type="button"
                color="white"
                style={{ borderRadius: "20px" }}
                className="waves-effect z-depth-1a"
                size="sm"
                onClick={props.functionName}
              >
                Close
              </MDBBtn>
            </div>
          )}

          <div className="mt-5 font-small text-center pb-3">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" /> Back
            </div>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
