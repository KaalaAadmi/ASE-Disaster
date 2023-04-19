import React, {useState, useEffect} from "react";
import "./DisasterInformation.css";
import {Container, Title, Subtitle, Form, TextArea, Label, Submit, Input, Select, Option} from "../style"
import { typeOptions, siteOptions } from "../../components/DropdownOptions";
import {disasterOrders} from "../../api/Order";
import { getAddressFromLatLng, getPosition} from "../../components/Addresses"
import { BiSearchAlt } from "react-icons/bi";
import {activateDisaster, getAllDisasters, getIndividualDisaster} from "../../api/Disaster";
import Table from "../../components/Table";
import OrderTable from "../../components/OrderTable";
import { useParams } from 'react-router-dom';

export default function DisasterInformation() {
  const { id } = useParams();
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(id || "");
  const [type, setType] = useState("");
  const [site, setSite] = useState("");
  const [radius, setRadius] = useState("0");
  const [size, setSize] = useState("0");
  const [disasterName, setDisasterName] = useState("");
  const [disasterDetails, setDisasterDetails] = useState("");
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

  const fetchData = async () => {
    getAllDisasters().then((response) => {
      const allDisasters = response;
      console.log("All disasters:", allDisasters);
      setDisasters(allDisasters);
    });
    if (selectedDisaster) {
      const disasterInfo = await getIndividualDisaster(selectedDisaster);
      setSelectedDisaster(selectedDisaster);
      const currentOrders = await disasterOrders(selectedDisaster);
      setOrders(currentOrders);
      setEvacuation(disasterInfo.disasterData.evacuation ?? false);
      setType(disasterInfo.disasterData.type ?? "");
      setRadius(disasterInfo.disasterData.radius ?? "0");
      setSite(disasterInfo.disasterData.site ?? "");
      setSize(disasterInfo.disasterData.size ?? "0");
      setReports(disasterInfo.disasterData.reports ?? []);
      setStatus(disasterInfo.disasterData.status ?? "Active");
      setDisasterName(disasterInfo.disasterData.disasterName ?? "");
      setDisasterDetails(disasterInfo.disasterData.disasterDescription ?? "");
      setLatitude(disasterInfo.disasterData.latitude ?? "");
      setLongitude(disasterInfo.disasterData.longitude ?? "");
      getAddressFromLatLng(disasterInfo.disasterData.latitude,disasterInfo.disasterData.longitude, setAddress);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDisaster, latitude, longitude, address]);

  const getOptionBackgroundColor  = (disaster) => {
    const isActive = disaster.status === "active";
    return isActive ? "#b3e5d1" : "white";
  };  

  const getDropdownBackgroundColor = async(selectedDisaster) => {
    const disasterInfo = await getIndividualDisaster(selectedDisaster);
    const isActive = disasterInfo.disasterData.status === "active";
    return isActive ? "#b3e5d1" : "white";
  };  

  const handleCheckboxChange = (event) => {
    setEvacuation(event.target.checked);
  };
  const handleDropdownChange = async (event) => {
    if (event.target.value !== ""){
      setSelectedDisaster(event.target.value);
    }
  };  
  if(isCoordinator){
      return (
        <Container>
          <Title>Disaster Information</Title>
          <Form>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Select Report Grouping:</Label>
              <Select
                id="disaster"
                value={selectedDisaster || ""}
                onChange={handleDropdownChange}
                style={{
                  backgroundColor: getDropdownBackgroundColor(selectedDisaster),
                }}
              >
                <Option value="" disabled>
                  Select a Options
                </Option>
                {disasters.map((disaster) => (
                  <Option key={disaster._id} value={disaster._id} style={{background: getOptionBackgroundColor(disaster)}}>
                    {disaster.disasterName}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>ID</Label>
              <Input type="text" 
                value={selectedDisaster}
                readOnly
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Label>Address:</Label>
              <Input id="location" type="text" value={address}
                    onChange={(event) => setAddress(event.target.value)}/>
              <div
                className="searchLoc"
                onClick={() => getPosition(address, setLatitude, setLongitude)}
                style={{
                  height: 22,
                  width: 22,
                  backgroundColor: "#e5e5e5",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                <BiSearchAlt size={22} color="black" />
                <div class="tooltip2">Convert to Lat Long</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Latitude</Label>
              <Input type="number" 
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Longitude</Label>
              <Input type="number" 
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              />
            </div>
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
                type="number" 
                style={{ boxShadow: "none !important" }} 
                value={radius}
                placeholder="100"
                onChange={(event) => setRadius(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Number of People Impacted</Label>
              <Input 
                type="number" 
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
            <button type="submit" onClick={() => activateDisaster(selectedDisaster, type, radius, size, site, disasterName, disasterDetails)}>
            Save Information
            </button>
          </Form>
          <div>
            {selectedDisaster !== "" && 
              <Subtitle>Related reports</Subtitle> 
            }
            {selectedDisaster !== "" && 
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