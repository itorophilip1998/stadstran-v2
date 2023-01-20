import React, { useState, useEffect } from "react";
import Location from "./Location";
import { MDBContainer, MDBRow } from "mdbreact";
import Axios from "axios";

function Locations(props) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/admin/${props.adminId}`
    )
      .then((response) => {
        const data = response.data.data;
        setLoading(false);
        setLocations(data);
      })
      .catch((e) => {
        setLocations([]);
      });
  }, [props.adminId]);

  return (
    <MDBContainer>
      <MDBRow style={{ alignItems: "center" }}>
        {loading ? (
          <div className="col-12 mt-2 mb-2">
            <div className="spinner-grow text-primary fast ml-2" role="status">
              <span className="sr-only mt-2">Loading...</span>
            </div>
          </div>
        ) : locations < 1 ? (
          <div className="col-12 mt-2 mb-2">
            <h2>No Location found</h2>
          </div>
        ) : (
          locations.map((location) => {
            return <Location key={location.id} location={location} />;
          })
        )}
      </MDBRow>
    </MDBContainer>
  );
}

export default Locations;
