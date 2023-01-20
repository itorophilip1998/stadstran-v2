/*eslint-disable*/


import React from "react";
import { MDBIcon } from "mdbreact";

export default function BrandIcon(props) {
  const circleIcon = {
    position: "relative",
    overflow: "hidden",
    // marginTop: "1rem",
    backgroundColor: "#c0d5d8",
    height: 120,
    width: "100%",
    fontSize: "2rem",
  };

  const textStyle = {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#353535",
    textTransform: "uppercase",
  };

  return (
    <div style={circleIcon}>
      {props.iconName === "comment-alt" ? (
        <>
          <MDBIcon
            icon={`comment-alt`}
            style={{ paddingTop: "20px", fontSize: "50px", color: "#ffffff" }}
          />
          <p style={textStyle}>{props.iconTitle}</p>
        </>
      ) : props.iconName === "clipboard-list" ? (
        <>
          <MDBIcon
            icon={`clipboard-list`}
            style={{ paddingTop: "20px", fontSize: "50px", color: "#ffffff" }}
          />
          <p style={textStyle}>{props.iconTitle}</p>
        </>
      ) : props.iconName === "free" ? (
        <>
          <MDBIcon
            icon={`free`}
            style={{ paddingTop: "20px", fontSize: "50px", color: "#ffffff" }}
          />
          <p style={textStyle}>{props.iconTitle}</p>
        </>
      ) : props.iconName === "check" ? (
        <>
          <MDBIcon
            icon={`check`}
            style={{ paddingTop: "20px", fontSize: "50px", color: "#ffffff" }}
          />
          <p style={textStyle}>{props.iconTitle}</p>
        </>
      ) : (
        <img src={`/images/icons/${props.iconName}.png`} width="120" />
      )}
    </div>
  );
}
