import React, { useState } from "react";
import "./styles.css";

export default function Bulletin() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  return (
    <div className="bulletin-page">
      {/* <h1>News Bulletin</h1>
      <p>
        Disasters are sudden and often devastating events that cause significant
        damage to property, infrastructure, and the environment, as well as loss
        of life. They can be caused by natural disasters such as earthquakes,
        hurricanes, floods, and wildfires, or by human activities like
        industrial accidents, terrorist attacks, and wars.{" "}
      </p>
      <div className="disaster-info">
        <div>
          <div className="buttons-container">
            {selectedFilters.map((category, idx) => (
              <button
                onClick={() => handleFilterButtonClick(category)}
                className={`button ${
                  selectedFilters?.includes(category) ? "active" : ""
                }`}
                key={`filters-${idx}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="items-container">
            {filteredItems.map((item, idx) => (
              <div key={`items-${idx}`} className="item">
                <p>{item.name}</p>
                <p className="category">{item.category}</p>
              </div>
            ))}
          </div> */}
      Hello World!
    </div>
  );
}
