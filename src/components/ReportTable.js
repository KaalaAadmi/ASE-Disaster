import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { updateReport } from "../api/Report";
import { getRelevantDisasters, addReportToDisaster } from "../api/Disaster";
import "./Table.css";

const FRONTEND = "http://localhost:3000";

function ReportTable(props) {
  const [reports, setReports] = useState(props.data);
  const [disasters, setDisasters] = useState(props.data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isResponderFilter, setIsResponderFilter] = useState(false);
  const [isSpamFilter, setIsSpamFilter] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState("");
  const [assignedDisaster, setAssignedDisaster] = useState("");

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
  
      if (key === 'disaster') {
        aValue = a.disaster?.disasterName ?? '';
        bValue = b.disaster?.disasterName ?? '';
      } else if (key === 'isResponder') {
        aValue = a.isResponder ? 1 : 0;
        bValue = b.isResponder ? 1 : 0;
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

  useEffect(() => {
    let filteredData = props.data;
    if (isResponderFilter) {
      filteredData = props.data.filter((row) => row.isResponder);
    }
    if (isSpamFilter) {
      filteredData = filteredData.filter((row) => !row.isSpam);
    }
    if (selectedDisaster) {
      filteredData = filteredData.filter((row) => row.disaster?._id === selectedDisaster);
    }    

    if (sortConfig.key) {
      const sortedData = sortData(filteredData, sortConfig.key, sortConfig.direction);
      setReports(sortedData);
    } else {
      setReports(filteredData);
    }

    async function fetchData() {
      getRelevantDisasters().then((response) => {
        // Process the response data here, if necessary
        const relevantDisasters = response;
        setDisasters(relevantDisasters);
      });
    }
    fetchData();
  }, [props, sortConfig, isResponderFilter, isSpamFilter, selectedDisaster, assignedDisaster]);

  const handleSpamChange = (index) => {
    const newData = [...reports];
    newData[index].isSpam = !newData[index].isSpam;
    setReports(newData);
    updateReport(newData[index]._id, newData[index]);
  };

  const handleDisasterChange = (index, disasterID) => {
    addReportToDisaster(disasterID, reports[index]._id);
    setAssignedDisaster(disasterID);
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

  return (
    <>
    <button onClick={handleResponderFilterClick}>
        {isResponderFilter ? "Show All" : "Show Only Responder Messages"}
    </button>
    <button onClick={handleSpamFilterClick}>
        {isSpamFilter ? "Show All" : "Remove Spam"}
    </button>
    <select value={selectedDisaster} onChange={handleDisasterFilterChange}>
      <option value="">All Disasters</option>
      {disasters.map((disaster) => (
        <option key={disaster._id} value={disaster._id}>
          {disaster.disasterName}
        </option>
      ))}
    </select>

    
    <table>
      <thead>
        <tr>
          <th className="table-header" onClick={() => handleColumnHeaderClick("detail")}>Description</th>
          <th className="table-header" onClick={() => handleColumnHeaderClick("type")}>Type</th>
          <th className="table-header" onClick={() => handleColumnHeaderClick("isSpam")}>Spam</th>
          <th className="table-header" onClick={() => handleColumnHeaderClick("reports")}>Related Reports</th>
          <th className="table-header" onClick={() => handleColumnHeaderClick("created_at")}>Creation Time</th>
          <th className="table-header" onClick={() => handleColumnHeaderClick("disaster")}>Assign to Disaster</th>
          <th className="table-header"></th>
        </tr>
      </thead>
      <tbody>
        {reports.map((row, index) => (
          <tr key={index} className={row.isResponder ? "highlighted-row" : ""}>
            <td className="table-cell">{row.detail}</td>
            <td className="table-cell">{row.type}</td>
            <td className="table-cell">
              <input
                type="checkbox"
                checked={row.isSpam}
                onChange={() => handleSpamChange(index)}
              />
            </td>
            <td className="table-cell">{row.disaster?.reports?.length ?? "0"}</td>
            <td className="table-cell">
              {format(parseISO(row.created_at), "dd MMM, yyyy")}
            </td>
            <td className="table-cell">
              <select
                value={row.disaster?._id ?? ""}
                onChange={(e) => handleDisasterChange(index, e.target.value)}
              >
                <option value="" disabled>
                  No Disaster Assigned
                </option>
                {disasters.map((disaster) => (
                  <option key={disaster._id} value={disaster._id}>
                    {disaster.disasterName}
                  </option>
                ))}
              </select>
            </td>
            <td className="table-cell">
              {row.disaster ? (
                <button onClick={() => goToDisasterUrl(row.disaster._id)}>
                  Activate Disaster
                </button>
              ) : (
                <span>No Disaster Assigned</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default ReportTable;
