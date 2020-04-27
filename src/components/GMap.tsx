import React, { useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import GoogleMapStyles from "../theme/GoogleMap.styles";
import { StoreContext } from "../Store";

const center = { lat: 40.41678, lng: -3.70379 };

interface Props {
  locations: { id: number; lat: number; lng: number }[];
}

const GMap: React.FC<Props> = ({ locations }) => {
  const { dispatch } = useContext(StoreContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (loadError) {
    return (
      <div
        style={{
          height: 400,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#c9c9c9",
        }}
      >
        There was an error loading the map.
      </div>
    );
  }

  if (isLoaded) {
    return (
      <GoogleMap
        zoom={3}
        center={center}
        mapContainerStyle={{
          height: 400,
          width: "100%",
        }}
        options={{
          scrollwheel: false,
          styles: GoogleMapStyles,
          mapTypeControl: false,
          disableDoubleClickZoom: true,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
        }}
      >
        {locations?.map((location) => (
          <Marker
            key={location.id}
            position={location}
            icon={require("../icons/marker.png")}
            onClick={() =>
              dispatch({ type: "OPEN_EDIT_MODAL", payload: location.id })
            }
          />
        ))}
      </GoogleMap>
    );
  }

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(229, 227, 223)",
      }}
    >
      Loading...
    </div>
  );
};

export default GMap;
