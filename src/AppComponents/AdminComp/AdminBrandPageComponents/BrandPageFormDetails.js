/*eslint-disable*/


import React, { useState, useEffect } from "react";
import AdminStyle from "../../../AppStyles/AdminStyles.module.css";
import { MDBBtn, MDBNotification, MDBIcon, MDBAlert } from "mdbreact";
import Axios from "axios";
import FileDownload from "js-file-download";

export default function BrandPageFormDetails(props) {
  const [brandPageImage, setBrandPageImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState();
  const [description, setDescription] = useState("");
  const [showLogoBtn, setShowLogoBtn] = useState(false);
  const [showEditFormBtn, setShowEditFormBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderSave, setLoaderSave] = useState(false);
  const [notification, setNotification] = useState(false);
  const brandPageId = props.locationId;
  const brandPageName = props.locationName;
  const [logoUrl, setLogoUrl] = useState("");
  const [brandPageImageUrl, setBrandPageImageUrl] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [oldLogo, setOldLogo] = useState("");
  const [oldImagePreview, setOldImagePreview] = useState("");
  const [generatedQrCode, setGeneratedQrCode] = useState(false)

  const iconStyle = {
    paddingTop: "0px",
    backgroundColor: "#39729b",
    color: "#ffffff",
    height: "70px",
    width: "70px",
    borderRadius: "50%",
    display: "inline-block",
    fontSize: "9px",
    textAlign: "center",
    cursor: "pointer",
  };

  const downloadQrCode = () => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/qrcode/${brandPageId}`,
      {
        responseType: "blob",
      }
    )
      .then((response) => {
        FileDownload(response.data, `${brandPageId}.png`);
        setGeneratedQrCode(true)
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/${brandPageId}`
    )
      .then((response) => {
        const BrandPage = response.data.data;
        if (response.status === 200) {
          setEditButton(true);
        }
        if (BrandPage.logoPath !== null) {
          setLogoPreview(BrandPage.logoPath);
          setOldLogo(BrandPage.logoPath);
        }

        if (BrandPage.description !== null) {
          setDescription(BrandPage.description);
        }

        if (BrandPage.brandPageImagePath !== null) {
          setImagePreview(BrandPage.brandPageImagePath);
          setOldImagePreview(BrandPage.brandPageImagePath);
        }
      })
      .catch((e) => {
        //console.log(e.response);
      });
  }, [brandPageId]);
  // console.log(brandPageName);

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

  const onChangeLogoFile = (e) => {
    setLogo(e.target.files[0]);
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
    setShowLogoBtn(true);
  };

  const viewBrandPage = () => {
    setShowEditFormBtn(!showEditFormBtn);
  };

  const onChangeFile = (e) => {
    setBrandPageImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadLogo = () => {
    setLoader(!loader);

    const dataLogo = new FormData();
    dataLogo.append("image", logo);
    dataLogo.append("imageUrl", oldLogo);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      dataLogo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        setLogoUrl(response.data.url);
        setLoader(false);
        setShowLogoBtn(false);
        setNotification(!notification);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
      });
  };

  const createBrandPage = () => {
    setLoaderSave(!loaderSave);

    const dataBPImage = new FormData();
    dataBPImage.append("image", brandPageImage);
    dataBPImage.append("imageUrl", oldImagePreview);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      dataBPImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

      .then((response) => {
        setBrandPageImageUrl(response.data.url);
        Axios.put(
          `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/manager/${brandPageId}`,
          {
            description: description,
            logoPath: logoUrl,
            brandPageImagePath: brandPageImageUrl,
          }
        )
          .then((response) => {
            setLoaderSave(false);
            setAlertError(false);
            setAlertSuccess(true);
            setSuccessMessage("Brand Page details saved successfully");
          })
          .catch((e) => {
            console.log(e.response);
            setLoaderSave(false);
            setAlertError(true);
            setErrorMessage(e.response.data.data);
          });
      })
      .catch((err) => console.log(err));
  };

  const updateBrandPage = async (e) => {
    e.preventDefault();
    setLoaderSave(true);
    let response;

    const dataImage = new FormData();

    if (brandPageImage) {
      dataImage.append("image", brandPageImage);
      dataImage.append("imageUrl", oldImagePreview);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataImage,
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
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/manager/${brandPageId}`,
      {
        description: description,
        logoPath: logoUrl,
        brandPageImagePath: response ? response.data.url : null,
      }
    )

      .then((response) => {
        setLoaderSave(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage("Brand Page details saved successfully");
      })
      .catch((e) => {
        console.log(e.response);
        setLoaderSave(false);
      });
  };

  return (
    <div className="row">
      {notification ? (
        <MDBNotification
          show
          fade
          iconClassName="text-primary"
          icon="camera"
          title="Brand Page Logo"
          message="Logo uploaded successfully"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        />
      ) : (
        <div></div>
      )}
      <div className="col-12">
        <div className="row form-group mt-2">
          <div className="col-12 text-center">
            <h2>
              <b>{brandPageName}</b>
            </h2>
          </div>
        </div>
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
        {showEditFormBtn ? (
          <form>
            <div>
              <input
                type="file"
                id="file1"
                className={AdminStyle.uploadDiv}
                onChange={(e) => onChangeLogoFile(e)}
              />
              <label
                htmlFor="file1"
                className={AdminStyle.imgInputStyle2}
                style={{
                  backgroundImage: `url(${logoPreview})`,
                  boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  borderRadius: "15px",
                  border: "2px solid #cccccc",
                }}
              >
                <MDBIcon icon="camera" /> <br />
                Select Location Logo
              </label>
            </div>
            <div>
              {showLogoBtn ? (
                <MDBBtn
                  type="button"
                  color="black"
                  style={{ borderRadius: "20px" }}
                  className="waves-effect z-depth-1a"
                  size="sm"
                  onClick={uploadLogo}
                >
                  update logo
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
              ) : (
                <div></div>
              )}
            </div>
            <div className="form-group row mt-4">
              <div className="col-md-8 offset-md-2">
                <textarea
                  placeholder="Enter text here"
                  style={{ border: "1px dotted black", borderRadius: "10px" }}
                  className="form-control text-center"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  defaultValue={description}
                ></textarea>
              </div>
            </div>
            {imagePreview ? (
              <div className="row">
                <div className="col-md-10 offset-md-1 text-center">
                  <img
                    src={imagePreview}
                    alt="img preview"
                    id={AdminStyle.imgBoxed}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className="form-group row mt-4">
              <div className="col-md-6 offset-md-3">
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={onChangeFile}
                />
                <label htmlFor="file" style={imageFileStyle}>
                  Add Brand Page Background image
                  <span
                    className="fa fa-download ml-3"
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

            <div className="row mt-4 mb-4">
              <div className="col-6 mt-3 ml-5 text-right">
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
                    onClick={updateBrandPage}
                  >
                    Update Brand Page
                    {loaderSave ? (
                      <div
                        className="spinner-grow spinner-grow-sm ml-2"
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
                    type="button"
                    color="blue"
                    style={{ borderRadius: "20px" }}
                    className="waves-effect z-depth-1a"
                    size="sm"
                    onClick={createBrandPage}
                  >
                    Save Brand Page
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
                )}
              </div>
              <div className="col-4 text-left">

                <div className="md-form my-0">
                  <span style={iconStyle} onClick={downloadQrCode}>
                   
                    <MDBIcon icon="cloud-download-alt" className="mt-4" />
                    <br />
                    Download
                    <br />
                    QR Code
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 text-center">
                <MDBBtn
                  type="button"
                  color="black"
                  style={{ borderRadius: "20px" }}
                  className="waves-effect z-depth-1a"
                  size="sm"
                  onClick={viewBrandPage}
                >
                  Minimize
                </MDBBtn>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div className="text-center">
              <div className="md-form my-0">
                {/* {
                      generatedQrCode &&
                      <>
                      Some text
                      <img src={`${brandPageId}.png`} alt="qr-code" width="300" />
                      </>
                    } */}
                <span style={iconStyle} onClick={downloadQrCode}>
                  <MDBIcon icon="cloud-download-alt" className="mt-4" />
                  <br />
                  Download
                  <br />
                  QR Code
                </span>
              </div>
            </div>
            <MDBBtn
              type="button"
              color="black"
              style={{ borderRadius: "20px" }}
              className="waves-effect z-depth-1a mt-3"
              size="sm"
              onClick={viewBrandPage}
            >
              Edit Brand Page Details
            </MDBBtn>
          </div>
        )}
      </div>
    </div>
  );
}
