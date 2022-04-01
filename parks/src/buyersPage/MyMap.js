import React, { useRef, useEffect, useState } from "react";
import { MapSidebar, MapContainer } from "./styles";
import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
// import { MapContainer, TileLayer } from "react-leaflet";
// import { geosearch } from "esri-leaflet-geocoder";
// import L from "leaflet";
// import * as ELG from "esri-leaflet-geocoder";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
mapboxgl.accessToken = MAPBOX_TOKEN;

function MyMap() {
  // const position = [29.6436, -82.3549];

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-82.3549);
  const [lat, setLat] = useState(29.6436);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: true, // Do not use the default marker style
    });

    // map.addControl(geocoder);

    map.current.addControl(geocoder);

    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //   })
    // );

    // const marker = new mapboxgl.Marker() // initialize a new marker
    //   .setLngLat([-82.3549, 29.6436]) // Marker [lng, lat] coordinates
    //   .addTo(map);
  });

  useEffect(() => {
    if (map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    // <MapContainer ref={mapRef} className="map" center={position} zoom={20}>
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    // </MapContainer>
    <div style={{ position: "relative" }}>
      <MapSidebar id="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </MapSidebar>
      <MapContainer ref={mapContainer} />
    </div>
  );
}

export default MyMap;
