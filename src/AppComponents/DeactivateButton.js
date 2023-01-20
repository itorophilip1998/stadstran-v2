import React from "react";

export default function DeactivateButton(props) {
  return (
    <div className="row mt-3 text-center">
      <div className="col-6 offset-1">
        <h5 className="mt-3 ml-4" style={{ textAlign: "left" }}>
          Deactive Page
        </h5>
      </div>
      <div className="col-3 mt-3">
        <div
          className="custom-control custom-switch"
          style={{ textAlign: "left" }}
        >
          <input
            type="checkbox"
            className="custom-control-input"
            id="deactivateSwitchesChecked"
            defaultChecked={props.deactivatePage}
            onChange={props.toggle}
          />
          <label
            className="custom-control-label"
            htmlFor="deactivateSwitchesChecked"
          ></label>
        </div>
      </div>
    </div>
  );
}
