import React from "react";
import { Link } from "react-router-dom";

const locationmanagertab = (props) => {
  const tabStyle = {
    width: "120px",
    height: "120px",
    backgroundColor: "#39729b",
    color: "#ffffff",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    transform: "skew(185deg)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginLeft: "8px",
  };
  return (
    <div className="col-6 col-md-6 mt-3">
      <Link
        to={{
          pathname: props.locationtablink,
          state: {
            location: props.location,
          },
        }}
      >
        <div style={tabStyle}>
          <h6
            style={{
              textAlign: "center",
              padding: "35px 0px 5px 0px",
              transform: "skew(170deg)",
            }}
          >
            {props.locationtabtitle}
          </h6>
        </div>
      </Link>
    </div>
  );
};

export default locationmanagertab;
