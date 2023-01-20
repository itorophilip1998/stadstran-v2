import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon } from "mdbreact";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";

export default function SingleFoodTruck(props) {
  const truckId = props.match.params.truckId;
  const brandPageId = localStorage.getItem("brandPageId");
  const [foodTruck, setFoodTruck] = useState({});

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck/foodtruck/${truckId}`
    )
      .then((response) => {
        setFoodTruck(response.data.data);
      })
      .catch((e) => {});
  }, [truckId]);

  const history = useHistory();

  return (
    <React.Fragment>
      <UserNavbar />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-6 offset-md-3 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            <div className="row">
              <div
                className="col-10 offset-1 text-left"
                style={{
                  backgroundImage: `url(${foodTruck.imagePath})`,
                  boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "150px",
                  borderRadius: "15px",
                }}
              >
                <div onClick={history.goBack} className="black-text">
                  <MDBIcon
                    className="mt-2"
                    style={{ fontSize: "25px", color: "#ffffff" }}
                    icon="chevron-circle-left"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 offset-1 mt-3 font-small text-left ">
                <h4 style={{ fontWeight: "500" }} className="mt-2">
                  {foodTruck.title}
                </h4>

                <p className="mt-3">
                  <u>
                    <a href="#!">DIRECTIONS</a>
                  </u>
                </p>
                <p>{foodTruck.address}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-10 offset-1 mt-3 font-small text-left ">
                <h5>Description</h5>
                <p className="mt-2">
                  <span style={{ fontSize: "12px" }}>
                    {foodTruck.information}
                  </span>
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 text-center">
                <div className="black-text">
                  <Link
                    to={{
                      pathname: `/user/form/${brandPageId}`,
                    }}
                  >
                    <MDBIcon
                      className="mt-2"
                      style={{ fontSize: "15px", color: "#000000" }}
                      icon="chevron-circle-left"
                    />
                    <span
                      className="ml-1"
                      style={{ fontSize: "15px", color: "#000000" }}
                    >
                      Back to Menu Icons
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
