import React, { useState, useEffect } from "react";
import "./ActivateResponse.css";
import { Container, Title, Subtitle, Form, TextArea, Label, Submit, Input, Select, Option } from "../style"
import { typeOptions, siteOptions } from "../../components/DropdownOptions";
import { getAddressFromLatLng, getPosition } from "../../components/Addresses"
import {
  activateDisaster,
  getPendingDisasters,
  getIndividualDisaster,
} from "../../api/Disaster";
import Table from "../../components/Table";
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
  const [reports, setReports] = useState([]);
  const [address, setAddress] = useState("");
  const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin") === "true"
  ); // check if the user is a coordinator on page load

  const fetchData = async () => {
    getPendingDisasters().then((response) => {
      const pendingDisasters = response;
      setDisasters(pendingDisasters);
    });
    if (selectedDisaster) {
      const disasterInfo = await getIndividualDisaster(selectedDisaster);
      setSelectedDisaster(selectedDisaster);
      setType(disasterInfo.disasterData.type ?? "");
      setRadius(disasterInfo.disasterData.radius ?? "0");
      setSite(disasterInfo.disasterData.site ?? "");
      setSize(disasterInfo.disasterData.size ?? "0");
      console.log("reports ", disasterInfo.disasterData.reports)
      setReports(disasterInfo.disasterData.reports ?? []);
      setDisasterName(disasterInfo.disasterData.disasterName ?? "");
      setDisasterDetails(disasterInfo.disasterData.disasterDescription ?? "");
      getAddressFromLatLng(disasterInfo.disasterData.latitude, disasterInfo.disasterData.longitude, setAddress);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDisaster]);

  const handleDropdownChange = async (event) => {
    if (event.target.value !== "") {
      setSelectedDisaster(event.target.value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await activateDisaster(
      selectedDisaster,
      type,
      radius,
      size,
      site,
      disasterName,
      disasterDetails
    );
    navigate(`/send-resources/${selectedDisaster}`);
  };
  if (isCoordinator) {
    return (
      <Container>
        <Title style={{ marginBottom: "20px" }}>Activate A Disaster Response</Title>
        <Form>
          {selectedDisaster == "" &&
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Label>Select Report Grouping</Label>
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
                  <Option
                    key={disaster._id}
                    value={disaster._id}
                    style={{ color: "black" }}
                  >
                    {disaster.disasterName}
                  </Option>
                ))}
              </Select>
            </div>
          }
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Label htmlFor="disasterType">Select Disaster Type</Label>
            <Select
              id="disasterType"
              style={{
                color: "#a5a5a5",
              }}
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              {typeOptions.map((item) => (
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
            <Label htmlFor="disasterSite">Select Disaster Site</Label>
            <Select
              id="disasterSite"
              style={{
                color: "#a5a5a5",
              }}
              value={site}
              onChange={(event) => setSite(event.target.value)}
            >
              {siteOptions.map((item) => (
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
            <Input
              type="text"
              value={disasterName}
              onChange={(event) => setDisasterName(event.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
            <Label>Description</Label>
            <TextArea
              value={disasterDetails}
              onChange={(event) => setDisasterDetails(event.target.value)}
            />
          </div>
          <Submit type="submit" className="activate-response-btn" onClick={handleSubmit} value="Activate Response" />
        </Form>
        <div>
          {selectedDisaster !== "" &&
            <Subtitle>Related reports</Subtitle>
          }
          {selectedDisaster !== "" &&
            <Table data={reports} />
          }
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <title>ACCESS DENIED</title>
      </Container>
    );
  }
}