import React from "react";
import "./ReportDisaster.css";
import styled from "styled-components";

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
export default function ReportDisaster() {
  return (
    <Container>
      <Title>Report Disaster</Title>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Date & Time:</Label>
          <Input type="text" style={{ boxShadow: "none !important" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Select Disaster Type:</Label>
          <Input type="text" />
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
          <Input type="text" />
          <div
            style={{ height: 22, width: 22, backgroundColor: "#e5e5e5" }}
          ></div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Label>Description:</Label>
          <Input type="text" />
        </div>
        <Submit type="submit" />
      </Form>
    </Container>
  );
}
