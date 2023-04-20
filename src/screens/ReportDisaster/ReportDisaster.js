import React, { useState, useEffect } from "react";
import "./ReportDisaster.css";
import {
  Container,
  Title,
  Form,
  TextArea,
  Label,
  Submit,
  Input,
  Select,
  Option,
} from "../style";
import { BiCurrentLocation, BiSearchAlt } from "react-icons/bi";
import {
  getCurrentLoc,
  getPosition,
  getAddressFromLatLng,
} from "../../components/Addresses";
import { addReport } from "../../api/Report";
import { typeOptions } from "../../components/DropdownOptions";
import { ToastContainer, toast } from 'react-toastify';

export default function ReportDisaster() {
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState([]);
  const token = localStorage.getItem("token");
  // check if the user is authenticated on page load
  const handleSubmit = async (event) => {
    event.preventDefault();
    await getPosition(address, setAddress, setLatitude, setLongitude);
    console.log(latitude);
    addReport(type, latitude, longitude, details, token);
    toast.success('Report Submitted Successfully', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    // alert("Submission Success");
  };

  useEffect(() => {
    getAddressFromLatLng(latitude, longitude, setAddress);
  }, [latitude, longitude]);

  return (
    <Container className="report-disaster-container">
      <Title className="titleReportDisaster">Report Disaster</Title>
      <Form className="report-form">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "20px",
          }}
          className="value-container"
        >
          <Label htmlFor="disasterType" className="sub-heading">
            Select Disaster Type
          </Label>
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
            marginBottom: "20px",
          }}
          className="value-container"
        >
          <Label className="sub-heading">Location</Label>
          <div className="location-field-icons">
          <Input
            id="location"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />

          <div className="report-icons">
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
              onClick={() =>
                getPosition(address, setAddress, setLatitude, setLongitude)
              }
              style={{
                height: 22,
                width: 22,
                backgroundColor: "#e5e5e5",
                cursor: "pointer",
                marginLeft: "5px",
                marginRight: "-48px",
              }}
            >
              <BiSearchAlt size={22} color="black" />
              <div class="tooltip2">Convert to Lat Long</div>
            </div>
          </div>
        </div>
        </div>
        <div
          className="value-container"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Label className="sub-heading">Description</Label>
          <TextArea
            value={details}
            rows={4}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
        <Submit
          type="submit"
          onClick={(event) => handleSubmit(event)}
          value="Submit Report"
          className="submit-btn"
        />
      </Form>
    </Container>
  );
}
