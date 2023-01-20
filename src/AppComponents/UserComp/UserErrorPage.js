import React from "react";

export const UserErrorPage = (props) => {
  return (
    <div className="row text-center" style={{ marginTop: "100px" }}>
      <div className="col-12">
        <img
          src="/images/others/StSt_logo.png"
          className="img-fluid"
          alt="logo"
          style={{ width: "80px" }}
        />
        <br />
        <img
          src="/images/others/oops_images.jpeg"
          className="img-fluid"
          alt="logo"
          style={{ width: "350px" }}
        />
        <h4 className="mt-3">{props.errorText}</h4>
      </div>
    </div>
  );
};
