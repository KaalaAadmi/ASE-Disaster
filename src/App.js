import React from "react";
import "./App.css";
import Maps from "./components/Map";
import News from "./components/News";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DisasterResponse from "./components/DisasterResponse";

function App() {
  const [location, setLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  return (
    <div>
      <Navbar />
      <FAQ />
      {/* <Maps
        latitude={location.latitude}
        longitude={location.longitude}
        onChange={setLocation}
      /> */}
      {/* <News location={location} onChange={setLocation}/> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/disaster-response" element={ <DisasterResponse />} />
          <Route
            path="/maps"
            element={
              <Maps
                latitude={location.latitude}
                longitude={location.longitude}
                onChange={setLocation}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
