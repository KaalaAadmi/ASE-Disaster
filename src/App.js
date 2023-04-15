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
import ActivateResponse from './screens/ActivateResponse/ActivateResponse';
import SendResources from './screens/SendResources/SendResources';
import Bulletin from "./components/Bulletin";
import ViewReports from "./screens/ViewReports/ViewReports";

function App() {
  const [location, setLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Bulletin />} />
          <Route path="/news" element={<News />} />
          <Route path="/bulletin" element={<Bulletin />} />
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
          <Route path='/activate-response' element={<ActivateResponse/>}/>
          <Route path='/send-resources' element={<SendResources/>}/>
          <Route path='/view-reports' element={<ViewReports/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
