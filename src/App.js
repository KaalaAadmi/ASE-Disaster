import React from "react";
import "./App.css";
import Maps from "./components/Map";
import News from "./components/News";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginScreen from './screens/LoginScreen/LoginScreen';
import DisasterResponse from "./components/DisasterResponse";
import ReportDisaster from './screens/ReportDisaster/ReportDisaster';
import CreateDisaster from './screens/CreateDisaster/CreateDisaster';
import MessageHQ from './screens/MessageHQ/MessageHQ';


function App() {
  const [location, setLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  return (
    <div>
      <Navbar />
      {/* <FAQ /> */}
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
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/report-disaster' element={<ReportDisaster/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/create-disaster' element={<CreateDisaster/>}/>
          <Route path='/message-hq' element={<MessageHQ/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
