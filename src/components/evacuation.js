import axios from "axios";
import polyline from '@mapbox/polyline';

// mapbox token
const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

const { getNearestSafehouse } = require('./haversine');

export function addRoute(map, disasterLocation, safehouses) {
  // get the nearest safehouse from the disaster location
  const nearestSafehouse = getNearestSafehouse(disasterLocation, safehouses);

		map.addSource('evacuation_route', {
		  type: 'geojson',
		  data: {
			type: 'Feature'
		  }
		});
		
		// Check if the source exists
		const source = map.getSource('evacuation_route');
		if (source) {
		  console.log('Source added successfully');
		} else {
		  console.log('Source not added');
		}

        map.addLayer({
          id: "evacuation_route",
          type: "line",
          source: "evacuation_route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            'line-color': 'green',
            'line-opacity': 0.5,
            'line-width': 13,
            'line-blur': 0.5
          }
        });
		// Check if the layer exists
		const layer = map.getLayer('evacuation_route');
		if (layer) {
		  console.log('Layer added successfully');
		  console.log(layer)
		} else {
		  console.log('Layer not added');
		}
		
  // use the Mapbox Directions API to get the route from the disaster location to the nearest safehouse
  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${disasterLocation.lng},${disasterLocation.lat};${nearestSafehouse.Location.lng},${nearestSafehouse.Location.lat}?access_token=${REACT_APP_MAPBOX_TOKEN}`;

  axios.get(directionsUrl)
    .then(response => {
      const route = response.data.routes[0].geometry;
	  const routeLine = polyline.toGeoJSON(route);
	  console.log(routeLine)

      // check if the "evacuation_route" layer exists and update it if it does, otherwise add a new layer
      const layerExists = map.getLayer("evacuation_route");
      if (layerExists) {
        map.getSource('evacuation_route').setData(routeLine);
      } else {
        //map.addSource('evacuation_route', sourceObj);


      }

      // make the "evacuation_route" layer visible
      map.setLayoutProperty('evacuation_route', 'visibility', 'visible');
	  console.log(map)
    })
    .catch(error => {
      console.log(error);
    });
}
