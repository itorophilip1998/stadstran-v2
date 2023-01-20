import React, { useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBBtn,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBAlert,
} from "mdbreact";
import Axios from "axios";
import AdminStyle from "../../../AppStyles/AdminStyles.module.css";

export default function EditMenuItemModal(props) {
  const menuItem = props.menuItem;
  const menuCat = props.menuCat;
  const menuItemId = menuItem.id;
  const [loader, setLoader] = useState(false);
  const [menuItemName, setMenuItemName] = useState(menuItem.name);
  const [menuItemPrice, setMenuItemPrice] = useState(menuItem.price);
  const [menuItemDescription, setMenuItemDescription] = useState(
    menuItem.description
  );
  const [editItemImg, setEditItemImg] = useState("");
  const [editItemImgPreview, setEditItemImgPreview] = useState(
    menuItem.imageUrl
  );
  const [oldImage] = useState(menuItem.imageUrl);
  const [successMessage, setSuccessMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertError, setAlertError] = useState(false);

  const redirectMenuPage = () => {
    window.location = `/admin/menu/${menuCat}`;
  };

  const onChangeFileEdit = (e) => {
    setEditItemImg(e.target.files[0]);
    setEditItemImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const editMenuItem = async (e, menuItemId) => {
    e.preventDefault();
    setLoader(!loader);
    let response;

    const dataImage = new FormData();

    if (editItemImg) {
      dataImage.append("image", editItemImg);
      dataImage.append("imageUrl", oldImage);

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
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/menuitem/${menuItemId}`,
      {
        imageUrl: response ? response.data.url : null,
        description: menuItemDescription,
        price: menuItemPrice,
        name: menuItemName,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertSuccess(true);
        setSuccessMessage(`${menuItemName} updated successfully`);
        setInterval(redirectMenuPage(), 2000);
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
      size="md"
    >
      <MDBModalHeader toggle={props.functionName}>
        Edit {menuItemName}
      </MDBModalHeader>
      <form onSubmit={(e) => editMenuItem(e, menuItemId)}>
        <MDBModalBody>
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
          <div className="form-group row">
            <div className="col-12">
              <input
                type="file"
                id="file2"
                className={AdminStyle.uploadDiv}
                onChange={onChangeFileEdit}
              />
              <label
                htmlFor="file2"
                className={AdminStyle.imgInputStyle}
                style={{
                  backgroundImage: `url(${editItemImgPreview})`,
                  boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.0)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  color: "#000000",
                  padding: "5px",
                  borderRadius: "10px",
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
                  <b>Update item image now</b>
                </h6>
              </label>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-8 offset-2">
              <label>Item Name</label>
              <input
                defaultValue={menuItemName}
                type="text"
                className="form-control text-center"
                style={{
                  border: "1px solid #39729b",
                  borderRadius: "20px",
                }}
                onChange={(e) => setMenuItemName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-8 offset-2">
              <label>Item Price</label>
              <input
                defaultValue={menuItemPrice}
                type="text"
                className="form-control text-center"
                style={{
                  border: "1px solid #39729b",
                  borderRadius: "20px",
                }}
                onChange={(e) => setMenuItemPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-8 offset-2">
              <label>Item Description</label>
              <textarea
                className="form-control"
                defaultValue={menuItemDescription}
                style={{
                  border: "1px solid #39729b",
                  borderRadius: "20px",
                }}
                onChange={(e) => setMenuItemDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <div>
            <MDBBtn
              type="submit"
              color="#39729b"
              style={{
                borderRadius: "20px",
                backgroundColor: "#CC0000",
                color: "#ffffff",
              }}
              className="waves-effect z-depth-1a"
              size="sm"
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
            <MDBBtn
              type="button"
              color="#39729b"
              style={{
                borderRadius: "20px",
                backgroundColor: "#ffffff ",
                color: "#39729b",
              }}
              className="waves-effect z-depth-1a"
              size="sm"
              onClick={props.functionName}
            >
              Close
            </MDBBtn>
          </div>
        </MDBModalFooter>
      </form>
    </MDBModal>
  );
}
