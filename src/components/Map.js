import { addCard, noRoutes } from "./reroute";
import polyline from '@mapbox/polyline';
// import bbox from "turf";
// import polygon from "turf";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import axios from "axios";
import { markerData } from "../assets/data";
//import clearances from "./clearances";
import * as turf from "@turf/turf";
import "./reroute.css";
// import { disasterData } from "../assets/data";

import loc_safehouses from './locs_safehouse.json';
import loc_hospitals from './locs_hospital.json';

const { getNearestSafehouse } = require('./haversine');
const { addRoute_safehouse } = require('./evacuation');
const { addRoute_hospital } = require('./reroute');
// mapbox token
const REACT_APP_MAPBOX_TOKEN =
	"pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN;


const Map = (props) => {
		// create references for the map
		const mapContainer = useRef(null);
		const map = useRef(null);

		function createDisasterMarker(disasterDataset) {
			console.log(typeof disasterDataset);
			for (var i = 0; i < disasterDataset.length; i++) {
				const disaster = new mapboxgl.Marker({ color: "yellow" })
					.setLngLat([disasterDataset[i].longitude, disasterDataset[i].latitude])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(disasterDataset[i].detail)
					)
					.addTo(map.current);
			}
		}

		function createSafeHouseMarker(safehouse_loc) {
			console.log(typeof safehouse_loc);
			for (var i = 0; i < safehouse_loc.length; i++) {
				const disaster = new mapboxgl.Marker({ color: "green" })
					.setLngLat([safehouse_loc[i].Location.lng, safehouse_loc[i].Location.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(safehouse_loc[i].Name)
					)
					.addTo(map.current)
				//	.togglePopup();
			}
		}
		
		function createHospitalMarker(loc_hospitals) {
			console.log(typeof loc_hospitals);
			for (var i = 0; i < loc_hospitals.length; i++) {
				const disaster = new mapboxgl.Marker({ color: "red" })
					.setLngLat([loc_hospitals[i].Location.lng, loc_hospitals[i].Location.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(loc_hospitals[i].Name)
					)
					.addTo(map.current)
				//	.togglePopup();
			}
		}

		const [disasterData, setDisasterData] = React.useState();
		React.useEffect(() => {
			const getData = async () => {
				try {
					const res = await axios.get(
						"http://127.0.0.1:8000/api/v1/all-disaster-data"
					);
					console.log(res.data)
					setDisasterData(res.data);
					createDisasterMarker(res.data);

				} catch (error) {
					console.log(error);
				}
			};
			getData();
		}, [disasterData]);


		const [viewState, setViewState] = React.useState({
			latitude: 0,
			longitude: 0,
			zoom: 13, // make this 16 for production
		});
		const [marker, setMarker] = React.useState({
			latitude: props.latitude,
			longitude: props.longitude,
			// center: [props.latitude, props.longitude],
		});

		// Getting the actual user location through gps
		React.useEffect(() => {
			if (!viewState.latitude && !viewState.longitude) {
				navigator.geolocation.getCurrentPosition((position) => {
					setViewState((prev) => ({
						...prev,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						// center: [position.coords.longitude, position.coords.latitude],
					}));
					setMarker({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						// center: [position.coords.longitude, position.coords.latitude],
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
					style: "mapbox://styles/mapbox/dark-v9",
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
					unit: 'metric',
					profile: 'mapbox/driving',
					alternatives: false,
					geometries: 'geojson',
					controls: { instructions: false },
					flyTo: false
				});

				map.current.addControl(directions_rr, 'top-right');

				let counter = 0;
				const maxAttempts = 50;
				let emoji = '';
				let collision = '';
				let detail = '';
				const reports = document.getElementById('reports');
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
				const obstacle = turf.buffer(clearances, 0.500, { "unit": 'kilometers' });
				console.log(obstacle)
				let bbox = [0, 0, 0, 0];
				let polygon = turf.bboxPolygon(bbox);


				// Add origin and destination to the map direction
				map.current.on("load", function() {
					//directions_rr.setOrigin([marker.longitude, marker.latitude]);
					//directions.setDestination([-6.25819, 53.344415]);

					createSafeHouseMarker(loc_safehouses)					
					createHospitalMarker(loc_hospitals)
					console.log(loc_safehouses)

					// Source and layer for clearance
					map.current.addLayer({
						id: 'clearances',
						type: 'fill',
						source: {
							type: 'geojson',
							data: obstacle
						},
						layout: {},
						paint: {
							'fill-color': '#f03b20',
							'fill-opacity': 0.5,
							'fill-outline-color': '#f03b20'
						}
					});

					// Source and layer for the route
					map.current.addSource('theRoute', {
						type: 'geojson',
						data: {
							type: 'Feature'
						}
					});

					map.current.addLayer({
						id: 'theRoute',
						type: 'line',
						source: 'theRoute',
						layout: {
							'line-join': 'round',
							'line-cap': 'round'
						},
						paint: {
							'line-color': '#cccccc',
							'line-opacity': 0.5,
							'line-width': 13,
							'line-blur': 0.5
						}
					});

					// Source and layer for the bounding box
					map.current.addSource('theBox', {
						type: 'geojson',
						data: {
							type: 'Feature'
						}
					});
					map.current.addLayer({
						id: 'theBox',
						type: 'fill',
						source: 'theBox',
						layout: {},
						paint: {
							'fill-color': '#FFC300',
							'fill-opacity': 0.5,
							'fill-outline-color': '#FFC300'
						}
					});

					//add the route after the map is on
					const disasterLocation = {
						lat: marker.latitude,
						lng: marker.longitude
					};

					//const nearestSafehouse = getNearestSafehouse(disasterLocation, loc_safehouses);
					//console.log(`The nearest loc_safehouses is ${nearestSafehouse.Name}`);
					addRoute_safehouse(map.current, disasterLocation, loc_safehouses);
					addRoute_hospital(map.current, disasterLocation, loc_hospitals);
				});



				directions_rr.on('clear', () => {
					map.current.setLayoutProperty('theRoute', 'visibility', 'none');
					map.current.setLayoutProperty('theBox', 'visibility', 'none');

					counter = 0;
					reports.innerHTML = '';
				});

				directions_rr.on('route', (event) => {
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
								const randomWaypoint = turf.randomPoint(1, { bbox: bbox });
								directions_rr.setWaypoint(
									0,
									randomWaypoint['features'][0].geometry.coordinates
								);
							}
							// Add a new report section to the sidebar
							addCard(counter, reports, clear, detail);
							console.log(clear)
						}
					}
				});




				// Add the user location marker
				const origin = new mapboxgl.Marker()
					.setLngLat([marker.longitude, marker.latitude])
					.addTo(map.current);

			}
		}, [viewState.latitude, viewState.longitude]);

  if ((viewState.latitude && viewState.longitude))
  {
    return (
      <div>
        {
          <>
            {/* Add lower div to display the current position of the user --> for testing use */}
            <div className="sidebar">
              You current location: <br /> Longitude: {marker.longitude} |
              Latitude: {marker.latitude}
            </div>
			<div className="sidebarRR">
			  <h1>Reports</h1>
			  <div id="reports"></div>
			</div>
            {/* Add the map to the screen */}
            <div ref={mapContainer} className="map-container" />
          </>
        } 

      </div>
      
    );
  }
  else {
    return (
      <div><h1>Give location permission</h1></div>
    )
  }
};

export default Map;