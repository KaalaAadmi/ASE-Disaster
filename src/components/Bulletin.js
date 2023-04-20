import React, { useEffect, useState } from "react";
import "./styles.css";
import { CgCalendarDates } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getActiveDisasters } from "../api/Disaster";
import { format, parseISO } from "date-fns";
import axios from "axios"

export default function Bulletin() {
  const [disasters, setDisasters] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("All");
  const [selected, setSelected] = useState(null);
  const [types, setTypes] = useState([]);
  const toggle = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  // fetching data from api and reverse geocoding the latitude and longitude
  useEffect(() => {
    const getData = async () => {
      const res = await getActiveDisasters();
      const finalData = await Promise.all(
        res.map(async (item) => {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${item.latitude}&longitude=${item.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          return { ...item, location: data.locality + ", " + data.city };
        })
      );
      console.log(finalData);
      setDisasters(finalData);
      setDisplayData(finalData);
    };
    getData();
  }, []);
  
  // for getting the list types of disasters from active disasters
  useEffect(() => {
    let type = [];
    const typesSet = new Set();
    const getTypes = () => {
      type = disasters.map((item) => item.type);
      for (let i = 0; i < type.length; i++) {
        let str = type[i];
        typesSet.add(str.charAt(0).toUpperCase() + str.slice(1));
      }
      let typeArray=["All"]
      typesSet.forEach(value=>typeArray.push(value))
      setTypes(typeArray);
    };
    getTypes();
  }, [disasters]);
  // for filtering disasters based on types
  useEffect(() => {
    const filteredData = disasters.filter((item) => {
      if (selectedFilters === "All") {
        return item;
      } else {
        let str = item.type;
        return str.charAt(0).toUpperCase() + str.slice(1) === selectedFilters;
      }
    });
    setDisplayData(filteredData);
  }, [selectedFilters]);
  return (
    <div className="bulletin-container">
    <div className="bulletin-page">
      {/* Headers and details */}
      <div className="bulletin__header">
        <h1>News Bulletin</h1>
        <p className="bulletin__info">
          Disasters are sudden and often devastating events that cause
          significant damage to property, infrastructure, and the environment,
          as well as loss of life. They can be caused by natural disasters such
          as earthquakes, hurricanes, floods, and wildfires, or by human
          activities like industrial accidents, terrorist attacks, and wars.{" "}
        </p>
      </div>
      {/* Filters */}
      <div  style={{ display: "flex" }} className="bulletin-filters">
        {types.length > 0 ?
          (types.map((item, index) => (
            <p
              key={index}
              name={item}
              className={
                selectedFilters === item
                  ? "bulletin__selected_filter"
                  : "bulletin__filter"
              }
              onClick={(event) => setSelectedFilters(item)}
            >
              {item}
            </p>
          ))):""}
        {/* <p
          name="all"
          className={
            selectedFilters === "all"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("all")}
        >
          ALL
        </p>
        <p
          name="earthquake"
          className={
            selectedFilters === "earthquake"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("earthquake")}
        >
          EARTHQUAKE
        </p>
        <p
          name="fire"
          className={
            selectedFilters === "fire"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("fire")}
        >
          FIRE
        </p>
        <p
          name="tsunami"
          className={
            selectedFilters === "tsunami"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("tsunami")}
        >
          TSUNAMI
        </p> */}
      </div>
      {/* Accordion */}
      <div className="bulletin__wrapper">
        <div className="accordion">
          {displayData.map((item, index) => (
            <div className="bulletin__item" key={index}>
              <div className="title" onClick={() => toggle(index)}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginBottom: "10px"
                  }}
                >
                  <h2 style={{ marginBottom: "10px" }} className="bulletin-h2">{item.disasterName}</h2>
                  {/* <p style={{ marginBottom: "10px" }}>
                    {selected === index ? "" : item.disasterDescription}
                  </p> */}
                  <div
                    
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      width: "100%",
                      gap: "10px",
                    }}
                    className="date-location-bulletin"
                  >
                    {!(selected === index) && (
                      <p 
                        style={{
                          border: "3px solid #fefefe",
                          padding: "10px 25px",
                          borderRadius: "50px",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          marginRight: "25px",
                        }}
                        className="calender-bulletin"
                      >
                        <CgCalendarDates size={20} style={{marginRight: "10px"}} />{" "}
                        {format(parseISO(item.created_at), "dd MMM, yyyy")}
                      </p>
                    )}
                    {!(selected === index) && (
                      <p
                        style={{
                          border: "3px solid #fefefe",
                          padding: "10px 25px",
                          borderRadius: "50px",
                          alignItems: "center",
                          alignContent: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <HiOutlineLocationMarker size={20} style={{marginRight: "10px"}}/> {item.location}
                        {/* {console.log(item.location)} */}
                      </p>
                    )}
                  </div>
                </div>
                <span>
                  {selected === index ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </span>
              </div>
              {selected === index && (
                <div
                  style={{
                    border: "1px solid #fefefe",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                ></div>
              )}
              <div className={selected === index ? "content show" : "content"}>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    DATE:{" "}
                    {format(parseISO(item.created_at), "dd MMM yyyy, hh:mm:ss a")}
                  </span>
                  {item.date}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    LOCATION:{" "}
                  </span>
                  {item.location}
                </p>
                {item.disasterDescription && (
                  <p style={{ marginBottom: "10px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      DETAILS:{" "}
                    </span>
                    {item.disasterDescription}
                  </p>
                 )}
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    RESOUCES SENT:{" "}
                  </span>
                  {item.ambulance !== 0 && `Ambulance: ${item.ambulance} ,`}
                  {item.bus !== 0 && `Bus: ${item.bus} ,`}
                  {item.helicopter !== 0 && `Helicopter: ${item.helicopter} ,`}
                  {item.police !== 0 && `Garda: ${item.police} units`}
                </p>

                {/* <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Number of People Affected:{" "}
                  </span>
                  {item.affected}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Loss of Lives:{" "}
                  </span>
                  {item.loss}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}