import React, {useState, useEffect} from "react";
import "./ActivateResponse.css";
import {Container, Title, Form, TextArea, Label, Submit, Input, Select, Option} from "../style"
import { typeOptions, siteOptions } from "../../components/DropdownOptions";
import {activateDisaster, getPendingDisasters, getIndividualDisaster} from "../../api/Disaster";
import { useParams, useNavigate } from 'react-router-dom';

export default function ActivateResponse() {
  const { id } = useParams();
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(id || "");
  const [type, setType] = useState("");
  const [site, setSite] = useState("");
  const [radius, setRadius] = useState("0");
  const [size, setSize] = useState("0");
  const [disasterName, setDisasterName] = useState("");
  const [disasterDetails, setDisasterDetails] = useState("");
  const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin") === "true"
  ); // check if the user is a coordinator on page load

  useEffect(() => {
    async function fetchData() {
      getPendingDisasters().then((response) => {
        // Process the response data here, if necessary
        const pendingDisasters = response;
        console.log("Pending disasters:", pendingDisasters);
        setDisasters(pendingDisasters);
      });
    }
    fetchData();
  }, []);

  const handleDropdownChange = async (event) => {
    if (event.target.value !== ""){
      setSelectedDisaster(event.target.value);
      const selectedDisasterId = event.target.value;
      console.log(`selected disaster: ${selectedDisasterId}`);
      const disasterInfo = await getIndividualDisaster(selectedDisasterId);
      console.log(disasterInfo);
    
      setType(disasterInfo.disasterData.type ?? "");
      setRadius(disasterInfo.disasterData.radius ?? "0");
      setSite(disasterInfo.disasterData.site ?? "");
      setSize(disasterInfo.disasterData.size ?? "0");
      setDisasterName(disasterInfo.disasterData.disasterName ?? "");
      setDisasterDetails(disasterInfo.disasterData.disasterDescription ?? "");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await activateDisaster(selectedDisaster, type, radius, size, site, disasterName, disasterDetails);
    navigate.push(`http://localhost:3000/send-resources/${selectedDisaster}`); // Replace '/path/to/redirect' with the desired path
  };
  
  if(isCoordinator){
    return (
      <Container>
        <Title>Activate A Disaster Response</Title>
        <Form>
          { selectedDisaster == "" &&
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Select Report Grouping:</Label>
            <Select
              id="disaster"
              value={selectedDisaster || ''}
              onChange={handleDropdownChange}
              style={{
                color: "#a5a5a5",
              }}
            >
            <Option value="" disabled>Select a Options</Option>
            {disasters.map((disaster) => (
              <Option key={disaster._id} value={disaster._id}>
                {disaster.title}
              </Option>
            ))}
            </Select>
          </div>
          }
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
          <Submit type="submit" onClick={handleSubmit}/>
        </Form>
      </Container>
    );
  } else {
    return(
      <Container>
        <title>ACCESS DENIED</title>
      </Container>
    );
  }
}