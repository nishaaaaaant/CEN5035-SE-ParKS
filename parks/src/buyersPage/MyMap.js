import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function MyMap() {
  const position = [29.6436, -82.3549];
  return (
    <MapContainer
      className="map"
      center={position}
      zoom={20}
      style={{ height: 300, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMap;
