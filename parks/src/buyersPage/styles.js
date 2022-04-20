import styled from "styled-components";

export const BuyersContainer = styled.div`
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
  width: 33.33%;
  height: 100%;
  overflow-y: scroll;
`;

export const BuyerMapContainer = styled.div`
  width: 66.66%;
  height: 100%;
  margin-top: 15px;
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

export const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const ButtonContainer = styled.div`
  align-self: flex-end;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  width: 120px;
  padding: 10px;
  font-size: 22px;
  background-color: indianred;
  color: white;
  border-radius: 10px;
  margin-right: 10px;
`;

export const BookNowButton = styled.button`
  width: 130px;
  padding: 10px;
  font-size: 22px;
  background-color: #327528;
  color: white;
  border-radius: 10px;
  margin-right: 10px;
`;

export const AddressListBoxContainer = styled.div`
  width: 90%;
  height: 100px;
  display: flex;
  flex-direction: column;
  border: 2px solid #1e43e2e8;
  padding: 5px;
  margin: 15px auto;
  border-radius: 10px;
`;

export const AddressLabel = styled.label`
  margin-right: 15px;
`;

export const ContinueBtn = styled.button`
  background-color: #327528;
  color: white;
  border-radius: 5px;
  padding: 3px;
  width: 90px;
`;

export const RateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Flex = styled.div`
  display: flex;
`;
