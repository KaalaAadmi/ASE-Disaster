import axios from "axios";
import polyline from "@mapbox/polyline";

// mapbox token
const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAP_TOKEN;

const { getNearestSafehouse } = require("./haversine");

// it seems like the lng and lat are reversed from backend for rest centre?
export function addRoute_safehouse(map, disasterLocation, safehouse) {
  // get the nearest safehouse from the disaster location
  const nearestSafehouse = safehouse;
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${disasterLocation.lng},${disasterLocation.lat};${nearestSafehouse.Location.lat},${nearestSafehouse.Location.lng}?access_token=${REACT_APP_MAPBOX_TOKEN}`;
  // use the Mapbox Directions API to get the route from the disaster location to the nearest safehouse
  map.addSource("evacuation_route", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });
  map.addLayer({
    id: "evacuation_route",
    type: "line",
    source: "evacuation_route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "green",
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
      // check if the "evacuation_route" layer exists and update it if it does, otherwise add a new layer
      const layerExists = map.getLayer("evacuation_route");
      if (layerExists) {
        map.getSource("evacuation_route").setData(routeLine);
      } else {
      }
      // make the "evacuation_route" layer visible
      map.setLayoutProperty("evacuation_route", "visibility", "visible");
    })
    .catch((error) => {});
}
