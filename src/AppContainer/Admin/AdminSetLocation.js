import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBAlert
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import Locations from "../../AppComponents/AdminComp/AdminLocationComponents/Locations";
import { useHistory } from "react-router-dom";
//import MapContainer from "../../AppComponents/MapContainer";
import Axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GoogleMap, Marker } from "@react-google-maps/api";

function AdminSetLocation(props) {
  const history = useHistory();
  const adminId = props.match.params.adminId;
  const token = localStorage.getItem("token");
  const [locationStatus, setLocationStatus] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationName, setlocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mapStyles = {
    height: "200px",
    width: "100%",
  };

  const currentLocation = {
    lat: latitude,
    lng: longitude,
  };

  const toggle = () => {
    setModal(!modal);
  };

  const imageFileStyle = {
    padding: "5px",
    border: "1px dotted #000000",
    width: "100%",
    borderRadius: "25px",
    textAlign: "center",
  };

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const createLocation = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const data = new FormData();
    data.append("image", image);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => {
      const url = response.data.url;

      Axios.post(
        "https://stadtstrandapi.ecrapps.website/api/v1/brandpage",
        {
          name: locationName,
          address: formattedAddress,
          latitude: latitude,
          longitude: longitude,
          adminId: adminId,
          locationImagePath: url,
        },
        {
          headers: {
            auth: token,
          },
        }
      )
        .then((response) => {
          setModal(!modal);
          window.location.reload();
        })
        .catch((e) => {
           Axios.delete(
                  "https://stadtstrandapi.ecrapps.website/api/v1/app/delete/image",
                  {
                    data: {
                      imageUrl: url,
                    },
                  }
                )
                  .then((response) => {
                    setLoader(false);
                  })
                  .catch((e) => {
                    console.log(e.response);
                  });
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        });
    })
    .catch((e) => {
        setLoader(false);
        setAlertError(true);
        setErrorMessage("Please provide location image");
      })
  };

  const handleChange = (address) => {
    setLocationAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        const formatedAddress = results[0].formatted_address;
        setFormattedAddress(formatedAddress);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        setLongitude(latLng.lng);
        setLatitude(latLng.lat);
        setLocationStatus(true);
      });
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  const iconStyle = {
    fontSize: "60px",
    color: "gray",
    marginTop: "5px",
    marginBottom: "5px",
  };

  return (
    <MDBContainer fluid className={AdminStyle.adminbody}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "30rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-2">
                <MDBCardTitle className="text-center">
                  Set your location
                </MDBCardTitle>
                <div>
                  <MDBIcon style={iconStyle} icon="map-marker-alt" />
                </div>
                
                <div className="text-center mb-2 mt-3">
                  <MDBBtn
                    type="button"
                    color="blue"
                    style={{ borderRadius: "20px" }}
                    className="waves-effect z-depth-1a"
                    size="md"
                    onClick={toggle}
                  >
                    Add Location
                  </MDBBtn>

                  <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalBody>
                      <h5 className="text-center">Add Location</h5>
                      <form onSubmit={createLocation}>
                      <div className="row">
                        <div className="col-10 offset-1">
                          {alertError ? (
                            <MDBAlert color="danger" dismiss>
                              {errorMessage}
                            </MDBAlert>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>

                        <div className="form-group row mt-3">
                          <div className="col-md-8 offset-md-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Location Name"
                              style={{ borderRadius: "15px" }}
                              onChange={(e) => {
                                setlocationName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group row mt-2">
                          <div className="col-md-8 offset-md-2">
                            <PlacesAutocomplete
                              value={locationAddress}
                              onChange={handleChange}
                              onSelect={handleSelect}
                            >
                              {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                              }) => (
                                <div>
                                  <input
                                    {...getInputProps({
                                      placeholder: "Search Places ...",
                                      className: "location-search-input",
                                    })}
                                    className="form-control"
                                    style={{ borderRadius: "15px" }}
                                  />
                                  <div className="autocomplete-dropdown-container">
                                    {loading && (
                                      <div
                                        className="spinner-grow text-primary"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                    )}

                                    {suggestions.map((suggestion) => {
                                      const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? {
                                            backgroundColor: "#fafafa",
                                            cursor: "pointer",
                                          }
                                        : {
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                          };
                                      return (
                                        <div
                                          {...getSuggestionItemProps(
                                            suggestion,
                                            {
                                              className,
                                              style,
                                            }
                                          )}
                                          key={suggestion}
                                        >
                                          <span
                                            style={{
                                              border: "1px solid #c2c2c2",
                                            }}
                                          >
                                            {suggestion.description}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </PlacesAutocomplete>
                          </div>
                        </div>

                        <div className="orm-group row mt-2">
                          <div className="col-md-8 offset-md-2">
                            {locationStatus ? (
                              <div>
                                <h6>{formattedAddress}</h6>
                                <GoogleMap
                                  mapContainerStyle={mapStyles}
                                  zoom={15}
                                  center={currentLocation}
                                >
                                  {
                                    <Marker position={currentLocation} />
                                    // locations.map(item => {
                                    // return (
                                    // <Marker key={item.name} position={item.location} />
                                    // )
                                    // })
                                  }
                                </GoogleMap>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row mt-2">
                          <div className="col-md-8 offset-md-2">
                            <input
                              type="file"
                              id="file"
                              style={{ display: "none" }}
                              onChange={onChangeFile}
                            />
                            <label htmlFor="file" style={imageFileStyle}>
                              <h6>Add location image </h6>
                              <MDBIcon
                                icon="cloud-download-alt"
                                style={{
                                  backgroundColor: "#39729b",
                                  color: "#ffffff",
                                  padding: "5px",
                                  borderRadius: "10px",
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {imagePreview ? (
                          <div className="row">
                            <div className="col-md-10 offset-md-1 text-center">
                              <img
                                src={imagePreview}
                                alt="img preview"
                                id={AdminStyle.imgBoxed}
                              />
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <div className="form-group row">
                          <div className="col-md-12 text-center mb-3">
                            {loader ? (
                              <div
                                className="spinner-border fast ml-2 mt-3"
                                role="status"
                              >
                                <span className="sr-only mt-2">Loading...</span>
                              </div>
                            ) : (
                              <div>
                                <MDBBtn
                                  type="submit"
                                  color="blue"
                                  style={{ borderRadius: "20px" }}
                                  className="waves-effect z-depth-1a"
                                  size="md"
                                >
                                  save
                                </MDBBtn>
                                <MDBBtn
                                  type="submit"
                                  color="white"
                                  style={{ borderRadius: "20px" }}
                                  className="waves-effect z-depth-1a"
                                  size="sm"
                                  onClick={toggle}
                                >
                                  Close
                                </MDBBtn>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    </MDBModalBody>
                  </MDBModal>
                </div>

                <div className="mt-2">
                  <Locations adminId={adminId} />
                </div>

                <div className="row mt-5 font-small text-center pb-3">
                  <div className="col-6 black-text " onClick={history.goBack}>
                    <MDBIcon icon="chevron-circle-left" /> Back
                  </div>
                  <div className="col-6 black-text " onClick={logout}>
                    Log out <MDBIcon icon="sign-out-alt" />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}

export default AdminSetLocation;
