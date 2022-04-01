import styled from "styled-components";

export const BuyersContainer = styled.div`
  margin-top: 70px;
  display: "flex";
  flex-direction: "column";
  height: 100vh;
`;

export const BuyerDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const BuyerListContainer = styled.div`
  width: 30%;
  margin-right: 20px;
`;

export const BuyerMapContainer = styled.div`
  width: 70%;
  height: 100%;
`;

export const MapSidebar = styled.div`
  background-color: rgba(35, 55, 75, 0.9);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
`;

export const MapContainer = styled.div`
  height: 500px;
`;
