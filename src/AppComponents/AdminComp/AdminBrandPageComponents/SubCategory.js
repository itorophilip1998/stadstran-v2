import React from "react";
import AdminStyles from "../../../AppStyles/AdminStyles.module.css";

export default function SubCategory(props) {
  return (
    <div className={AdminStyles.subCatIcon}>
      <p>{props.name}</p>
    </div>
  );
}
