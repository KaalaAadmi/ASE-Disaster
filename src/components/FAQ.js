import React from "react";
import "./styles.css";

export default function FAQ() {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach((faq) => {
        faq.addEventListener("click", () => {
            // console.log("clicked");
            faq.classList.toggle("active");
        });
    });

    return (
    <div className="faqScreen">
        <div className="faqScreenContent">
        <h1>Frequently Asked Questions</h1>
        <h3>
            Evacuation during a disaster is a critical step to ensure the safety
            of individuals and communities. Listen to emergency alerts and follow
            evacuation orders promptly. Bring essential supplies, such as
            medication, clothing, and documents. Follow designated routes and
            avoid flooded or damaged areas. Stay alert, calm, and respectful of
            others during the evacuation process.
        </h3>
        <div className="disasterFaq">
            <div className="faq">
            <div className="question">
                <h2>Earthquake</h2>
                <img
                src={require("../assets/chevron-down.png")}
                alt="Arrow"
                ></img>
            </div>
            <div className="answer">
                <p>
                During an earthquake, drop to the ground, take cover under a
                sturdy table or desk, and hold on until the shaking stops. If
                you're indoors, evacuate the building after the shaking stops,
                avoiding elevators and damaged stairs. Move away from buildings,
                trees, and power lines. If you're driving, pull over to a clear
                location, stop, and stay inside the vehicle until the shaking
                stops.
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}
