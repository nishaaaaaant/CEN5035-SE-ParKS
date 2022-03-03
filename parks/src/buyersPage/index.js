import React, { lazy, Suspense } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const NavbarComponent = lazy(() => import("../common/navbar"));

const BuyersPage = () => {
  const position = [51.505, -0.09];

  const renderNavbar = () => {
    return (
      <Suspense fallback={""}>
        <NavbarComponent />
      </Suspense>
    );
  };

  const myMap = L.map("parksMap", {
    center: [37.7749, -122.4194],
    zoom: 13,
  });

  return (
    <div>
      {renderNavbar()}
      <div id="parksMap" style={{ width: "100vw", height: 500, marginTop: 70 }}>
        {/* <MapContainer center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
      </div>
    </div>
  );
};

export default React.memo(BuyersPage);
