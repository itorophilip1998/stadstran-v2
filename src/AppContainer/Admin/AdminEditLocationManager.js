import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBBtn
} from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Axios from "axios";

function AdminEditLocationManager(props) {
  console.log(props)
  const history = useHistory();
  const location = props.location.state.location;
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  const [headerImage, setHeaderImage] = useState("");
  const [headerImagePreview, setHeaderImagePreview] = useState(location.locationImagePath);
  const [latitude, setLatitude] = useState(location.lat);
  const [longitude, setLongitude] = useState(location.lng);
  const [locationName, setLocationName] = useState(location.name);
  const [locationAddress, setLocationAddress] = useState(location.address);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [locationStatus, setLocationStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [ setAlertError] = useState(false);
  const [ setErrorMessage] = useState("");
  const brandPageId = location.id;
  const adminId = location.Admin.id;
  const [oldImage] = useState("");
  
  const imageFileStyle = {
    padding: "10px",
    border: "1px solid #ffffff",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
    color: "#ffffff",
  };

  const mapStyles = {
    height: "200px",
    width: "100%",
  };


  const currentLocation = {
    lat: latitude,
    lng: longitude,
  };

  const onChangeFile = (e) => {
    setHeaderImage(e.target.files[0]);
    setHeaderImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (address) => {
    setLocationAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        //console.log(results);
        const formatedAddress = results[0].formatted_address;
        setFormattedAddress(formatedAddress);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        // console.log(latLng);
        setLongitude(latLng.lng);
        setLatitude(latLng.lat);
        setLocationStatus(true);
      })
      .catch((error) => console.error("Error", error));
  };


  const redirect = (adminId) => {
    window.location = `/admin/set-location/${adminId}`;
  };


  const updateLocation = async (e) => {
    e.preventDefault();
    setLoader(!loader);
    console.log(headerImage);

    let response;

    const dataLocationImage = new FormData();

    if (dataLocationImage) {
      dataLocationImage.append("image", headerImage);
      dataLocationImage.append("imageUrl", oldImage);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataLocationImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (e) {
        console.log(e.response);
      }
    }

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/${brandPageId}`,
      {
        name: locationName,
        address: formattedAddress,
        latitude: latitude,
        longitude: longitude,
        locationImagePath: response ? response.data.url : null,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setInterval(redirect(adminId), 3000);

      })
      .catch((e) => {
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <MDBContainer fluid className={AdminStyle.adminbody}>
      <AdminNavbar />
      <MDBContainer>
        <MDBRow>
          <MDBCol className={AdminStyle.cardAlignMiddle}>
            <MDBCard style={{ width: "30rem", borderRadius: "20px" }}>
              <MDBCardBody className="text-center mt-5">
                <MDBCardTitle cascade="true" className="text-center">
                  Edit Location ({location.name})
                </MDBCardTitle>
                <hr/>
                <div className="row mt-2">
                    <div className="col-12">
                        <form onSubmit={updateLocation}>
                            <div className="row">
                                    <div
                                    className="col-10 offset-1"
                                    style={{
                                        backgroundImage: `url(${headerImagePreview})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100% 100%",
                                        boxShadow:
                                        "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
                                        height: "200px",
                                        borderRadius: "20px",
                                    }}
                                    >
                                    <div className="form-group row mt-5">
                                        <div className="col-md-8 offset-md-2 text-center">
                                        <input
                                            type="file"
                                            id="file"
                                            style={{ display: "none" }}
                                            onChange={onChangeFile}
                                        />
                                        <label htmlFor="file" style={imageFileStyle}>
                                            Upload Location header image
                                            <span
                                            className="fa fa-download"
                                            style={{
                                                backgroundColor: "#39729b",
                                                color: "#ffffff",
                                                padding: "5px",
                                                borderRadius: "10px",
                                            }}
                                            >
                                            </span>
                                        </label>
                                        </div>
                                    </div>
                                    </div>
                            </div>

                            <div className="row form-group mt-2">
                                <div className="col-10 offset-1">
                                  <label>Location Name</label>
                                  <input
                                    type="text"
                                    defaultValue={locationName}
                                    className="form-control "
                                    style={{
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                    }}
                                    onChange={(e) => setLocationName(e.target.value)}
                                  />
                                </div>
                            </div>
                            <div className="form-group row mt-2">
                                <div className="col-md-10 offset-md-1">
                                    <label>Location Address</label>
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
                                            style={{ borderRadius: "20px",
                                            fontSize: "12px",}}
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

                            <div className="form-group row mt-2">
                                <div className="col-md-10 offset-md-1">
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
                                <div className="col-md-12 text-center mb-3">
                                    <div>
                                        <MDBBtn
                                        type="submit"
                                        color="blue"
                                        style={{ borderRadius: "20px" }}
                                        className="waves-effect z-depth-1a"
                                        size="md"
                                        >
                                        Update
                                        {loader ? (
                                            <div
                                            className="spinner-grow spinner-grow-sm ml-2"
                                            role="status"
                                            >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        </MDBBtn>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
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

export default AdminEditLocationManager;
