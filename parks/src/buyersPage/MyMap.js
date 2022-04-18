import React, { useRef, useEffect, useState } from "react";
import { MapSidebar, MapContainer } from "./styles";
import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
mapboxgl.accessToken = MAPBOX_TOKEN;

const MyMap = (props) => {
  const { fetchMapRef, isCalledFrom, getLngLat, features } = props;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-82.30639245200598);
  const [lat, setLat] = useState(29.659109059602912);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    fetchMapRef(map);

    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
    });

    map.current.addControl(geocoder);

    map.current.on("load", () => {
      /* Add the data to your map as a layer */
      map.current.addSource("places", {
        type: "geojson",
        data: features,
      });
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    if (isCalledFrom === "RENTER") {
      map.current.on("click", (e) => {
        const features = map.current.queryRenderedFeatures(e.point);
        console.log(features);
        console.log(e.point);
        console.log(e.lngLat);
        getLngLat(e.lngLat);
        addMarker(e);
      });
    }

    if (isCalledFrom === "BUYER") {
      for (const feature of features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(https://img.icons8.com/fluency/48/000000/marker-a.png)`;
        el.style.width = `40px`;
        el.style.height = `40px`;
        el.style.backgroundSize = "100%";
        console.log(map);

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.features.geometry.coordinates)
          .addTo(map.current);
      }
    }
  }, [features, fetchMapRef, getLngLat, isCalledFrom, lat, lng, zoom]);

  const addMarker = (event) => {
    // create a HTML element for each feature
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = `url(https://img.icons8.com/fluency/48/000000/marker-a.png)`;
    el.style.width = `40px`;
    el.style.height = `40px`;
    el.style.backgroundSize = "100%";

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el).setLngLat(event.lngLat).addTo(map.current);
  };

  return (
    <div style={{ position: "relative" }}>
      <MapSidebar id="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </MapSidebar>
      <MapContainer ref={mapContainer} />
    </div>
  );
};

export default MyMap;
