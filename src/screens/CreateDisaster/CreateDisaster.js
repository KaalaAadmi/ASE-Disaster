import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import "./CreateDisaster.css";
import styled from "styled-components";
import { typeOptions, siteOptions } from "../../components/DropdownOptions";
import {activateDisaster} from "../../api/Disaster";

export default function CreateDisaster() {
  const { id } = useParams();
  const [type, setType] = useState("fire");
  const [radius, setRadius] = useState(0);
  const [site, setSite] = useState("building");
  const [size, setSize] = useState(0);
  const [disasterName, setDisasterName] = useState("");
  const [disasterDetails, setDisasterDetails] = useState("");

  return (
    <Container>
      <Title>Create Disaster Record</Title>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label for="disasterType">Select Disaster Type:</Label>
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
              selected={item.selected}
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
            onChange={(event) => setRadius(event.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Number of People Impacted</Label>
          <Input 
            type="text" 
            style={{ boxShadow: "none !important" }} 
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label for="disasterSite">Select Disaster Site:</Label>
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
              selected={item.selected}
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
        <Submit type="submit" onClick={() => activateDisaster(id, type, radius, size, site, disasterName, disasterDetails)}/>
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