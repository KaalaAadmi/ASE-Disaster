import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import axios from "axios";
import "./styles.css";
import { disasterData, markerData } from "../assets/data";
import { rr_create_obstacle, rr_avoid_obstacle } from "./direction_rr";
import { getActiveDisasters } from "../api/Disaster";
import { getResourses, clearRoutes } from "./reroute";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../api/Order";
import {
  createDisasterMarker,
  createSafeHouseMarker,
  createHospitalMarker,
  createGardaMarker,
  createFirestationMarker,
  clearMarkers,
} from "./markers";

import polyline from "@mapbox/polyline";

const { addRoute_safehouse } = require("./evacuation");
const { addRoute_hospital } = require("./reroute");
const { addRoute_garda } = require("./reroute");
const { addRoute_firestation } = require("./reroute");

// mapbox token
const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAP_TOKEN;

mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN;

let obstacle = null;

const OrderMap = (props) => {
  const { id } = useParams();
  // create references for the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedOrder, setSelectedOrder] = React.useState(id);
  const [orderData, setOrderData] = React.useState({});
  const [disasterData, setDisasterData] = React.useState();
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
  useEffect(() => {
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

  const fetchData = async () => {
    try {
      const disastersResponse = await getActiveDisasters();
      setDisasterData(disastersResponse);
      obstacle = await rr_create_obstacle(disastersResponse);
      const response = await getOrder(selectedOrder);
      await setOrderData(response.order);
    } catch (error) {}
  };

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
        fetchData();
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
  }, [viewState.latitude, viewState.longitude, fetchData]);
  useEffect(() => {
    if (map.current && orderData) {
      generateOrderRoute(orderData);
    }
  }, [orderData]);

  // New function to clear markers and routes
  const clearMarkersAndRoutes = () => {
    // Clear existing markers and routes
    clearRoutes(map.current);
    clearMarkers();
  };
  const generateOrderRoute = async (orderData) => {
    if (orderData && orderData.location) {
      const location = [
        {
          Instructions: orderData.instructions,
          Location: {
            lat: parseFloat(orderData.location.latitude),
            lng: parseFloat(orderData.location.longitude),
          },
          Name: orderData.location.name,
          Quantity: parseInt(orderData.quantity),
          Status: orderData.status,
        },
      ];
      const resourceLocation = {
        lat: parseFloat(orderData.location.latitude),
        lng: parseFloat(orderData.location.longitude),
        id: orderData.location._id,
      };
      const disasterLocation = {
        lat: parseFloat(orderData.disaster.latitude),
        lng: parseFloat(orderData.disaster.longitude),
        name: orderData.disaster.disasterName,
      };
      createDisasterMarker([orderData.disaster], map);
      createGenericMarker(location, map);
      addRoute(map.current, disasterLocation, resourceLocation);
    }
  };

  function createGenericMarker(location, map) {
    for (var i = 0; i < location.length; i++) {
      const resource = new mapboxgl.Marker({ color: "red" })
        .setLngLat([location[i].Location.lng, location[i].Location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(location[i].Name))
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
			  <h3>${location[i].Name}</h3>
			  <p>Instructions: ${location[i].Instructions}</p>
			`);
      resource.setPopup(popup);
    }
  }

  function addRoute(map, disasterLocation, hospital) {
    // get the nearest hospital from the disaster location
    const nearesthospital = hospital;
    // use the Mapbox Directions API to get the route from the disaster location to the nearest safehouse
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${disasterLocation.lng},${disasterLocation.lat};${nearesthospital.lng},${nearesthospital.lat}?access_token=${REACT_APP_MAPBOX_TOKEN}`;
    map.addSource("resource_route", {
      type: "geojson",
      data: {
        type: "Feature",
      },
    });
    map.addLayer({
      id: "order_layer",
      type: "line",
      source: "resource_route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "red",
        "line-opacity": 0.5,
        "line-width": 8,
        "line-blur": 0.5,
      },
    });

    axios
      .get(directionsUrl)
      .then((response) => {
        const route = response.data.routes[0].geometry;
        const routeLine = polyline.toGeoJSON(route);
        // check if the "hospital_route" layer exists and update it if it does, otherwise add a new layer
        const layerExists = map.getLayer("order_layer");
        if (layerExists) {
          map.getSource("resource_route").setData(routeLine);
        } else {
        }
        // make the "hospital_route" layer visible
        map.setLayoutProperty("resource_route", "visibility", "visible");
      })
      .catch((error) => {});
  }

  if (viewState.latitude && viewState.longitude) {
    return (
      <div>
        {
          <>
            {/* Add a sidebar to display the list of disasters */}
            <div className="instruction-sidebar">
              <h1>INFORMATION</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Instructions</th>
                    <td>{orderData.instructions}</td>
                  </tr>
                  <tr>
                    <th>Units Required</th>
                    <td>{orderData.quantity}</td>
                  </tr>
                </tbody>
              </table>
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

export default OrderMap;
