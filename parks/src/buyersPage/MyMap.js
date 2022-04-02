import React, { useRef, useEffect, useState } from "react";
import { MapSidebar, MapContainer } from "./styles";
import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
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
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
    });

    map.current.addControl(geocoder);

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", (e) => {
      console.log(e.point);
      console.log(e.lngLat.wrap());
    });
  });

  return (
    <div style={{ position: "relative" }}>
      <MapSidebar id="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </MapSidebar>
      <MapContainer ref={mapContainer} />
    </div>
  );
}

export default MyMap;
