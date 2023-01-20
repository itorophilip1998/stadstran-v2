import React from "react";
import { MDBNotification } from "mdbreact";

export default function AdminNotificationStatus(props) {
  return (
    <MDBNotification
      show
      fade
      icon={props.notificationIcon}
      iconClassName="green-text"
      className="green-text"
      title={props.notificationTitle}
      message={props.notificationMessage}
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
      }}
    />
  );
}
