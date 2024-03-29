import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import axios from "axios";
import { markerData } from "../assets/data";
import { rr_create_obstacle, rr_avoid_obstacle } from "./direction_rr";
import { getResourses, clearRoutes } from "./reroute";

import {
  createDisasterMarker,
  createSafeHouseMarker,
  createHospitalMarker,
  createGardaMarker,
  createFirestationMarker,
  createBusMarker,
  clearMarkers,
} from "./markers";

const { addRoute_safehouse } = require("./evacuation");
const { addRoute_hospital } = require("./reroute");
const { addRoute_garda } = require("./reroute");
const { addRoute_firestation } = require("./reroute");
const { addRoute_bus } = require("./reroute");

// mapbox token
const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAP_TOKEN;

mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN;

let loc_hospitals = null;
let loc_firestations = null;
let loc_safehouses = null;
let loc_gardi = null;
let loc_bus = null;
let disasterJson = null;
let obstacle = null;

const Map = (props) => {
  // create references for the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedDisaster, setSelectedDisaster] = React.useState(null);
  const [disasterData, setDisasterData] = React.useState();
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://disaster-backend.onrender.com/api/v1/active-disaster-data"
        );
        disasterJson = res.data;
        obstacle = rr_create_obstacle(disasterJson);
        setDisasterData(res.data);
      } catch (error) {}
    };
    getData();
  }, []);
  const [viewState, setViewState] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 13, // make this 16 for production
  });
  const [marker, setMarker] = React.useState({
    latitude: props.latitude,
    longitude: props.longitude,
  });
  // Getting the actual user location through gps
  React.useEffect(() => {
    if (!viewState.latitude && !viewState.longitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewState((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [viewState.latitude, viewState.longitude]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (viewState.latitude && viewState.longitude) {
      // Add map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v9",
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        pitch: 50,
      });
      // Add NavigationControl to the map
      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, "bottom-right");
      // Add GeoLocateControl to the map
      const geoLocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: false,
      });
      map.current.addControl(geoLocate);
      //add reroute navigationControl to the map
      const directions_rr = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        alternatives: false,
        geometries: "geojson",
        controls: { instructions: false },
        flyTo: false,
      });
      map.current.addControl(directions_rr, "top-left");
      // Add origin and destination to the map direction
      map.current.on("load", function () {
        // Source and layer for clearance
        map.current.addLayer({
          id: "clearances",
          type: "fill",
          source: {
            type: "geojson",
            data: obstacle,
          },
          layout: {},
          paint: {
            "fill-color": "#f03b20",
            "fill-opacity": 0.5,
            "fill-outline-color": "#f03b20",
          },
        });
        // Source and layer for the route
        map.current.addSource("theRoute", {
          type: "geojson",
          data: {
            type: "Feature",
          },
        });
        map.current.addLayer({
          id: "theRoute",
          type: "line",
          source: "theRoute",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#cccccc",
            "line-opacity": 0.5,
            "line-width": 5,
            "line-blur": 0.5,
          },
        });
        // Source and layer for the bounding box
        map.current.addSource("theBox", {
          type: "geojson",
          data: {
            type: "Feature",
          },
        });
        map.current.addLayer({
          id: "theBox",
          type: "fill",
          source: "theBox",
          layout: {},
          paint: {
            "fill-color": "#FFC300",
            "fill-opacity": 0.5,
            "fill-outline-color": "#FFC300",
          },
        });
      });
      directions_rr.on("clear", () => {
        map.current.setLayoutProperty("theRoute", "visibility", "none");
        map.current.setLayoutProperty("theBox", "visibility", "none");
      });
      directions_rr.on("route", (event) => {
        rr_avoid_obstacle(event, obstacle, directions_rr, map);
      });
    }
  }, [viewState.latitude, viewState.longitude]);
  // New function to clear markers and routes
  const clearMarkersAndRoutes = () => {
    // Clear existing markers and routes
    clearRoutes(map.current);
  };
  const generateRoutesForSelectedDisaster = async (
    disasters,
    selectedDisaster
  ) => {
    if (selectedDisaster) {
      clearMarkersAndRoutes();
      clearMarkers();
      const disaster = disasters.find((d) => d._id === selectedDisaster);
      if (disaster) {
        // Fetch resources for the current disaster
        const loc_safehouses = await getResourses(disaster._id, "rest centre");
        const loc_hospitals = await getResourses(disaster._id, "ambulance");
        const loc_gardi = await getResourses(disaster._id, "garda");
        const loc_firestations = await getResourses(disaster._id, "fire");
        const loc_bus = await getResourses(disaster._id, "buses");
        const disasterLocation = {
          lat: disaster.latitude,
          lng: disaster.longitude,
          id: disaster._id,
        };
        // Call the route creation functions for each type of resource and disaster
        if (loc_safehouses !== null && loc_safehouses.length !== 0) {
          createSafeHouseMarker(
            [loc_safehouses[loc_safehouses.length - 1]],
            map
          );
          addRoute_safehouse(
            map.current,
            disasterLocation,
            loc_safehouses[loc_safehouses.length - 1]
          );
        }
        if (loc_hospitals !== null && loc_hospitals.length !== 0) {
          createHospitalMarker([loc_hospitals[loc_hospitals.length - 1]], map);
          addRoute_hospital(
            map.current,
            disasterLocation,
            loc_hospitals[loc_hospitals.length - 1]
          );
        }
        if (loc_gardi !== null && loc_gardi.length !== 0) {
          createGardaMarker([loc_gardi[loc_gardi.length - 1]], map);
          addRoute_garda(
            map.current,
            disasterLocation,
            loc_gardi[loc_gardi.length - 1]
          );
        }
        if (loc_firestations !== null && loc_firestations.length !== 0) {
          createFirestationMarker(
            [loc_firestations[loc_firestations.length - 1]],
            map
          );
          addRoute_firestation(
            map.current,
            disasterLocation,
            loc_firestations[loc_firestations.length - 1]
          );
        }
        if (loc_bus !== null && loc_bus.length != 0) {
          createBusMarker([loc_bus[loc_bus.length - 1]], map);
          addRoute_bus(
            map.current,
            disasterLocation,
            loc_bus[loc_bus.length - 1]
          );
        }
      }
    }
  };
  React.useEffect(() => {
    if (map.current && disasterJson && selectedDisaster) {
      generateRoutesForSelectedDisaster(disasterJson, selectedDisaster);
    }
  }, [selectedDisaster]);
  if (viewState.latitude && viewState.longitude) {
    return (
      <div>
        {
          <>
            {/* Add a sidebar to display the list of disasters */}
            <div className="disaster-sidebar">
              <h3>Disasters</h3>
              <ul>
                {disasterData &&
                  disasterData.map((disaster) => (
                    <li
                      key={disaster._id}
                      onClick={() => setSelectedDisaster(disaster._id)}
                    >
                      {disaster.disasterName} ({disaster._id})
                    </li>
                  ))}
              </ul>
            </div>
            {/* Add the map to the screen */}
            <div ref={mapContainer} className="map-container" />
          </>
        }
      </div>
    );
  } else {
    return (
      <div>
        <h1>Give location permission</h1>
      </div>
    );
  }
};

export default Map;
