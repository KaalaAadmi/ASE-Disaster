import React, { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { updateReport } from "../api/Report";
import axios from "axios";
import { toast } from "react-toastify";

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
import "./Table.css";

function Table(props) {
  const [reports, setReports] = useState(props.data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isResponderFilter, setIsResponderFilter] = useState(false);
  const [isSpamFilter, setIsSpamFilter] = useState(false);
  const [addresses, setAddresses] = useState({});

  const accessToken = process.env.REACT_APP_MAP_TOKEN;

  const getAddressFromLatLng = (latitude, longitude, index) => {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const features = response.data.features;
        if (features.length > 0) {
          const address = features[0].place_name;
          setAddresses((prevAddresses) => ({
            ...prevAddresses,
            [index]: address,
          }));
        } else {
          toast.error("No Address Found", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        toast.error("Error Occurred! Try Again Later", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
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
    setAddresses({});
    props.data.forEach((row, index) => {
      getAddressFromLatLng(row.latitude, row.longitude, index);
    });

    let filteredData = props.data;
    if (isResponderFilter) {
      filteredData = props.data.filter((row) => row.isResponder);
    }
    if (isSpamFilter) {
      filteredData = filteredData.filter((row) => !row.isSpam);
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
  }, [props, sortConfig, isResponderFilter, isSpamFilter]);

  const handleSpamChange = (index) => {
    const newData = [...reports];
    newData[index].isSpam = !newData[index].isSpam;
    setReports(newData);
    updateReport(newData[index]._id, newData[index]);
  };

  const handleColumnHeaderClick = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <Submit
        type="submit"
        value={isResponderFilter ? "Show All" : "Show Only Responder Messages"}
        onClick={handleResponderFilterClick}
      />
      <Submit
        type="submit"
        value={isSpamFilter ? "Show All" : "Remove Spam"}
        onClick={handleSpamFilterClick}
      />
      <div>
        <table>
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
                onClick={() => handleColumnHeaderClick("address")}
              >
                Location
              </th>
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("isSpam")}
              >
                Spam
              </th>
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("type")}
              >
                Disaster Type
              </th>
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("site")}
              >
                Location Type
              </th>
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("size")}
              >
                People Impacted
              </th>
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("radius")}
              >
                Radius
              </th>
              <th
                className="table-header"
                onClick={() => handleColumnHeaderClick("created_at")}
              >
                Creation Time
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row, index) => (
              <tr
                key={index}
                className={row.isResponder ? "highlighted-row" : ""}
              >
                <td className="table-cell">{row.detail}</td>
                <td className="table-cell">{addresses[index]}</td>
                <td className="table-cell">
                  <input
                    type="checkbox"
                    checked={row.isSpam}
                    onChange={() => handleSpamChange(index)}
                  />
                </td>
                <td className="table-cell">{row.type}</td>
                <td className="table-cell">{row.site}</td>
                <td className="table-cell">{row.size}</td>
                <td className="table-cell">{row.radius}</td>
                <td className="table-cell">
                  {formatDistanceToNow(parseISO(row.created_at), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
