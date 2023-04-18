import React, { useState, useEffect } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import axios from "axios";
import "./Table.css";

function OrderTable(props) {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState({});

  useEffect(() => {
    let latestData = props.data;
    setOrders(latestData);
    setAddresses({});
    props.data.forEach((row, index) => {
      getAddressFromLatLng(row.location.latitude, row.location.longitude, index);
    });
  }, [props]);

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

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Location</th>
            <th className="table-header">Resource</th>
            <th className="table-header">Quantity</th>
            <th className="table-header">Instructions</th>
            <th className="table-header">Creation Time</th>
            <th className="table-header">Directions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((row, index) => (
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
                <button onClick={() => window.open(row.URL, "_blank")}>
                  Directions
                </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;