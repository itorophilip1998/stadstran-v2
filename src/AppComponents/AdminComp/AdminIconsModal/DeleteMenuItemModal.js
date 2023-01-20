import React, { useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBBtn,
  MDBModalHeader,
  MDBModalFooter,
  MDBAlert,
} from "mdbreact";
import Axios from "axios";

export default function DeleteMenuItemModal(props) {
  const menuItem = props.menuItem;
  const menuCat = props.menuCat;
  const menuItemId = menuItem.id;
  const menuItemName = menuItem.name;
  const [loader, setLoader] = useState(false);
  const [responseAlert, setResponseAlert] = useState(false);
  const [itemImg] = useState(menuItem.imageUrl);
  console.log(menuItem.imageUrl);

  const redirectMenuPage = () => {
    window.location = `/admin/menu/${menuCat}`;
  };

  const deleteMenuItem = (menuItemId) => {
    setLoader(!loader);

    Axios.delete(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/menuitem/${menuItemId}`
    )
      .then((response) => {
        console.log(itemImg);

        Axios.delete(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/delete/image",
          {
            data: {
              imageUrl: itemImg,
            },
          }
        )
          .then((response) => {
            setResponseAlert(true);
            setLoader(false);
            setInterval(redirectMenuPage(), 2000);
          })
          .catch((e) => {
            console.log(e.response);
          });
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
      });
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      centered
      size="sm"
    >
      <MDBModalHeader toggle={props.functionName}>
        {menuItemName}
      </MDBModalHeader>
      <MDBModalBody>
        {responseAlert ? (
          <MDBAlert color="success">
            <div className="spinner-grow text-success fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </MDBAlert>
        ) : (
          <p> Are you sure you want to delete this Menu Item?</p>
        )}
      </MDBModalBody>
      <MDBModalFooter>
        {responseAlert ? (
          <span></span>
        ) : (
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
              onClick={() => deleteMenuItem(menuItemId)}
            >
              Delete
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
              type="submit"
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
        )}
      </MDBModalFooter>
    </MDBModal>
  );
}
