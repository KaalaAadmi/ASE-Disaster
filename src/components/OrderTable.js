import React, { useState, useEffect } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import axios from "axios";
import "./Table.css";
import { getAddressFromLatLng} from "./Addresses"
import { useMemo } from "react";

import {Container, Title, Subtitle, Form, TextArea, Label, Submit, Input, Select, Option} from "../screens/style"

function OrderTable(props) {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    setOrders(props.data);
    setAddresses({});
    props.data.forEach((row, index) => {
      getAddressFromLatLng(row.location.latitude, row.location.longitude, index);
    });
  }, [props, sortConfig]);

  const accessToken =
  "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

  const getAddressFromLatLng = (latitude, longitude, index) => {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
    axios.get(apiUrl)
      .then((response) => {
        const features = response.data.features;
        if (features.length > 0) {
          const address = features[0].place_name;
          setAddresses(prevAddresses => ({ ...prevAddresses, [index]: address }));
        } else {
          console.log('No address found');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('Error retrieving data');
      });
  };  

  // const sortData = (data, key, direction) => {
  //   const sortedData = [...data].sort((a, b) => {
  //     let aValue;
  //     let bValue;
  
  //     if (key === 'disaster') {
  //       aValue = a.disaster?.disasterName ?? '';
  //       bValue = b.disaster?.disasterName ?? '';
  //     } else if (key === 'isResponder') {
  //       aValue = a.isResponder ? 1 : 0;
  //       bValue = b.isResponder ? 1 : 0;
  //     } else if (key === 'disasterStatus') {
  //       aValue = a.disaster?.status ?? '';
  //       bValue = b.disaster?.status ?? '';
  //     } else {
  //       aValue = a[key];
  //       bValue = b[key];
  //     }
  
  //     if (aValue < bValue) {
  //       return direction === "asc" ? -1 : 1;
  //     }
  //     if (aValue > bValue) {
  //       return direction === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  
  //   return sortedData;
  // }; 

  const sortedOrders = useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  // const handleColumnHeaderClick = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };

  const handleColumnHeaderClick = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="table-header" onClick={() => handleColumnHeaderClick('name')}>
              Name
            </th>
            <th className="table-header" onClick={() => handleColumnHeaderClick('address')}>
              Location
            </th>
            <th className="table-header" onClick={() => handleColumnHeaderClick('resource')}>
              Resource
            </th>
            <th className="table-header" onClick={() => handleColumnHeaderClick('quantity')}>
              Quantity
            </th>
            <th className="table-header" onClick={() => handleColumnHeaderClick('instructions')}>
              Instructions
            </th>
            <th className="table-header" onClick={() => handleColumnHeaderClick('created_at')}>
              Creation Time
            </th>
            <th className="table-header" onClick={() => handleColumnHeaderClick('route')}>
              Route
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((row, index) => (
            <tr key={index}>
              <td className="table-cell">{row.location.name}</td>
              <td className="table-cell">{addresses[index]}</td>
              <td className="table-cell">{row.resource}</td>
              <td className="table-cell">{row.quantity}</td>
              <td className="table-cell">{row.instructions}</td>
              <td className="table-cell">
              {formatDistanceToNow(parseISO(row.created_at), { addSuffix: true })}
              </td>
              <td className="table-cell">  
                <Submit type="submit" value="Directions" onClick={() => window.open(row.URL, "_blank")}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;