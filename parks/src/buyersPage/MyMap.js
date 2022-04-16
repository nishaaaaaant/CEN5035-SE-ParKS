import React, { useRef, useEffect, useState } from "react";
import { MapSidebar, MapContainer } from "./styles";
import { MAPBOX_TOKEN } from "../constants";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
mapboxgl.accessToken = MAPBOX_TOKEN;

export const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-82.35567926614124, 29.637935786805258],
      },
      properties: {
        phoneFormatted: "(202) 234-7336",
        phone: "2022347336",
        address: "11",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 15th St NW",
        postalCode: "20005",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-82.27658364702006, 29.686262167260267],
      },
      properties: {
        phoneFormatted: "(202) 234-7336",
        phone: "2022347336",
        address: "12",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 15th St NW",
        postalCode: "20005",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-82.30965671462707, 29.65370402486431],
      },
      properties: {
        phoneFormatted: "(202) 234-7336",
        phone: "2022347336",
        address: "13",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 15th St NW",
        postalCode: "20005",
        state: "D.C.",
      },
    },
  ],
};

const MyMap = (props) => {
  const { fetchMapRef } = props;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-82.30639245200598);
  const [lat, setLat] = useState(29.659109059602912);
  const [zoom, setZoom] = useState(12);

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
      map.current.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: geojson,
        },
      });
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(12));
    });

    map.current.on("click", (e) => {
      console.log(e.point);
      console.log(e.lngLat);
      addMarker(e);
    });

    // for (const feature of geojson.features) {
    //   // create a HTML element for each feature
    //   const el = document.createElement("div");
    //   el.className = "marker";
    //   el.style.backgroundImage = `url(https://img.icons8.com/fluency/48/000000/marker-a.png)`;
    //   el.style.width = `40px`;
    //   el.style.height = `40px`;
    //   el.style.backgroundSize = "100%";
    //   console.log(map);

    //   // make a marker for each feature and add it to the map
    //   new mapboxgl.Marker(el)
    //     .setLngLat(feature.geometry.coordinates)
    //     .addTo(map.current);
    // }
  });

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

  const flyToLocation = (location) => {
    map.current.flyTo({
      center: location.geometry.coordinates,
      zoom: 15,
    });
  };

  const displayPopup = (location) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(location.geometry.coordinates)
      .setHTML(`<h3>Location No:</h3><h4>${location.properties.address}</h4>`)
      .addTo(map.current);
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
