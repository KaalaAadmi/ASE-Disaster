import React, { useState } from "react";
import "./ReportDisaster.css";
import {Container, Title, Form, TextArea, Label, Submit, Input, Select, Option} from "../style"
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { addReport } from "../../api/Report";
import { typeOptions } from "../../components/DropdownOptions";

const accessToken =
  "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

export default function ReportDisaster() {
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const token = localStorage.getItem("token");
  // check if the user is authenticated on page load

  const getCurrentLoc = (setLatitude, setLongitude) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLongitude(position.coords.longitude);
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${accessToken}`
          )
          .then((response) => {
            if (response.data.features.length > 0) {
              document.getElementById("location").value =
                response.data.features[0].place_name;
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
  };

  const getPosition = (setLatitude, setLongitude) => {
    const address = document.getElementById("location").value;
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`
      )
      .then((response) => {
        if (response.data.features.length > 0) {
          setLatitude(response.data.features[0].center[1]);
          setLongitude(response.data.features[0].center[0]);
        } else {
          alert("Location Not Found");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error retrieving data");
      });
  };
  return (
    <Container>
      <Title>Report Disaster</Title>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label htmlFor="disasterType">Select Disaster Type:</Label>
          <Select
            id="disasterType"
            value={type}
            onChange={(event) => setType(event.target.value)}
            style={{
              color: "#a5a5a5",
            }}
          >
            {typeOptions.map((item) => (
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
            className="currentLoc"
            onClick={() => getCurrentLoc(setLatitude, setLongitude)}
            // onValueChange={(itemValue) => setType(itemValue)} CHECK DATA OUTPUTS
            style={{
              height: 22,
              width: 22,
              backgroundColor: "#e5e5e5",
              cursor: "pointer",
            }}
          >
            <BiCurrentLocation size={22} color="black" />
            <div className="tooltip1">Find Current Loc</div>
          </div>
          <div
            className="searchLoc"
            onClick={() => getPosition(setLatitude, setLongitude)}
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
          <Label>Description:</Label>
          <TextArea
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
        <Submit
          type="submit"
          onClick={() => addReport(type, latitude, longitude, details, token)}
        />
      </Form>
    </Container>
  );
}
