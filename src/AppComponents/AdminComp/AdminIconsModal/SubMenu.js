import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import Axios from "axios";

import SubCategories from "../AdminBrandPageComponents/SubCategories";

export default function SubMenu(props) {
  const menuId = props.menuId;
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [loader, setLoader] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkloading, setCheckLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/categories/${menuId}`
    )
      .then((response) => {
        setCheckLoading(false);
        setCategories(response.data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [menuId]);

  const createSubScategory = (e) => {
    e.preventDefault();
    setLoader(true);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/category",
      {
        menuId: menuId,
        name: catName,
      }
    )
      .then((response) => {
        setCatName("");
        Axios.get(
          `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/categories/${menuId}`
        ).then((response) => {
          setCategories(response.data.data);
        });
        setAlertError(false);
        setLoader(false);
      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      <MDBModalBody>
        <h5>
          <strong>Sub Categories</strong>
        </h5>
        <hr />

        <div className="row mt-3">
          <div className="col-md-12">
            <form onSubmit={createSubScategory}>
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
                    type="text"
                    className="form-control"
                    placeholder="catergory name"
                    style={{
                      borderRadius: "20px",
                      border: "1px dotted #000000",
                    }}
                    onChange={(e) => setCatName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-8 offset-md-2 text-center">
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
                    Create
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
            </form>
          </div>
        </div>

        {checkloading ? (
          <div className="col-12 mt-2 mb-2">
            <div className="spinner-grow fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </div>
        ) : categories.length < 1 ? (
          <h4 style={{ color: "red" }}>
            {/* No categories for {props.menuName} Menu */}
            No Categories
          </h4>
        ) : (
          <SubCategories menuCat={categories} />
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
