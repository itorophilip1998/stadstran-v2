import React from "react";
import { MDBNotification } from "mdbreact";

export default function UserNotificationStatus(props) {
  return (
    <MDBNotification
      show
      fade
      icon={props.notificationIcon}
      iconClassName="green-text"
      className="green-text"
      title="User Notification"
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
