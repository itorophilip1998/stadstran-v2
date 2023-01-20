import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import DelModal from "../../AppComponents/AdminComp/AdminIconsModal/DeleteMenuItemModal";
import EditModal from "../../AppComponents/AdminComp/AdminIconsModal/EditMenuItemModal";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function AdminMenuDrinkManager(props) {
  const menuSubCategoryId = props.location.state.subCatId;

  const history = useHistory();

  const [subItemName, setSubItemName] = useState("");
  const [subItemPrice, setSubItemPrice] = useState("");
  const [subItemQuantity, setSubItemQuantity] = useState("");

  const [description, setDescription] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemImgPreview, setItemImgPreview] = useState("");
  const [subMenuLists, setSubMenuLists] = useState([]);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [checkloading, setCheckLoading] = useState(true);
  const [modalDeleteItem, setModalDeleteItem] = useState(false);
  const [modalEditItem, setModalEditItem] = useState(false);
  const [menuItem, setMenuItem] = useState();

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/subCategory/menuitems/${menuSubCategoryId}`
    )
      .then((response) => {
        setSubMenuLists(response.data.data.MenuItems);
        localStorage.setItem("menuName", response.data.data.name);
        setCheckLoading(false);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [menuSubCategoryId]);

  const onChangeFile = (e) => {
    setItemImg(e.target.files[0]);
    setItemImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const redirectToLocation = () => {
    const menuName = localStorage.getItem("menuName");
    window.location = `/admin/menu/${menuName}`;
  };

  const createMenuItem = (e) => {
    e.preventDefault();
    setLoader(!loader);

    setAlertError(false);
    setErrorMessage("");

    const dataImage = new FormData();
    dataImage.append("image", itemImg);

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
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/menuitem",
          {
            menuSubCategoryId: menuSubCategoryId,
            name: subItemName,
            price: subItemPrice,
            qty: subItemQuantity,
            description: description,
            imageUrl: response.data.url,
          }
        )
          .then((response) => {
            Axios.get(
              `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/subCategory/menuitems/${menuSubCategoryId}`
            ).then((response) => {
              setSubMenuLists(response.data.data.MenuItems);
            });
            setLoader(false);
            setAlertSuccess(true);
            setSuccessMessage("Menu item created successfully");
            setInterval(redirectToLocation(), 2000);
          })
          .catch((e) => {
            setLoader(false);
            console.log(e.response);
            setAlertError(true);
            setErrorMessage(e.response.data.data);
          });
      })
      .catch((err) => {
        setAlertError(true);
        setErrorMessage("Please select an Image");
        setLoader(false);
        console.log(err.response);
      });
  };

  const toogleDeleteMenuItem = (menuItem) => {
    setModalDeleteItem(!modalDeleteItem);
    setMenuItem(menuItem);
  };

  const toogleEditMenuItem = (menuItem) => {
    setModalEditItem(!modalEditItem);
    setMenuItem(menuItem);
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
              className="col-md-10 offset-md-1 text-center"
              style={{ background: "#ffffff", borderRadius: "10px" }}
            >
              <div className="mt-3">
                <h3>
                  <b>{props.location.state.name}</b>
                </h3>
              </div>
              <hr />

              <div className="mt-3">
                <form onSubmit={createMenuItem}>
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
                  <div className="form-group row mt-5">
                    <div className="col-md-6">
                      <input
                        type="file"
                        id="file"
                        className={AdminStyle.uploadDiv}
                        onChange={onChangeFile}
                      />
                      <label
                        htmlFor="file"
                        className={AdminStyle.imgInputStyle}
                        style={{
                          backgroundImage: `url(${itemImgPreview})`,
                          boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.0)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                          color: "#000000",
                          padding: "5px",
                          borderRadius: "10px",
                          objectFit: "scale-down",
                        }}
                      >
                        <MDBIcon
                          icon="cloud-download-alt"
                          style={{
                            backgroundColor: "#39729b",
                            color: "#ffffff",
                            padding: "5px",
                            marginTop: "100px",
                            marginBottom: "5px",
                            borderRadius: "10px",
                          }}
                        />
                        <h6>
                          <b>Upload item image</b>
                        </h6>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <div className="row form-group">
                        <div className="col-md-12 mt-2">
                          <input
                            placeholder="Enter item name"
                            type="text"
                            className="form-control text-center"
                            style={{
                              border: "1px solid #39729b",
                              borderRadius: "20px",
                            }}
                            onChange={(e) => setSubItemName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mt-4">
                          <input
                            placeholder="Enter price"
                            type="number"
                            className="form-control text-center"
                            style={{
                              border: "1px solid #39729b",
                              borderRadius: "20px",
                            }}
                            onChange={(e) => setSubItemPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mt-4">
                          <input
                            placeholder="Quantity"
                            type="number"
                            className="form-control text-center"
                            style={{
                              border: "1px solid #39729b",
                              borderRadius: "20px",
                            }}
                            onChange={(e) => setSubItemQuantity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mt-4">
                          <textarea
                            className="form-control"
                            placeholder="Item Description"
                            style={{
                              border: "1px solid #39729b",
                              borderRadius: "20px",
                            }}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="row form-group mt-2">
                        <div className="col-md-12">
                          <MDBBtn
                            type="submit"
                            color="#39729b"
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#39729b",
                              color: "#ffffff",
                            }}
                            className="waves-effect z-depth-1a"
                            size="sm"
                          >
                            Create item
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
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-5">
                <div className="row" id={AdminStyle.scrolling_wrapper}>
                  {checkloading ? (
                    <div className="col-12 mt-2 mb-2">
                      <div className="spinner-grow fast ml-2" role="status">
                        <span className="sr-only mt-2">Loading...</span>
                      </div>
                    </div>
                  ) : subMenuLists.length < 1 ? (
                    <div className="col-12 text-center">
                      <h4 style={{ color: "red" }}>No menu item found</h4>
                    </div>
                  ) : (
                    subMenuLists.map((menulist) => {
                      return (
                        <div
                          key={menulist.id}
                          className="col-md-3"
                          id={AdminStyle.scroll_card}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "black",
                                cursor: "pointer",
                              }}
                              onClick={() => toogleEditMenuItem(menulist)}
                            >
                              <MDBIcon icon="edit" />
                              <span className="ml-2" style={{ color: "black" }}>
                                {" "}
                                Edit Item
                              </span>
                            </p>
                          </div>
                          <img
                            src={menulist.imageUrl}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "15px",
                              border: "1px #c2c2c2 solid",
                              padding: "5px",
                              objectFit: "scale-down",
                            }}
                            className="img-fluid"
                            alt="image1"
                          />
                          <h6 className="mt-2">
                            <b>{menulist.name}</b>
                          </h6>
                          <p style={{ fontSize: "12px" }}>€{menulist.price}</p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => toogleDeleteMenuItem(menulist)}
                          >
                            <MDBIcon icon="trash" />
                            <span className="ml-2" style={{ color: "black" }}>
                              {" "}
                              Delete Item
                            </span>
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {menuItem ? (
                <div>
                  <DelModal
                    constName={modalDeleteItem}
                    functionName={toogleDeleteMenuItem}
                    menuItem={menuItem}
                    menuCat={props.location.state.name}
                  />
                  <EditModal
                    constName={modalEditItem}
                    functionName={toogleEditMenuItem}
                    menuItem={menuItem}
                    menuCat={props.location.state.name}
                  />
                </div>
              ) : (
                <div></div>
              )}

              <div className="mt-5 font-small text-center pb-3">
                <div onClick={history.goBack} className="black-text">
                  <MDBIcon icon="chevron-circle-left" /> Back
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
