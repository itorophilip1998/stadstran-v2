import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBFormInline } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UserStyles from "../../AppStyles/UserStyles.module.css";

export default function AllMenu(props) {
  const brandPageId = localStorage.getItem("brandPageId");
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/menuitems`
    )
      .then((response) => {
        console.log(response);
        setMenuList(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }, []);

  return (
    <React.Fragment>
      <UserNavbar />
      
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-8 offset-md-2 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            <div className="row">
              <div className="col-6 col-md-6 mt-2 font-small text-left ">
                <div
                  onClick={history.goBack}
                  className="black-text"
                  style={{ fontSize: "20px" }}
                >
                  <MDBIcon icon="chevron-circle-left" />
                  <span
                    className="ml-2"
                    style={{ fontSize: "20px", fontWeight: "500" }}
                  >
                    Back
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 col-md-12 mt-2 font-small text-center ">
                <div className="black-text" style={{ fontSize: "30px" }}>
                  <MDBIcon icon="clipboard-list" /> <br />
                  <span
                    className="ml-2"
                    style={{ fontSize: "25px", fontWeight: "500" }}
                  >
                    All Menu list
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12 pb-3">
                <MDBFormInline className="md-form">
                  <input
                    className="form-control ml-3 w-75 text-center"
                    type="text"
                    placeholder="Search for any drink"
                    aria-label="Search for any drink"
                  />
                  <MDBIcon icon="search" className="ml-2" />
                </MDBFormInline>
              </div>
            </div>

            <div className="col-12 col-md-11 offset-md-1 mt-1 mb-3">
              <div className="row">
                {loading ? (
                  <div className="col-12 mt-2 mb-2 text-center">
                    <div
                      className="spinner-grow text-primary fast ml-2"
                      role="status"
                    >
                      <span className="sr-only mt-2">Loading...</span>
                    </div>
                  </div>
                ) : (
                  menuList.map((menu) => {
                    return (
                      <div
                        className="col-5 col-md-3 ml-2 mt-1 mb-3"
                        key={menu.id}
                      >
                        <div className="row">
                          <Link
                            to={{
                              pathname: `/menu/${menu.MenuSubCategory.name}/${menu.name}`,
                              state: {
                                subMenudetail: menu,
                                brandPageId: brandPageId,
                              },
                            }}
                            id={UserStyles.drinkSubList}
                          >
                            <div className="col-12">
                              <img
                                src={menu.imageUrl}
                                alt="drink 1"
                                className="img-fluid"
                                id={UserStyles.imgBoxed}
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="row text-center mt-1">
                          <div
                            className="col-12"
                            style={{
                              fontSize: "11px",
                              fontWeight: "500",
                            }}
                          >
                            {menu.name} <br />???{menu.price}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
