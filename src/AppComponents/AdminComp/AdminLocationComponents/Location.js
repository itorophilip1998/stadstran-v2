import React,{ useState } from "react";
import { Link } from "react-router-dom";
import {MDBIcon} from "mdbreact";
import DelModal from "../AdminIconsModal/DeleteBrandPageModal"

function Location(props) {

  const [modalDeleteBrandPage, setModalDeleteBrandPage] = useState(false);
 
  const locationimgstyle = {
    borderRadius: "15px",
    height: "100px",
    weight: "100%",
    objectFit: "cover",
  };

  const toogleDeleteBrandPage = () => {
    setModalDeleteBrandPage(!modalDeleteBrandPage);
  };

  return (
    <div className="col-6 col-md-6">
      
      <div className="row mt-5">
        <div className="col-12"> 
          <Link
          to={{
            pathname: `/admin/location/manager/${props.location.id}`,
            state: {
              location: props.location,
            },
          }}
          style={{ color: "black" }}
        >
          <div>
            <img
              className="img-fluid"
              style={locationimgstyle}
              src={props.location.locationImagePath}
              alt={props.location.name}
            />
          </div>
        </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12"> 
          <span style={{ fontSize: "14px", marginTop: "5px", textDecoration:"underline" }}>
              {props.location.name}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 offset-md-2"> 
         <Link
          to={{
            pathname: `/admin/edit/location/${props.location.id}`,
            state: {
              location: props.location,
            },
          }}
          style={{ color: "black" }}
        >
          <span style={{fontSize:"11px", cursor: "pointer"}}><MDBIcon far icon="edit" /> Edit </span>
          </Link>
        </div>
        <div className="col-12 col-md-5"> 
          <span onClick={() => toogleDeleteBrandPage()} style={{fontSize:"11px", cursor: "pointer",color:"red"}}><MDBIcon icon="trash" /> Delete </span>
        </div>
      </div>

      {props.location ? (
                <div>
                  <DelModal
                    constName={modalDeleteBrandPage}
                    functionName={toogleDeleteBrandPage}
                    location={props.location}
                  />
                </div>
              ) : (
                <div></div>
              )}

      {/* <div className="row">
        <div className="col-12"> 
          <p style={{ fontSize: "14px", marginTop: "5px" }}>
              {props.location.name}
          </p>
        </div>
      </div> */}
      
    </div>
  );
};

export default Location;
