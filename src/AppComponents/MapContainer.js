/*eslint-disable*/


import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const MapContainer = (props) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState();

  const onMapLoad = (map) => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );
  };

  const calculateRoute = useCallback(async () => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: currentLocation,
      destination: {
        lat: currentLocation?.lat + 0.2,
        lng: currentLocation?.lng + 0.2,
      },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirections(result);
  },[]);

  useEffect(() => {
    if (!props.showRoute) return;
    calculateRoute();
  }, [props.showRoute]);

  // const currentLocation = {
  //   lat: props.lat ?? 10,
  //   lng: props.log ?? 10,
  // };

  // const newLocation = {
  //   lat: props.lat ?? 13,
  //   lng: props.log ?? 13.5,
  // };

  // const locations = [
  //     {
  //       name: props.address,
  //       location: {
  //         lat: props.lat,
  //         lng: props.log
  //       },
  //     },
  //   ];

  // if (true) return <DirectionsRenderer mapContainerStyle={mapStyles} zoom={10} center={currentLocation} directions={directions} />
  return (
    <GoogleMap
      onLoad={onMapLoad}
      mapContainerStyle={mapStyles}
      directions={directions}
      zoom={10}
      center={currentLocation}
    >
      {
        <>
          <Marker position={currentLocation} />
          <Marker position={directions} />
          {!props.showRoute && <Marker position={directions} />}
          {props.showRoute && <DirectionsRenderer directions={directions} />}
          {/* <Marker position={currentLocation} /> */}
        </>
        // locations.map(item => {
        // return (
        // <Marker key={item.name} position={item.location} />
        // )
        // })
      }
    </GoogleMap>
  );
};

const mapStyles = {
  height: "300px",
  width: "100%",
};

export default MapContainer;
