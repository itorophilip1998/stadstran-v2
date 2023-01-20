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

export default function DeleteBrandPageModal(props) {
    
   const location = props.location;
   const brandPageId = location.id;
   const [loader, setLoader] = useState(false);
   const [responseAlert, setResponseAlert] = useState(false);
   const [locationImg] = useState(location.locationImagePath);
   const adminId = location.Admin.id;


  const redirectMenuPage = () => {
   window.location = `/admin/set-location/${adminId}`;
  };

  
  const deleteBrandPage = (brandPageId) => {
    setLoader(!loader);

    Axios.delete(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/${brandPageId}`
    )
      .then((response) => {
        Axios.delete(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/delete/image",
          {
            data: {
              imageUrl: locationImg,
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
        {location.name}
      </MDBModalHeader>
      <MDBModalBody>
        {responseAlert ? (
          <MDBAlert color="success">
            <div className="spinner-grow text-success fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </MDBAlert>
        ) : (
          <p> Are you sure you want to delete this BrandPage location?</p>
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
              onClick={() => deleteBrandPage(brandPageId)}
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
