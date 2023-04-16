import React, { useEffect, useState } from "react";
import "./styles.css";
import { CgCalendarDates } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getAllDisasters } from "../api/Disaster";
const data = [
  {
    title: "Fire at Trinity",
    message: "Massive fire at Trinity College Dublin",
    date: "16-02-2023",
    location: "Dublin",
    description:
      "In April 2023, a devastating fire broke out at Trinity College Dublin, one of Ireland's oldest and most prestigious universities. The fire started in the roof of the historic O'Donnell Building, which houses the university's administrative offices, and quickly spread to other parts of the building. The fire caused significant damage to the structure and contents of the building, including important historical documents and artwork. Thankfully, no one was injured in the fire, but the damage to the building and its contents was extensive. The university has since launched a massive restoration project to repair and rebuild the damaged areas and to ensure that the historic building can be preserved for future generations. The fire at Trinity College Dublin was a tragic event, but the university and the wider community have rallied together to support the restoration efforts and to ensure that the campus can continue to serve as a hub of academic excellence and cultural significance.",
    affected: 7,
    loss: 0,
    type: "FIRE",
  },
  {
    title: "Earthquake at Trinity",
    message: "Massive fire at Trinity College Dublin",
    date: "16-02-2023",
    location: "Dublin",
    description:
      "In April 2023, a devastating fire broke out at Trinity College Dublin, one of Ireland's oldest and most prestigious universities. The fire started in the roof of the historic O'Donnell Building, which houses the university's administrative offices, and quickly spread to other parts of the building. The fire caused significant damage to the structure and contents of the building, including important historical documents and artwork. Thankfully, no one was injured in the fire, but the damage to the building and its contents was extensive. The university has since launched a massive restoration project to repair and rebuild the damaged areas and to ensure that the historic building can be preserved for future generations. The fire at Trinity College Dublin was a tragic event, but the university and the wider community have rallied together to support the restoration efforts and to ensure that the campus can continue to serve as a hub of academic excellence and cultural significance.",
    affected: 7,
    loss: 0,
    type: "EARTHQUAKE",
  },
  {
    title: "Tsunami at Trinity",
    message: "Massive fire at Trinity College Dublin",
    date: "16-02-2023",
    location: "Dublin",
    description:
      "In April 2023, a devastating fire broke out at Trinity College Dublin, one of Ireland's oldest and most prestigious universities. The fire started in the roof of the historic O'Donnell Building, which houses the university's administrative offices, and quickly spread to other parts of the building. The fire caused significant damage to the structure and contents of the building, including important historical documents and artwork. Thankfully, no one was injured in the fire, but the damage to the building and its contents was extensive. The university has since launched a massive restoration project to repair and rebuild the damaged areas and to ensure that the historic building can be preserved for future generations. The fire at Trinity College Dublin was a tragic event, but the university and the wider community have rallied together to support the restoration efforts and to ensure that the campus can continue to serve as a hub of academic excellence and cultural significance.",
    affected: 7,
    loss: 0,
    type: "TSUNAMI",
  },
];

export default function Bulletin() {
  const [disasters, setDisasters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const toggle = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  // fetching data from api
  useEffect(() => {
    const getDisaster = async () => {
      setDisasters(getAllDisasters());
    };
    getDisaster();
  }, []);
  // for filtering disasters based on types
  useEffect(() => {
    const filteredData = disasters.filter((item) => {
      if (selectedFilters === "ALL") {
        return item;
      } else {
        return item.type === selectedFilters;
      }
    });
    setDisasters(filteredData);
  }, [selectedFilters]);
  console.log(disasters);
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
        <p
          name="ALL"
          className={
            selectedFilters === "ALL"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("ALL")}
        >
          ALL
        </p>
        <p
          name="EARTHQUAKE"
          className={
            selectedFilters === "EARTHQUAKE"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("EARTHQUAKE")}
        >
          EARTHQUAKE
        </p>
        <p
          name="FIRE"
          className={
            selectedFilters === "FIRE"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("FIRE")}
        >
          FIRE
        </p>
        <p
          name="TSUNAMI"
          className={
            selectedFilters === "TSUNAMI"
              ? "bulletin__selected_filter"
              : "bulletin__filter"
          }
          onClick={(event) => setSelectedFilters("TSUNAMI")}
        >
          TSUNAMI
        </p>
      </div>
      {/* Accordion */}
      <div className="bulletin__wrapper">
        <div className="accordion">
          {disasters.map((item, index) => (
            <div className="bulletin__item" key={index}>
              <div className="title" onClick={() => toggle(index)}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h2 style={{ marginBottom: "10px" }}>{item.title}</h2>
                  <p style={{ marginBottom: "10px" }}>
                    {selected === index ? "" : item.message}
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
                        <CgCalendarDates size={20} /> {item.date}
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
                <p style={{ marginBottom: "10px" }}>{item.description}</p>
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
