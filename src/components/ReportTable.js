import React, { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { updateReport, getReports } from "../api/Report";

import {
  Container,
  Title,
  Subtitle,
  Form,
  TextArea,
  Label,
  Submit,
  Input,
  Select,
  Option,
} from "../screens/style";
import { getRelevantDisasters, addReportToDisaster } from "../api/Disaster";
import "./Table.css";

const FRONTEND = "http://localhost:3000";

function ReportTable(props) {
  const [reports, setReports] = useState(props.data);
  // const [disasters, setDisasters] = useState(props.data);
  const [disasters, setDisasters] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isResponderFilter, setIsResponderFilter] = useState(false);
  const [isSpamFilter, setIsSpamFilter] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState("");
  const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin") === "true"
  ); // check if the user is a coordinator on page load

  const handleDisasterFilterChange = (e) => {
    setSelectedDisaster(e.target.value);
  };

  const handleResponderFilterClick = () => {
    setIsResponderFilter(!isResponderFilter);
  };

  const handleSpamFilterClick = () => {
    setIsSpamFilter(!isSpamFilter);
  };

  const sortData = (data, key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      let aValue;
      let bValue;

      if (key === "disaster") {
        aValue = a.disaster?.disasterName ?? "";
        bValue = b.disaster?.disasterName ?? "";
      } else if (key === "isResponder") {
        aValue = a.isResponder ? 1 : 0;
        bValue = b.isResponder ? 1 : 0;
      } else if (key === "disasterStatus") {
        aValue = a.disaster?.status ?? "";
        bValue = b.disaster?.status ?? "";
      } else if (key === "reports") {
        aValue = a.disaster?.reports?.length ?? 0;
        bValue = b.disaster?.reports?.length ?? 0;
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };

  async function fetchDisasterData() {
    try {
      const response = await getRelevantDisasters();
      // Process the response data here, if necessary
      const relevantDisasters = response;
      setDisasters(relevantDisasters);
    } catch (error) {
      console.log(error);
    }
    console.log(disasters);
  }

  async function fetchReportData() {
    try {
      const response = await getReports();
      // Process the response data here, if necessary
      const relevantReports = response;
      setReports(relevantReports);
    } catch (error) {
      console.log(error);
    }
    console.log("REFRESH REPORTS");
    console.log(reports);
  }

  useEffect(() => {
    let filteredData = props.data;
    if (isResponderFilter) {
      filteredData = props.data.filter((row) => row.isResponder);
    }
    if (isSpamFilter) {
      filteredData = filteredData.filter((row) => !row.isSpam);
    }
    if (selectedDisaster) {
      filteredData = filteredData.filter(
        (row) => row.disaster?._id === selectedDisaster
      );
    }

    if (sortConfig.key) {
      const sortedData = sortData(
        filteredData,
        sortConfig.key,
        sortConfig.direction
      );
      setReports(sortedData);
    } else {
      setReports(filteredData);
    }

    fetchDisasterData();
    // fetchReportData();
  }, [props, sortConfig, isResponderFilter, isSpamFilter, selectedDisaster]);

  const handleSpamChange = (index) => {
    const newData = [...reports];
    newData[index].isSpam = !newData[index].isSpam;
    setReports(newData);
    updateReport(newData[index]._id, newData[index]);
  };

  const handleDisasterChange = async (index, disasterID) => {
    await addReportToDisaster(disasterID, reports[index]._id);
    console.log("REFRESH REPORTS");
    fetchReportData();
  };

  const handleColumnHeaderClick = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const goToDisasterUrl = (disaster) => {
    const baseUrl = `${FRONTEND}/activate-response`; // Replace with the desired base URL
    const url = `${baseUrl}/${disaster}`;
    window.location.href = url;
  };

  const viewReport = (disasterId) => {
    const baseUrl = `${FRONTEND}/disaster-information`; // Replace with the desired base URL for viewing reports
    const url = `${baseUrl}/${disasterId}`;
    window.location.href = url;
  };

  const getOptionBackgroundColor = (disaster) => {
    const isActive = disaster.status === "active";
    return isActive ? "#b3e5d1" : "white";
  };

  const getDropdownBackgroundColor = (disaster) => {
    const isActive = disaster.status === "active";
    return isActive ? "#b3e5d1" : "white";
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: "20px"
        }}
      >
        <Submit
          type="submit"
          value={
            isResponderFilter ? "Show All" : "Show Only Responder Messages"
          }
          onClick={handleResponderFilterClick}
          style={{marginTop: "0px", fontSize: "17px"}}
          className="view-report-top-btn"
          />
        <Submit
          type="submit"
          value={isSpamFilter ? "Show All" : "Remove Spam"}
          onClick={handleSpamFilterClick}
          style={{marginTop: "0px", fontSize: "17px"}}
          className="view-report-top-btn"
        />
        <Select
          value={selectedDisaster}
          onChange={handleDisasterFilterChange}
          style={{ background: "white", marginBottom: "0px", borderRadius: "10px", padding:"10px" }}
        >
          <Option value="">All Disasters</Option>
          {disasters.map((disaster) => (
            <Option
              key={disaster._id}
              value={disaster._id}
              style={{ background: getOptionBackgroundColor(disaster) }}
            >
              {disaster.disasterName}
            </Option>
          ))}
        </Select>
      </div>

      <table style={{padding: "0 30px 20px 30px"}}>
        <thead>
          <tr>
            <th
              className="table-header"
              onClick={() => handleColumnHeaderClick("detail")}
            >
              Description
            </th>
            <th
              className="table-header"
              onClick={() => handleColumnHeaderClick("type")}
            >
              Type
            </th>
            <th
              className="table-header"
              onClick={() => handleColumnHeaderClick("isSpam")}
            >
              Spam
            </th>
            <th
              className="table-header"
              onClick={() => handleColumnHeaderClick("reports")}
            >
              Related Reports
            </th>
            <th
              className="table-header"
              onClick={() => handleColumnHeaderClick("created_at")}
            >
              Creation Time
            </th>
            {isCoordinator && (
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("disaster")}
              >
                Assign to Disaster
              </th>
            )}
            {isCoordinator && (
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("disasterStatus")}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody style={{textAlign: "center"}}>
          {reports.map((row, index) => (
            <tr
              key={index}
              className={row.isResponder ? "highlighted-row" : ""}
            >
              <td className="table-cell">{row.detail}</td>
              <td className="table-cell">{row.type}</td>
              <td className="table-cell">
                <input
                  type="checkbox"
                  checked={row.isSpam}
                  onChange={() => handleSpamChange(index)}
                />
              </td>
              <td className="table-cell">
                {row.disaster?.reports?.length ?? "0"}
              </td>
              <td className="table-cell">
                {formatDistanceToNow(parseISO(row.created_at), {
                  addSuffix: true,
                })}
              </td>
              {isCoordinator && (
                <td className="table-cell" style={{maxWidth: "320px"}}>
                  <select
                    value={row.disaster?._id ?? ""}
                    onChange={(e) =>
                      handleDisasterChange(index, e.target.value)
                    }
                    style={{
                      backgroundColor: getDropdownBackgroundColor(row.disaster),
                      maxWidth: "300px"
                    }}
                  >
                    <option value="" disabled style={{maxWidth: "250px"}}>
                      No Disaster Assigned
                    </option>
                    {disasters.map((disaster) => (
                      <option
                        key={disaster._id}
                        value={disaster._id}
                        style={{
                          background: getOptionBackgroundColor(disaster),
                        }}
                      >
                        {disaster.disasterName}
                      </option>
                    ))}
                  </select>
                </td>
              )}
              {isCoordinator && (
                <td className="table-cell">
                  {row.disaster ? (
                    row.disaster.status === "active" ? (
                      <Submit
                        type="submit"
                        value="View Disaster"
                        onClick={() => viewReport(row.disaster._id)}
                        style={{fontSize: "18px", marginTop: "0"}}
                        className="report-table-submit-btn"
                        />
                        ) : (
                          <Submit
                          type="submit"
                          value="Activate Disaster"
                          onClick={() => goToDisasterUrl(row.disaster._id)}
                          style={{fontSize: "18px", marginTop: "0"}}
                          className="report-table-submit-btn"
                      />
                    )
                  ) : (
                    <span>No Disaster Assigned</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReportTable;
