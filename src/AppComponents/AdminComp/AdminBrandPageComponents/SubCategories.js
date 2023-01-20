import React from "react";
import { Link } from "react-router-dom";

import SubCategory from "./SubCategory";

export default function SubCategories(props) {
  let menuCategory = props.menuCat.map((subCat) => {
    return (
      <div className="col-6 col-md-4  mt-3" key={subCat.id}>
        <Link
          to={{
            pathname: `/admin/menu/${subCat.name}`,
            state: {
              subCatId: subCat.id,
              name: subCat.name,
            },
          }}
        >
          <SubCategory key={subCat.id} name={subCat.name} />
        </Link>
      </div>
    );
  });

  return <div className="row mt-3">{menuCategory}</div>;
}
