import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import AdminStyle from "../../../AppStyles/AdminStyles.module.css";
import SubMenu from "../../AdminComp/AdminIconsModal/SubMenu";
import Axios from "axios";
//import NotificationStatus from "../AdminNotificationStatus";

export default function MenuModal(props) {
  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [checkMenuStatus, setCheckMenuStatus] = useState(null);
  const [loader, setLoader] = useState(false);
  const [menus, setMenus] = useState([]);
  const [brandPageMenuId, setBrandPageMenuId] = useState("");
  const [alert, setAlert] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [image, setImage] = useState("");
  const [imageMenuPreview, setImageMenuPreview] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalSubMenu, setModalSubMenu] = useState(false);
  const [menuId, setMenuId] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/${brandPageId}`
    )
      .then((response) => {
        setAlert(null);
        setCheckMenuStatus(true);
        setMenus(response.data.data.Menus);
        setDeactivatePage(response.data.data.deactivate);
        setBrandPageMenuId(response.data.data.id);
      })
      .catch((e) => {
        console.log(e.response);
      });

    // return () => {
    //   setMenus([]);
    //   setBrandPageMenuId("");
    // };
  });

  const tabStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "#39729b",
    color: "#ffffff",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    transform: "skew(185deg)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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

  const welcomeChangeFile = (e) => {
    setImage(e.target.files[0]);
    setImageMenuPreview(URL.createObjectURL(e.target.files[0]));
  };

  const createBrandPageMenu = () => {
    setLoader(!loader);
    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu",
      {
        brandPageId: brandPageId,
        deactivate: deactivatePage,
      }
    )
      .then((response) => {
        setLoader(false);
        setCheckMenuStatus(true);
        setAlert(true);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const createSingleMenu = () => {
    setLoader(!loader);

    const dataImage = new FormData();
    dataImage.append("image", image);

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
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/menu",
          {
            brandPageMenuId: brandPageMenuId,
            name: menuName,
            imageUrl: response.data.url,
          }
        )
          .then((response) => {
            Axios.get(
              `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/${brandPageId}`
            ).then((response) => {
              setMenus(response.data.data.Menus);
            });
            setAlertError(false);
            setLoader(false);
          })
          .catch((e) => {
            setAlertError(true);
            setErrorMessage(e.response.data.data);
            setLoader(false);
            setAlert(false);
          });
      })
      .catch((err) => {
        // setAlertError(true);
        // setErrorMessage("Please select an Image");
        setLoader(false);
        console.log(err.response);
      });
  };

  const toogleSubMenu = (id) => {
    setModalSubMenu(!modalSubMenu);
    setMenuId(id);
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      <MDBModalBody>
        <h5>
          <strong>Customize Menu</strong>
        </h5>
        <hr />
        <div className="row mt-3">
          {menus.length < 1 ? (
            <span></span>
          ) : (
            menus.map((menu, index) => {
              return (
                <div className="col-3 ml-3 mt-4" key={menu.id}>
                  <div style={tabStyle} onClick={() => toogleSubMenu(menu.id)}>
                    <h6
                      style={{
                        textAlign: "center",
                        padding: "35px 0px 5px 0px",
                        transform: "skew(170deg)",
                      }}
                    >
                      {menu.name}
                    </h6>
                  </div>

                  <SubMenu
                    constName={modalSubMenu}
                    functionName={toogleSubMenu}
                    menuId={menuId}
                    menuName={menu.name}
                  />
                </div>
              );
            })
          )}
        </div>

        {checkMenuStatus ? (
          <form>
            <div className="form-group row">
              <div className="col-10 offset-1">
                {alert ? (
                  <MDBAlert color="success">
                    <strong>Congratulation!</strong> your brand page menu has
                    been created successfully. Let's get started with creating
                    menus and adding menu items.
                  </MDBAlert>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-10 offset-1">
                {alertError ? (
                  <MDBAlert color="danger">{errorMessage}</MDBAlert>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="form-group row mt-2">
              <div className="col-md-8 offset-md-2 text-center">
                <input
                  type="text"
                  className="form-control text-center"
                  placeholder="Enter menu name"
                  style={{ borderRadius: "20px", border: "1px dotted black" }}
                  onChange={(e) => setMenuName(e.target.value)}
                />
              </div>
            </div>

            {imageMenuPreview ? (
              <div className="row">
                <div className="col-md-10 offset-md-1 text-center">
                  <img
                    src={imageMenuPreview}
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
                Add Menu image <br />
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

            <div className="mt-2">
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
                onClick={createSingleMenu}
              >
                Save menu
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

            <DeactivateButton
              toggle={() => {
                setDeactivatePage(!deactivatePage);
              }}
              deactivatePage={deactivatePage}
            />
          </form>
        ) : (
          <div className="row mt-3">
            <div className="col-md-12">
              <form>
                <div className="form-group row mt-2">
                  <div className="col-10 offset-1 text-center">
                    <h6>
                      <b>
                        Welcome to the Brand Page menu customizer. Please click
                        on the button below to start your set up.
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
                          Your Menu Page will be ready in a seconds
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
                          onClick={createBrandPageMenu}
                        >
                          Start Menu customization
                        </MDBBtn>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-5 font-small text-center pb-3">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
