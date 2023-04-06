import polyline from '@mapbox/polyline';
import * as turf from "@turf/turf";
import "./reroute.css";
import {
	addCard,
	noRoutes
} from "./reroute";

let counter = 0;
const maxAttempts = 50;
let emoji = '';
let collision = '';
let detail = '';
const reports = document.getElementById('reports');
let bbox = [0, 0, 0, 0];
let polygon = turf.bboxPolygon(bbox);

export function rr_create_obstacle(marker) {
	const clearances = {
		type: 'FeatureCollection',
		features: [{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [marker.longitude, marker.latitude]
				},
				properties: {
					clearance: "13' 2"
				}
			},
			{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [marker.longitude + 0.02, marker.latitude + 0.004]
				},
				properties: {
					clearance: "13' 7"
				}
			}
		]
	};
	console.log(clearances)
	const obstacle = turf.buffer(clearances, 0.500, {
		"unit": 'kilometers'
	});
	console.log(obstacle)
	return obstacle;
}

export function rr_avoid_obstacle(event, obstacle, directions_rr, map) {
	// Hide the route and box by setting the opacity to zero
	map.current.setLayoutProperty('theRoute', 'visibility', 'none');
	map.current.setLayoutProperty('theBox', 'visibility', 'none');
	//  console.log(counter)
	// console.log(maxAttempts)
	//  console.log(event)

	if (counter >= maxAttempts) {
		noRoutes(reports);
	} else {
		// Make each route visible
		for (const route of event.route) {
			// Make each route visible
			map.current.setLayoutProperty('theRoute', 'visibility', 'visible');
			map.current.setLayoutProperty('theBox', 'visibility', 'visible');

			// Get GeoJSON LineString feature of route
			console.log(route.geometry)
			const routeLine = polyline.toGeoJSON(route.geometry);
			//	 console.log(routeLine)
			// Create a bounding box around this route
			// The app will find a random point in the new bbox
			bbox = turf.bbox(routeLine);
			polygon = turf.bboxPolygon(bbox);

			// Update the data for the route
			// This will update the route line on the map
			console.log(routeLine)
			map.current.getSource('theRoute').setData(routeLine);
			const layer = map.current.getLayer('theRoute');
			console.log(layer)
			// Update the box
			map.current.getSource('theBox').setData(polygon);
			const clear = turf.booleanDisjoint(obstacle, routeLine);
			console.log(routeLine)
			console.log(obstacle)
			if (clear === true) {
				collision = 'does not intersect any obstacles!';
				detail = `takes ${(route.duration / 60).toFixed(
				  0
				)} minutes and avoids`;
				emoji = '✔️';
				map.current.setPaintProperty('theRoute', 'line-color', '#74c476');
				// Hide the box
				map.current.setLayoutProperty('theBox', 'visibility', 'none');
				// Reset the counter
				counter = 0;
			} else {
				// Collision occurred, so increment the counter
				counter = counter + 1;
				// As the attempts increase, expand the search area
				// by a factor of the attempt count
				polygon = turf.transformScale(polygon, counter * 0.1);
				bbox = turf.bbox(polygon);
				collision = 'is bad.';
				detail = `takes ${(route.duration / 60).toFixed(
				  0
				)} minutes and hits`;
				emoji = '⚠️';
				map.current.setPaintProperty('theRoute', 'line-color', '#de2d26');

				// Add a randomly selected waypoint to get a new route from the Directions API
				const randomWaypoint = turf.randomPoint(1, {
					bbox: bbox
				});
				directions_rr.setWaypoint(
					0,
					randomWaypoint['features'][0].geometry.coordinates
				);
			}
			console.log(clear)
		}
	}
}