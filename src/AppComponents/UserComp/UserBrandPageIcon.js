/*eslint-disable*/


import React from "react";
import { MDBIcon } from "mdbreact";

export default function UserBrandPageIcon(props) {
  // const circleIcon = {
  //     width: '95px',
  //     height: '95px',
  //     background: '#39729b',
  //     borderRadius: '50%',
  // }

  const circleIcon = {
    position: "relative",
    overflow: "hidden",
    marginTop: "1rem",
    backgroundColor: "#c0d5d8",
    height: 120,
    fontSize: "2rem",
    height: "120px",
  };
  const textStyle = {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#353535",
    textTransform: "uppercase",
  };

  const divStyle = {
    width: "170px",
    backgroundColor: "#ffffff",
    color: "#ffffff",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "10px",
  };

  return (
    <div style={divStyle}>
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
        ) : props.iconName === "cloud-download-alt" ? (
          <>
            <MDBIcon
              icon={`cloud-download-alt`}
              style={{ paddingTop: "20px", fontSize: "50px", color: "#ffffff" }}
            />
            <p style={textStyle}>{props.iconTitle}</p>
          </>
        ) : props.iconName === "luggage-cart" ? (
          <>
            <MDBIcon
              icon={`luggage-cart`}
              style={{ paddingTop: "20px", fontSize: "50px", color: "#ffffff" }}
            />
            <p style={textStyle}>{props.iconTitle}</p>
          </>
        ) : props.iconName==="strandorte" ? 
        <img src={`/images/icons/strandorte.png`} width="120" />
        : (
          <img src={`/images/icons/${props.iconName}.png`} width="120" />
        )}
      </div>
    </div>
  );
}
