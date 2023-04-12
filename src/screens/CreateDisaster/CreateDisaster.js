import React, {useState} from "react";
import "./CreateDisaster.css";
import styled from "styled-components";
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const accessToken = "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ"


function getPosition() {
  // console.log("Hello World")
  const address = document.getElementById("location").value;
  
  axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`
      )
      .then((response) => {
        if (response.data.features.length > 0) {
          console.log(response.data.features[0].center[1]);
          console.log(response.data.features[0].center[0]);

          // document.getElementById('location').value = response.data.features[0].center[1] + ", " + response.data.features[0].center[0];
        } else {
          alert("Location Not Found");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error retrieving data");
      });


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

export default function CreateDisaster() {
  const [type, setType] = useState("fire");
  const [radius, setRadius] = useState("");
  const [site, setSite] = useState([]);
  const [size, setSize] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  ); // check if the user is authenticated on page load

  return (
    <Container>
      <Title>Create Disaster</Title>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Radius</Label>
          <Input 
            type="text" 
            style={{ boxShadow: "none !important" }} 
            value={radius}
            onChange={(event) => setRadius(event.target.value)}
          />
        </div>
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
            <Option disabled selected value="">Select an option</Option>
            <Option value="fire">Fire</Option>
            <Option value="flood">Flood</Option>
            <Option value="traffic accident">Traffic Accident</Option>
            <Option value="accident">Accident</Option>
            <Option value="collapse">Collapse</Option>
            <Option value="terrorist activity">Terrorist Activity</Option>
            <Option value="explosion">Explosion</Option>
            <Option value="chemical hazard">Chemical Hazard</Option>
            <Option value="tornado">Tornado</Option>
            <Option value="earthquake">Earthquake</Option>
            <Option value="hurricane">Hurricane/Storm</Option>
            <Option value="wildfire">Wildfire</Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Label>Location:</Label>
          <Input id="location" type="text" />
          <div
            className = "currentLoc"
            style={{ height: 22, width: 22, backgroundColor: "#e5e5e5", cursor: 'pointer'}}
          >
            <BiCurrentLocation size={22} color="black" />
            <div className="tooltip1">Find Current Loc</div>
          </div>
          
          <div
            className = "searchLoc"
            style={{ height: 22, width: 22, backgroundColor: "#e5e5e5", cursor: 'pointer', marginLeft: '5px'}}
          >
            <BiSearchAlt size={22} color="black" />
            <div class="tooltip2">Convert to Lat Long</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Description:</Label>
          <Input type="text" />
        </div>
        <Submit type="submit" onClick={() => activateDisaster(id, type, radius, size, site)}/>
      </Form>
    </Container>
  );
}
