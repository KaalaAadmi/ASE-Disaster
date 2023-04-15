import React, { useState } from "react";
import "./styles.css";
const dataStore = [
  {
    question: "Earthquake",
    answer:
      "During an earthquake, drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops. If you're indoors, evacuate the building after the shaking stops, avoiding elevators and damaged stairs. Move away from buildings, trees, and power lines. If you're driving, pull over to a clear location, stop, and stay inside the vehicle until the shaking stops.",
  },
  {
    question: "Tsunami",
    answer:
      "If you are in an area that is at risk of a tsunami, it is important to know how to evacuate quickly and safely. Here are some steps to follow:\
      \n Listen for official warnings: Pay attention to tsunami warnings issued by local authorities via radio, television, or other sources. Take them seriously and act promptly.\
      Move inland or to higher ground: If you are in a coastal area, move inland or to higher ground immediately. Tsunami waves can travel far inland, so it is important to move to higher ground or to a safe distance away from the coast.\
      Follow designated evacuation routes: Follow the designated evacuation routes provided by local authorities. Do not try to return to your home or belongings as you may be risking your life.\
      Avoid low-lying areas: When evacuating, avoid low-lying areas, as they are more prone to flooding.\
      Stay informed: Keep up to date with the latest developments, as additional waves may follow the first one.\
      Stay away from the coast: Do not return to the coast until local authorities advise that it is safe to do so.\
      It is important to act quickly and follow these guidelines to stay safe during a tsunami.",
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
