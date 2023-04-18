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
  const [selectedFilters, setSelectedFilters] = useState("all");
  const [selected, setSelected] = useState(null);
  const [types, setTypes] = useState([]);
  const toggle = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  // fetching data from api
  useEffect(() => {
    const getDisaster = async () => {
      const res = await getActiveDisasters();
      console.log(res)
      setDisasters(res);
      setDisplayData(res);
    };
    getDisaster();
  }, []);
  // reverse geocoding the latitude and longitude
  useEffect(() => {
    const reverseGeocode = async () => {
      const finalData = await Promise.all(
        disasters.map(async (item) => {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${item.latitude}&longitude=${item.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          // console.log(data)
          return { ...item, location: data.locality + ", " + data.city };
        })
      );
      // console.log(finalData);
      setDisasters(finalData)
      setDisplayData(finalData);
      // disasters=finalData
    };
    reverseGeocode();
  }, []);
  // for getting the list types of disasters from active disasters
  useEffect(() => {
    let type = [];
    const typesSet = new Set();
    const getTypes = () => {
      type = disasters.map((item) => item.type);
      for (let i = 0; i < type.length; i++) {
        typesSet.add(type[i]);
      }
      let typeArray=["all"]
      typesSet.forEach(value=>typeArray.push(value))
      setTypes(typeArray);
    };
    getTypes();
  }, [disasters]);
  // for filtering disasters based on types
  useEffect(() => {
    const filteredData = disasters.filter((item) => {
      if (selectedFilters === "all") {
        return item;
      } else {
        return item.type === selectedFilters;
      }
    });
    setDisplayData(filteredData);
  }, [selectedFilters]);
  return (
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
      <div style={{ display: "flex" }}>
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
                  }}
                >
                  <h2 style={{ marginBottom: "10px" }}>{item.disasterName}</h2>
                  <p style={{ marginBottom: "10px" }}>
                    {selected === index ? "" : item.disasterDescription}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {!(selected === index) && (
                      <p
                        style={{
                          border: "1px solid #fefefe",
                          padding: "10px",
                          borderRadius: "50px",
                          alignItems: "center",
                        }}
                      >
                        <CgCalendarDates size={20} />{" "}
                        {format(parseISO(item.created_at), "dd MMM, yyyy")}
                      </p>
                    )}
                    {!(selected === index) && (
                      <p
                        style={{
                          border: "1px solid #fefefe",
                          padding: "10px",
                          borderRadius: "50px",
                          // alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <HiOutlineLocationMarker size={20} /> {item.location}
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
                  </span>
                  {item.date}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    LOCATION:{" "}
                  </span>
                  {item.location}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  {item.disasterDescription}
                </p>
                <p style={{ marginBottom: "10px" }}>
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
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
