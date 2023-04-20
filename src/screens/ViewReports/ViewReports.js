import React, { useState, useEffect } from "react";
import ReportTable from "../../components/ReportTable";
import { Container, Title } from "../style"
import './ViewReports.css';
import styled from "styled-components";
import { getReports } from "../../api/Report";

export default function ViewReports() {
  const [reportData, setReportData] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  ); // check if the user is authenticated on page load

  useEffect(() => {
    const getData = async () => {
      const res = await getReports();
      console.log(res);
      setReportData(res);
    };
    getData();
  }, []);

  if (isAuthenticated) {
    return (
      <Container>
        <Title className="view-report-heading">VIEW REPORTS</Title>
        <div className="report-table">
          <ReportTable data={reportData} />
        </div>
      </Container>

    );
  } else {
    console.log("ACCESS DENIED");
    return (
      <Container>
        <div>
          <Title>ACCESS DENIED</Title>
        </div>
      </Container>
    );
  }
}

