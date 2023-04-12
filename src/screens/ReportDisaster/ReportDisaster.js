import React, { useState, useEffect, useContext } from "react";
import "./ReportDisaster.css";
import styled from "styled-components";
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import {addReport} from "../../api/reports";
const accessToken = "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ"

function getCurrentLoc(setLatitude, setLongitude) {
  if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(function(position) {

      console.log("Latitude is :", position.coords.latitude);
      setLatitude(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLongitude(position.coords.longitude);
      // document.getElementById('location').value = position.coords.latitude + ", " + position.coords.longitude;

      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${accessToken}`
        )
        .then((response) => {
          if (response.data.features.length > 0) {
            // setAddress(response.data.features[0].place_name);
            document.getElementById('location').value = response.data.features[0].place_name;

          } else {
            alert("No results found");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error retrieving data");
        });

    });

  } else {

    console.log("Not Available");

  }
} 

function getPosition(setLatitude, setLongitude) {
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
          setLatitude(response.data.features[0].center[1]);
          setLongitude(response.data.features[0].center[0])
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

export default function ReportDisaster() {
  const [type, setType] = useState("fire");
  const [details, setDetails] = useState("");
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const token = localStorage.getItem("token");
   // check if the user is authenticated on page load

  return (
    <Container>
      <Title>Report Disaster</Title>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Date & Time:</Label>
          <Input type="text" style={{ boxShadow: "none !important" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label for="disasterType">Select Disaster Type:</Label>
          <Select
            id="disasterType"
            value={type}
            onChange={(event) => setType(event.target.value)}
            style={{
              color: "#a5a5a5",
            }}
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
            onClick={() => getCurrentLoc(setLatitude, setLongitude)}
            // onValueChange={(itemValue) => setType(itemValue)} CHECK DATA OUTPUTS
            style={{ height: 22, width: 22, backgroundColor: "#e5e5e5", cursor: 'pointer'}}
          >
            <BiCurrentLocation size={22} color="black" />
            <div className="tooltip1">Find Current Loc</div>
          </div>
          
          <div
            className = "searchLoc"
            onClick={() => getPosition(setLatitude, setLongitude)}
            style={{ height: 22, width: 22, backgroundColor: "#e5e5e5", cursor: 'pointer', marginLeft: '5px'}}
          >
            <BiSearchAlt size={22} color="black" />
            <div class="tooltip2">Convert to Lat Long</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Description:</Label>
          <Input type="text" 
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
        <Submit type="submit" onClick={() => addReport(type, latitude, longitude, details, token)} />
      </Form>
    </Container>
  );
}
