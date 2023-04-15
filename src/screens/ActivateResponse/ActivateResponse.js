import React, {useState, useEffect} from "react";
import "./ActivateResponse.css";
import styled from "styled-components";
import { typeOptions, siteOptions } from "../../components/DropdownOptions";
import {activateDisaster, getPendingDisasters, getIndividualDisaster} from "../../api/Disaster";

export default function CreateDisaster() {
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState("");
  const [type, setType] = useState("");
  const [site, setSite] = useState("");
  const [radius, setRadius] = useState("0");
  const [size, setSize] = useState("0");
  const [disasterName, setDisasterName] = useState("");
  const [disasterDetails, setDisasterDetails] = useState("");
  const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin") === true
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
  
  if(isCoordinator){
    return (
      <Container>
        <Title>Activate A Disaster Response</Title>
        <Form>
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
          <Submit type="submit" onClick={() => activateDisaster(selectedDisaster, type, radius, size, site, disasterName, disasterDetails)}/>
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