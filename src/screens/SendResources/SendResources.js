import React, {useState, useEffect} from "react";
// import { useParams } from 'react-router-dom';
import "./SendResources.css";
import {Container, Title, Form, Label, Submit, Input, Select, Option} from "../style"
import {getActiveDisasters, getIndividualDisaster} from "../../api/Disaster";
import {requestResponders} from "../../api/Order";
import { useParams } from 'react-router-dom';


export default function SendResources() {
  const { id } = useParams();
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(id || "");
  const [ambulances, setAmbulances] = useState("0");
  const [fire, setFire] = useState("0");
  const [police, setPolice] = useState("0");
  const [bus, setBus] = useState("0");
  const [helicopter, setHelicopter] = useState("0");
  const [evacuation, setEvacuation] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin") === "true"
  ); // check if the user is a coordinator on page load

  useEffect(() => {
    async function fetchData() {
      getActiveDisasters().then((response) => {
        // Process the response data here, if necessary
        const activeDisasters = response;
        console.log("Active disasters:", activeDisasters);
        setDisasters(activeDisasters);
      });
    }
    fetchData();
  }, []);

  const handleDropdownChange = async (event) => {
    if (event.target.value !== ""){
      const selectedDisasterID = event.target.value;
      setSelectedDisaster(event.target.value);
      const disasterInfo = await getIndividualDisaster(selectedDisasterID);
      console.log(disasterInfo);
      setAmbulances(disasterInfo.disasterData.ambulance ?? "0");
      setFire(disasterInfo.disasterData.fire ?? "0");
      setPolice(disasterInfo.disasterData.police ?? "0");
      setBus(disasterInfo.disasterData.bus ?? "0");
      setHelicopter(disasterInfo.disasterData.helicopter ?? "0");
      setEvacuation(false);
    }
  };
  const handleCheckboxChange = (event) => {
    setEvacuation(event.target.checked);
  };
  if (isCoordinator){
    return (
      <Container>
        <Title>Send Resources</Title>
        <Form>
          { selectedDisaster == "" &&
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Select Disaster:</Label>
            <Select
              id="disaster"
              value={selectedDisaster}
              onChange={handleDropdownChange}
              style={{
                color: "#a5a5a5",
              }}
            >
            <Option value="" disabled>Select a Options</Option>
            {disasters.map((disaster) => (
              <Option key={disaster._id} value={disaster._id}>
                {disaster.disasterName}
              </Option>
            ))}
            </Select>
          </div>
          }
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Number of Ambulances to send</Label>
            <Input 
              type="number"
              style={{ boxShadow: "none !important" }} 
              value={ambulances}
              onChange={(event) => setAmbulances(event.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Number of Fire Engines to send</Label>
            <Input 
              type="number"
              style={{ boxShadow: "none !important" }} 
              value={fire}
              onChange={(event) => setFire(event.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Number of Garda Units to send</Label>
            <Input 
              type="number" 
              style={{ boxShadow: "none !important" }} 
              value={police}
              onChange={(event) => setPolice(event.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Number of Helicopters to sent:</Label>
            <Input
              value={helicopter}
              onChange={(event) => setHelicopter(event.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection:"row", alignItems: "center" }}>
            <Label style={{ marginRight: "10px", textAlign: "left", width: "15rem" }}>Evacuation required:</Label>
            <input type="checkbox" checked={evacuation} onChange={handleCheckboxChange} />
          </div>

          {evacuation && (
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label>Number of Buses</Label>
            <Input
            type="number"
            value={bus}
            onChange={(event) => setBus(event.target.value)}
            />
          </div>
          )}
          <Submit type="submit" onClick={() => requestResponders("64298e50ab316b690c196dd9", ambulances, fire, police, helicopter, bus, evacuation)}/>
        </Form>
      </Container>
    );
  } else {
    return(
      <Container>
        <Title>ACCESS DENIED</Title>
      </Container>
    );
  }
}