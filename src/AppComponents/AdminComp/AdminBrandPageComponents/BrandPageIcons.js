import React from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import AdminStyles from "../../../AppStyles/AdminStyles.module.css";

import BrandIcon from "./BrandIcon";

export default function BrandPageIcons(props) {
  let brandPageIcons = props.icons.map((brandicon) => {
    return (
      <MDBCol  size="6" md="2" className="mt-3" key={brandicon.id}>
        <div onClick={brandicon.iconToggle} className={AdminStyles.iconButton}>
          <BrandIcon
            key={brandicon.id}
            iconName={brandicon.iconName}
            iconTitle={brandicon.iconTitle}
          />
        </div>
      </MDBCol>
    );
  });

  return (
    <MDBContainer>
      <MDBRow>{brandPageIcons}</MDBRow>
    </MDBContainer>
  );
}
