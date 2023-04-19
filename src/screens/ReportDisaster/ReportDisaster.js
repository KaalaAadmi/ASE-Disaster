import React, { useState, useEffect } from "react";
import "./ReportDisaster.css";
import { Container, Title, Form, TextArea, Label, Submit, Input, Select, Option } from "../style"
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import { getCurrentLoc, getPosition, getAddressFromLatLng } from "../../components/Addresses"
import { addReport } from "../../api/Report";
import { typeOptions } from "../../components/DropdownOptions";
export default function ReportDisaster() {
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState([]);
  const token = localStorage.getItem("token");
  // check if the user is authenticated on page load
  const handleSubmit = async () => {
    await getPosition(address, setAddress, setLatitude, setLongitude);
    console.log(latitude);
    addReport(type, latitude, longitude, details, token);
    console.log("Submission Success")
  };

  useEffect(() => {
    getAddressFromLatLng(latitude, longitude, setAddress);
  }, [latitude, longitude]);

  return (
    <Container>
      <Title className="titleReportDisaster">Report Disaster</Title>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "20px"}}>
          <Label htmlFor="disasterType" className="sub-heading">Select Disaster Type:</Label>
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
            marginBottom: "20px"
          }}
        >
          <Label className="sub-heading">Location:</Label>
          <Input id="location" type="text" value={address}
            onChange={(event) => setAddress(event.target.value)} />
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
            onClick={() => getPosition(address, setAddress, setLatitude, setLongitude)}
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
        <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: 'center', marginBottom: "20px" }}>
          <Label className="sub-heading">Description:</Label>
          <TextArea
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
        <Submit
          type="submit"
          onClick={handleSubmit}
          value="Submit Report"
          className="submit-btn"
        />
      </Form>
    </Container>
  );
}
