import axios from "axios";
import polyline from "@mapbox/polyline";

//reroute report
export let counter = 0;
export const maxAttempts = 50;
export let emoji = "";
export let collision = "";
export let detail = "";
export const reports = document.getElementById("reports");

// mapbox token
const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAP_TOKEN;

const { getNearestSafehouse } = require("./haversine");

export function addCard(id, element, clear, detail) {
  const card = document.createElement("div");
  card.className = "card";
  // Add the response to the individual report created above
  const heading = document.createElement("div");
  // Set the class type based on clear value
  heading.className =
    clear === true ? "card-header route-found" : "card-header obstacle-found";
  heading.innerHTML =
    id === 0
      ? `${emoji} The route ${collision}`
      : `${emoji} Route ${id} ${collision}`;

  const details = document.createElement("div");
  details.className = "card-details";
  details.innerHTML = `This ${detail} obstacles.`;

  card.appendChild(heading);
  card.appendChild(details);
  element.insertBefore(card, element.firstChild);
}

export function noRoutes(element) {
  const card = document.createElement("div");
  card.className = "card";
  // Add the response to the individual report created above
  const heading = document.createElement("div");
  heading.className = "card-header no-route";
  emoji = "🛑";
  heading.innerHTML = `${emoji} Ending search.`;

  // Add details to the individual report
  const details = document.createElement("div");
  details.className = "card-details";
  details.innerHTML = `No clear route found in ${counter} tries.`;

  card.appendChild(heading);
  card.appendChild(details);
  element.insertBefore(card, element.firstChild);
}

function mapJSONArray(inputArray, resource_name_backend) {
  const outputArray = [];

  inputArray.forEach((input) => {
    if (input.resource === resource_name_backend) {
      outputArray.push({
        Name: input._id,
        Location: {
          lat: parseFloat(input.locationLatitude),
          lng: parseFloat(input.locationLongitude),
        },
        Quantity: parseInt(input.quantity),
        Instructions: input.instructions,
        Status: input.status,
      });
    }
  });

  return outputArray;
}

export function getResourses(disasterId, resource_name) {
  const orderUrl = `http://127.0.0.1:8000/api/v1/disaster-orders/${disasterId}`;
  return axios
    .get(orderUrl)
    .then((response) => {
      const locs_for_rr = mapJSONArray(response.data, resource_name);
      return locs_for_rr;
    })
    .catch((error) => {});
}

export function addRoute_hospital(map, disasterLocation, hospital) {
  // get the nearest hospital from the disaster location

  const nearesthospital = hospital;
  // use the Mapbox Directions API to get the route from the disaster location to the nearest safehouse
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${disasterLocation.lng},${disasterLocation.lat};${nearesthospital.Location.lng},${nearesthospital.Location.lat}?access_token=${REACT_APP_MAPBOX_TOKEN}`;

  map.addSource("hospital_route", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });

  map.addLayer({
    id: "hospital_route",
    type: "line",
    source: "hospital_route",
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
      const layerExists = map.getLayer("hospital_route");
      if (layerExists) {
        map.getSource("hospital_route").setData(routeLine);
      } else {
      }

      // make the "hospital_route" layer visible
      map.setLayoutProperty("hospital_route", "visibility", "visible");
    })
    .catch((error) => {});
}

export function addRoute_garda(map, disasterLocation, garda) {
  // get the nearest hospital from the disaster location
  const nearestGarda = garda;
  // use the Mapbox Directions API to get the route from the disaster location to the nearest garda
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${disasterLocation.lng},${disasterLocation.lat};${nearestGarda.Location.lng},${nearestGarda.Location.lat}?access_token=${REACT_APP_MAPBOX_TOKEN}`;

  map.addSource("garda_route", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });

  map.addLayer({
    id: "garda_route",
    type: "line",
    source: "garda_route",
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

      // check if the "garda_route" layer exists and update it if it does, otherwise add a new layer
      const layerExists = map.getLayer("garda_route");
      if (layerExists) {
        map.getSource("garda_route").setData(routeLine);
      } else {
      }

      // make the "garda_route" layer visible
      map.setLayoutProperty("garda_route", "visibility", "visible");
    })
    .catch((error) => {});
}

export function addRoute_firestation(map, disasterLocation, fire_station) {
  // get the nearest hospital from the disaster location
  const nearestFireStation = fire_station;
  // use the Mapbox Directions API to get the route from the disaster location to the nearest garda
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${disasterLocation.lng},${disasterLocation.lat};${nearestFireStation.Location.lng},${nearestFireStation.Location.lat}?access_token=${REACT_APP_MAPBOX_TOKEN}`;

  map.addSource("fs_route", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });

  map.addLayer({
    id: "fs_route",
    type: "line",
    source: "fs_route",
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

      // check if the "garda_route" layer exists and update it if it does, otherwise add a new layer
      const layerExists = map.getLayer("fs_route");
      if (layerExists) {
        map.getSource("fs_route").setData(routeLine);
      } else {
      }

      // make the "fs_route" layer visible
      map.setLayoutProperty("fs_route", "visibility", "visible");
    })
    .catch((error) => {});
}

export function addRoute_bus(map, disasterLocation, bus_station) {
  // get the nearest hospital from the disaster location
  const nearestBusStation = bus_station;
  // use the Mapbox Directions API to get the route from the disaster location to the nearest garda
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${disasterLocation.lng},${disasterLocation.lat};${nearestBusStation.Location.lng},${nearestBusStation.Location.lat}?access_token=${REACT_APP_MAPBOX_TOKEN}`;

  map.addSource("bs_route", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });

  map.addLayer({
    id: "bs_route",
    type: "line",
    source: "bs_route",
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

      // check if the "garda_route" layer exists and update it if it does, otherwise add a new layer
      const layerExists = map.getLayer("bs_route");
      if (layerExists) {
        map.getSource("bs_route").setData(routeLine);
      } else {
      }

      // make the "bs_route" layer visible
      map.setLayoutProperty("bs_route", "visibility", "visible");
    })
    .catch((error) => {});
}

// mapUtils.js
export const clearRoutes = (map) => {
  // Resource types and their corresponding layer IDs
  const resourceTypes = ["hospital", "evacuation", "garda", "fs", "bs"];

  // Remove layers and sources for each resource type
  resourceTypes.forEach((resourceType) => {
    // Check if the route layer exists and remove it
    if (map.getLayer(`${resourceType}_route`)) {
      map.removeLayer(`${resourceType}_route`);
    }

    // Check if the route source exists and remove it
    if (map.getSource(`${resourceType}_route`)) {
      map.removeSource(`${resourceType}_route`);
    }
  });
};
