import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import "./SendResources.css";
import { Container, Title, Subtitle, Form, TextArea, Label, Submit, Input, Select, Option } from "../style"
import { getActiveDisasters, getIndividualDisaster } from "../../api/Disaster";
import { disasterOrders } from "../../api/Order";
import { requestResponders } from "../../api/Order";
import Table from "../../components/Table";
import OrderTable from "../../components/OrderTable";
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";


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
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);
  const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin")
  ); // check if the user is a coordinator on page load
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    await requestResponders(
      selectedDisaster,
      parseInt(ambulances),
      parseInt(police),
      parseInt(fire),
      parseInt(bus),
      parseInt(helicopter),
      evacuation
    );
    setSubmitting(false);
    navigate(`/disaster-information/${selectedDisaster}`);
  };

  const fetchData = async () => {
    getActiveDisasters().then((response) => {
      // Process the response data here, if necessary
      const activeDisasters = response;
      setDisasters(activeDisasters);
    });
    if (selectedDisaster) {
      const disasterInfo = await getIndividualDisaster(selectedDisaster);
      setReports(disasterInfo.disasterData.reports ?? []);
      const currentOrders = await disasterOrders(selectedDisaster);
      setOrders(currentOrders);
      setAmbulances(disasterInfo.disasterData.ambulance ?? "0");
      setFire(disasterInfo.disasterData.fire ?? "0");
      setPolice(disasterInfo.disasterData.police ?? "0");
      setHelicopter(disasterInfo.disasterData.helicopter ?? "0");
      setBus("0");
      console.log(helicopter);
      setEvacuation(false);
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
  const handleCheckboxChange = async (event) => {
    setEvacuation(event.target.checked);
    const disasterInfo = await getIndividualDisaster(selectedDisaster);
    console.log(disasterInfo.disasterData.bus);
    setBus(disasterInfo.disasterData.bus);
  };
  if (isCoordinator) {
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
              <Option value="" disabled>Select a Options</Option>
              {disasters.map((disaster) => (
                <Option key={disaster._id} value={disaster._id}>
                  {disaster.disasterName}
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
              type="number"
              value={helicopter}
              onChange={(event) => setHelicopter(event.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
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
          <Submit type="submit" value="Send Resources" onClick={handleSubmit} disabled={submitting} />
          {submitting && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <ClipLoader color="#4A90E2" />
            </div>
          )}
        </Form>
        <div>
          {selectedDisaster !== "" &&
            <Subtitle>Related reports</Subtitle>
          }
          {selectedDisaster !== "" &&
            <Table data={reports} />
          }
        </div>
        <div>
          {orders.length !== 0 &&
            <Subtitle>Requested Resources</Subtitle> &&
            <OrderTable data={orders}
            />}
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <Title>ACCESS DENIED</Title>
      </Container>
    );
  }
}