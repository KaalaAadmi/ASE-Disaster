import React, {useState, useEffect} from "react";
import "./DisasterInformation.css";
import styled from "styled-components";
import { typeOptions, siteOptions } from "../../components/DropdownOptions";
import {disasterOrders} from "../../api/Order";
import {activateDisaster, getActiveDisasters, getIndividualDisaster} from "../../api/Disaster";
import axios from "axios";
import Table from "../../components/Table";
import OrderTable from "../../components/OrderTable";
import { useParams } from 'react-router-dom';

export default function DisasterInformation() {
  const { id } = useParams();
  const [disasterID, setID] = useState(id);
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState("");
  const [type, setType] = useState("");
  const [site, setSite] = useState("");
  const [radius, setRadius] = useState("0");
  const [size, setSize] = useState("0");
  const [disasterName, setDisasterName] = useState("");
  const [disasterDetails, setDisasterDetails] = useState("");
  const [ambulances, setAmbulances] = useState("0");
  const [fire, setFire] = useState("0");
  const [police, setPolice] = useState("0");
  const [bus, setBus] = useState("0");
  const [helicopter, setHelicopter] = useState("0");
  const [evacuation, setEvacuation] = useState(false);
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("active");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [isCoordinator, setIsCoordinator] = useState(
      localStorage.getItem("isAdmin") === "true"
  ); // check if the user is a coordinator on page load
  const accessToken =
  "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

  const getAddressFromLatLng = (latitude, longitude) => {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
    axios.get(apiUrl)
      .then((response) => {
        const features = response.data.features;
        if (features.length > 0) {
          const address = features[0].place_name;
          setAddress(address ?? "");
        } else {
          console.log('No address found');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('Error retrieving data');
      });
  };  

  const fetchData = async () => {
    if (id) {
      const disasterInfo = await getIndividualDisaster(id);
      setDisasters([]);
      setSelectedDisaster(id);
      setID(id);
      const currentOrders = await disasterOrders(id);
      setOrders(currentOrders);
      setEvacuation(disasterInfo.disasterData.evacuation ?? false);
      setType(disasterInfo.disasterData.type ?? "");
      setRadius(disasterInfo.disasterData.radius ?? "0");
      setSite(disasterInfo.disasterData.site ?? "");
      setSize(disasterInfo.disasterData.size ?? "0");
      console.log(disasterInfo.disasterData.reports ?? []);
      setReports(disasterInfo.disasterData.reports ?? []);
      setStatus(disasterInfo.disasterData.status ?? "Active");
      setDisasterName(disasterInfo.disasterData.disasterName ?? "");
      setDisasterDetails(disasterInfo.disasterData.disasterDescription ?? "");
      setLatitude(disasterInfo.disasterData.latitude ?? "");
      setLongitude(disasterInfo.disasterData.longitude ?? "");
      getAddressFromLatLng(disasterInfo.disasterData.latitude,disasterInfo.disasterData.longitude);
    } else {
      getActiveDisasters().then((response) => {
        const activeDisasters = response;
        console.log("Active disasters:", activeDisasters);
        setDisasters(activeDisasters);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    setEvacuation(event.target.checked);
  };
  const handleDropdownChange = async (event) => {
    if (event.target.value !== ""){
      const selectedDisasterID = event.target.value;
      setSelectedDisaster(event.target.value);
      const disasterInfo = await getIndividualDisaster(selectedDisasterID);
      console.log(disasterInfo);
      setID(selectedDisasterID);
      setEvacuation(false);
      const currentOrders = await disasterOrders(selectedDisasterID);
      console.log(`Orders:${currentOrders}`);
      setOrders(currentOrders);
      setType(disasterInfo.disasterData.type ?? "");
      setRadius(disasterInfo.disasterData.radius ?? "0");
      setSite(disasterInfo.disasterData.site ?? "");
      setSize(disasterInfo.disasterData.size ?? "0");
      console.log(disasterInfo.disasterData.reports ?? []);
      setReports(disasterInfo.disasterData.reports ?? []);
      setStatus(disasterInfo.disasterData.status ?? "Active");
      setDisasterName(disasterInfo.disasterData.disasterName ?? "");
      setDisasterDetails(disasterInfo.disasterData.disasterDescription ?? "");
      setLatitude(disasterInfo.disasterData.latitude ?? "");
      setLongitude(disasterInfo.disasterData.longitude ?? "");
      getAddressFromLatLng(disasterInfo.disasterData.latitude,disasterInfo.disasterData.longitude);
    }
  };  
  if(isCoordinator){
    console.log(orders);
      return (
        <Container>
          <Title>Disaster Information</Title>
          {!id && (
            <Form>
              <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <Label>Select Report Grouping:</Label>
                <Select
                  id="disaster"
                  value={selectedDisaster || ""}
                  onChange={handleDropdownChange}
                  style={{
                    color: "#a5a5a5",
                  }}
                >
                  <Option value="" disabled>
                    Select a Options
                  </Option>
                  {disasters.map((disaster) => (
                    <Option key={disaster._id} value={disaster._id}>
                      {disaster.disasterName}
                    </Option>
                  ))}
                </Select>
              </div>
            </Form>
          )}
          {disasterID && <div>ID: {disasterID}</div>}
          {address && <div>Address: {address}</div>}
          {latitude && <div> Latitude: {latitude}</div>}
          {longitude && <div> Longitude: {longitude}</div>}
          <Form>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Name</Label>
              <Input type="text" 
                value={disasterName}
                onChange={(event) => setDisasterName(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Description</Label>
              <TextArea
                value={disasterDetails}
                onChange={(event) => setDisasterDetails(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Status:</Label>
              <Select
                style={{
                  color: "#a5a5a5",
                }}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
              <Option value="active" label="Active"></Option>
              <Option value="resolved" label="Resolved"></Option>
              </Select>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label htmlFor="disasterType">Select Disaster Type:</Label>
              <Select
                id="disasterType"
                style={{
                  color: "#a5a5a5",
                }}
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                {typeOptions.map(item => (
                  <Option
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Radius Impacted (in meters)</Label>
              <Input 
                type="text" 
                style={{ boxShadow: "none !important" }} 
                value={radius}
                placeholder="100"
                onChange={(event) => setRadius(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Number of People Impacted</Label>
              <Input 
                type="text" 
                style={{ boxShadow: "none !important" }} 
                value={size}
                placeholder="10"
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label htmlFor="disasterSite">Select Disaster Site:</Label>
              <Select
                id="disasterSite"
                style={{
                  color: "#a5a5a5",
                }}
                value={site}
                onChange={(event) => setSite(event.target.value)}
              >
                {siteOptions.map(item => (
                  <option
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>
            <div style={{ display: "flex", flexDirection:"row", alignItems: "center" }}>
              <Label style={{ marginRight: "10px", textAlign: "left", width: "15rem" }}>Evacuation required:</Label>
              <input type="checkbox" checked={evacuation} onChange={handleCheckboxChange} />
            </div>
            <Submit type="submit" onClick={() => activateDisaster(selectedDisaster, type, radius, size, site, disasterName, disasterDetails)}/>
          </Form>
          <div>
            {selectedDisaster !== "" && 
              <Subtitle>Related reports</Subtitle> &&
              <Table data={reports} />
            }
          </div>
          <div>
            {orders.length !== 0 && 
              <Subtitle>Requested Resources</Subtitle> &&
              <OrderTable data={orders}
            />}
          </div>
        </Container>
    );
  }else{
    return(
      <Container>
        <Title>Access Denied</Title>
      </Container>
    );
  }
}



const Container = styled.div`
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Subtitle = styled.div`
  color: #e5e5e5;
  font-size: 2rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  // align-items:center;
`;
const Title = styled.div`
  color: #e5e5e5;
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  // align-items:center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const TextArea = styled.textarea`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-botom: 10px solid violet;
  width: 20rem;
  color: #a5a5a5;
  resize: vertical;
`;
const Label = styled.label`
  margin-right: 10px;
  text-align: left;
  width: 15rem;
`;
const Submit = styled.input`
  background-color: #5a69b5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;
const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-botom: 10px solid violet;
  width: 20rem;
  color: #a5a5a5;
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-botom: 10px solid violet;
  width: 20rem;
  color: "#a5a5a5";
`;

const Option = styled.option`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-botom: 10px solid violet;
  width: 20rem;
`;