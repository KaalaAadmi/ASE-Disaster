import React, { useState } from "react";
import "./styles.css";
const dataStore = [
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
];
export default function FAQ() {
  const [data, setData] = useState(dataStore);
  // console.log(data);
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="faq-page">
      <div className="faq-info">
        <h1>Frequently Asked Questions</h1>
        <p>Evacuation during a disaster is a critical step to ensure the safety of individuals and communities. Listen to emergency alerts and follow evacuation orders promptly. Bring essential supplies, such as medication, clothing, and documents. Follow designated routes and avoid flooded or damaged areas. Stay alert, calm, and respectful of others during the evacuation process.</p>
      </div>
      <div className="wrapper">
        <div className="accordion">
          {data.map((item, i) => (
            <div className="item" key={i}>
              <div className="title" onClick={() => toggle(i)}>
                <h2>{item.question}</h2>
                <span>{selected == i ? "-" : "+"}</span>
              </div>
              <div className={selected == i ? "content show" : "content"}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
