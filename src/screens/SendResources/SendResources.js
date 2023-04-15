import React, {useState, useEffect} from "react";
// import { useParams } from 'react-router-dom';
import "./SendResources.css";
import styled from "styled-components";
import {getActiveDisasters} from "../../api/Disaster";
import {requestResponders} from "../../api/Order";

export default function SendResources() {
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState("");
  const [ambulances, setAmbulances] = useState(0);
  const [fire, setFire] = useState(0);
  const [police, setPolice] = useState(0);
  const [bus, setBus] = useState(0);
  const [helicopter, setHelicopter] = useState(0);
  const [evacuation, setEvacuation] = useState(false);

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

  const handleDropdownChange = (event) => {
    setSelectedDisaster(event.target.value);
    setAmbulances(0);
    setFire(0);
    setPolice(0);
    setBus(0);
    setHelicopter(0);
    setEvacuation(false);
  };
  const handleCheckboxChange = (event) => {
    setEvacuation(event.target.checked);
  };
  return (
    <Container>
      <Title>Send Resources</Title>
      <Form>
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
          {disasters.map((disaster) => (
            <Option key={disaster._id} value={disaster._id}>
              {disaster.title}
            </Option>
          ))}
          </Select>
        </div>
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
}



const Container = styled.div`
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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