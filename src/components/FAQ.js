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
    question: "Fire in a Building",
    answer:
      "In the event of a fire in a building, it is important to evacuate as quickly and safely as possible. The first step is to activate the building's fire alarm, if there is one. Everyone should immediately exit the building through the nearest fire exit or stairwell, and avoid using elevators. If possible, cover your nose and mouth with a cloth to avoid inhaling smoke or fumes. If you are on a higher floor, use the stairs and do not attempt to jump from a window. Once outside, move to a safe distance from the building and call for emergency services if they have not already been alerted. It is important to familiarize yourself with the evacuation routes and procedures in your building before a fire occurs.",
  },
  {
    question: "Flood",
    answer:
      "During a flood, it is important to evacuate the area as soon as possible to ensure your safety. If you are indoors, turn off all electricity, gas and water supplies before leaving the building. Gather essential items such as food, water, first-aid kit, and important documents and move to higher ground. Avoid walking or driving through flooded areas as the water may be deeper than it appears and could contain dangerous debris. Follow emergency services updates and listen to evacuation orders. It's crucial to act quickly and calmly to ensure a safe evacuation.",
  },
  {
    question: "Terrorist Attack",
    answer:
      "In the event of a terrorist attack, the most important thing is to stay calm and move quickly. Listen to any instructions given by emergency services and follow their lead. If possible, try to move away from the area of danger and seek shelter in a nearby building or behind solid objects. If you are unable to move away, try to find cover and remain as still as possible. If you are caught in a confined space, such as a train carriage or bus, stay low to the ground to avoid any potential gunfire. Do not attempt to take photos or videos, and do not share unverified information on social media. Once you are in a safe location, contact your loved ones to let them know that you are okay.",
  },
  {
    question: "Volcanic Eruption",
    answer:
      "During a volcanic eruption, evacuation may be necessary to ensure safety. The first step is to stay informed about the situation through official sources such as the National Disaster Management Authority. If evacuation is advised, follow the instructions given by authorities and leave the area as soon as possible. Take only essential items with you such as important documents, medications, and a first aid kit. Cover your nose and mouth with a cloth to avoid inhaling ash and volcanic gases. Do not attempt to return to the area until officials declare it safe to do so. It is important to remain calm and follow the guidance of authorities during a volcanic eruption to ensure the safety of yourself and others.",
  },
  {
    question: "Chemical Hazard",
    answer:
      "Evacuating during a chemical hazard is critical to ensure personal safety. In the event of a chemical spill or release, it is important to listen to emergency announcements and follow evacuation instructions provided by authorities. If possible, shut off any sources of ventilation, such as air conditioning or heating systems, to minimize the spread of the hazardous substance. Leave the area immediately and avoid contaminated areas, including bodies of water. It is important to cover one's nose and mouth with a cloth or mask to avoid inhaling the hazardous substance. Seek medical attention immediately if exposed to chemicals or experiencing any symptoms.",
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

