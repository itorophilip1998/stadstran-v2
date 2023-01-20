import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function FoodTruckModel(props) {
  const brandPageId = props.pageDetails.id;
  const [foodTruckDetails, setFoodTruckDetails] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefoodtruck/${brandPageId}`
    )
      .then((response) => {
        setFoodTruckDetails(response.data.data.FoodTrucks);
        // setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const iconStyle = {
    borderRadius: "15px",
    width: "300px",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="md"
      centered
    >
      <MDBModalBody>
        <div className="row">
          <div className="col-2 text-left">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" />
            </div>
          </div>
          <div className="col-10 text-left">
            <h4 style={{ fontWeight: "400" }}> Available Food Trucks</h4>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-12 col-md-12 text-center">
            <div className="row">
              {foodTruckDetails.map((truckfood) => {
                return (
                  <div className="col-6 text-center mt-2" key={truckfood.id}>
                    <Link
                      to={{
                        pathname: `/food-truck/${truckfood.id}`,
                      }}
                    >
                      <div>
                        <img
                          src={truckfood.imagePath}
                          className="img-fluid"
                          style={iconStyle}
                          alt={truckfood.title}
                        />
                      </div>
                    </Link>
                    <div className="mt-2">
                      <b>{truckfood.title}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
