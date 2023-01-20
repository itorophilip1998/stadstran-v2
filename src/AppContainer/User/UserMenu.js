import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBFormInline } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UserStyles from "../../AppStyles/UserStyles.module.css";

export default function UserMenu(props) {
  console.log(props);
  const menuId = props.location.state.listState.id;
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [drinkSubList, setDrinkSubList] = useState([]);
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/categories/${menuId}`
    )
      .then((response) => {
        setDrinkSubList(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }, [menuId]);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    console.log("searchQuery", searchQuery)
    if (searchQuery === "" ) setIsSearching(false)
    setIsSearching(true)
     
  };

  const searchResult = drinkSubList.filter((drink) => {
    return (
      drink?.name
        .toLowerCase()
        .indexOf(searchQuery.toLowerCase()) > -1
    );
  });

  const MainData = isSearching ? searchResult : drinkSubList

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
                    {props.match.params.menulist} Menu list
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
                    onChange={(e) => {
                      handleSearch(e);
                    }}
                    onSubmit={(e) => e.preventDefault}
                  />
                  <MDBIcon icon="search" className="ml-2" />
                </MDBFormInline>
              </div>
            </div>

            {/* Drinks Catergory and subcatergoried */}

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
              MainData.map((subdrinklist) => {
                return (
                  <div className="container" key={subdrinklist.id}>
                    <div className="row mt-1">
                      <div className="col-8 text-left">
                        <h5>
                          <b>{subdrinklist.name}</b>
                        </h5>
                      </div>

                      <div className="col-4 text-right">
                        <span style={{ fontSize: "12px", fontWeight: "500" }}>
                          {/* SEE ALL <MDBIcon icon="ellipsis-v" /> */}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div
                          className="row"
                          style={{ paddingRight: "40px", paddingTop: "10px" }}
                        >
                          {subdrinklist.MenuItems.map((drinklist) => {
                            return (
                              <div
                                className="col-5 col-md-2 offset-1 mt-1 mb-3"
                                key={drinklist.id}
                              >
                                <div className="row">
                                  <Link
                                    to={{
                                      pathname: `/menu/${subdrinklist.name}/${drinklist.name}`,
                                      state: {
                                        subMenudetail: drinklist,
                                        brandPageId:
                                          props.location.state.listState
                                            .BrandPageMenu.brandPageId,
                                      },
                                    }}
                                    id={UserStyles.drinkSubList}
                                  >
                                    <div className="col-12">
                                      <img
                                        src={drinklist.imageUrl}
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
                                    {drinklist.name} <br />€{drinklist.price}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
