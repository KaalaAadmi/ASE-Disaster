

// import bbox from "turf";
// import polygon from "turf";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import axios from "axios";
import { markerData } from "../assets/data";
import {rr_create_obstacle, rr_avoid_obstacle} from "./direction_rr";
import {getResourses} from "./reroute";

import loc_safehouses from './locs_safehouse.json';
import loc_hospitals from './locs_hospital.json';
//import loc_gardi from './locs_garda.json';
import loc_firestations from './locs_firestation.json';

import {
  createDisasterMarker,
  createSafeHouseMarker,
  createHospitalMarker,
  createGardaMarker,
  createFirestationMarker,
} from "./markers";

const { addRoute_safehouse } = require('./evacuation');
const { addRoute_hospital } = require('./reroute');
const { addRoute_garda} = require('./reroute');
const { addRoute_firestation} = require('./reroute');



// mapbox token
const REACT_APP_MAPBOX_TOKEN =
	"pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN;

let loc_gardi = null;
let disasterJson=null;
let obstacle = null;
let disasterLocation = null;

const Map = (props) => {
		// create references for the map
		const mapContainer = useRef(null);
		const map = useRef(null);

		
		const [disasterData, setDisasterData] = React.useState();

		React.useEffect(() => {
			const getData = async () => {
				try {
					const res = await axios.get("http://127.0.0.1:8000/api/v1/active-disaster-data");
					disasterJson=res.data
					console.log(disasterJson)
					obstacle = rr_create_obstacle(disasterJson);
					setDisasterData(res.data);
					disasterLocation = {
						lat: disasterJson[0].latitude,
						lng: disasterJson[0].longitude,
						id: disasterJson[0]._id
					};
					
					loc_gardi = await getResourses(disasterJson[0]._id, 'garda');
					console.log(loc_gardi);

				} catch (error) {
					console.log(error);
				}
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
					unit: 'metric',
					profile: 'mapbox/driving',
					alternatives: false,
					geometries: 'geojson',
					controls: { instructions: false },
					flyTo: false
				});

				map.current.addControl(directions_rr, 'top-right');
				
				

				// Add origin and destination to the map direction
				map.current.on("load", function() {
					//directions_rr.setOrigin([marker.longitude, marker.latitude]);
					//directions.setDestination([-6.25819, 53.344415]);

					//createSafeHouseMarker(loc_safehouses, map);					
					//createHospitalMarker(loc_hospitals, map);
					
					//createFirestationMarker(loc_firestations, map);
					
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
							'line-width': 5,
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

					// Add the disaster location marker
					const origin = new mapboxgl.Marker()
						//.setLngLat([marker.longitude, marker.latitude])
						.setLngLat([disasterLocation.lng, disasterLocation.lat])
						.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(disasterLocation.id))
						.addTo(map.current)
						.togglePopup();
					
					//const nearestSafehouse = getNearestSafehouse(disasterLocation, loc_safehouses);
					//console.log(`The nearest loc_safehouses is ${nearestSafehouse.Name}`);
					//addRoute_safehouse(map.current, disasterLocation, loc_safehouses);
					//addRoute_hospital(map.current, disasterLocation, loc_hospitals);
					const lastElement = [loc_gardi[loc_gardi.length - 1]];
					createGardaMarker(lastElement, map);
					addRoute_garda(map.current, disasterLocation, loc_gardi[loc_gardi.length - 1]);
					//addRoute_garda(map.current, disasterLocation, loc_gardi);
					//addRoute_firestation(map.current, disasterLocation, loc_firestations);
				});



				directions_rr.on('clear', () => {
					map.current.setLayoutProperty('theRoute', 'visibility', 'none');
					map.current.setLayoutProperty('theBox', 'visibility', 'none');

					//reports.innerHTML = '';
				});

				directions_rr.on('route', (event) => {
					rr_avoid_obstacle(event, obstacle, directions_rr, map);
				});
				

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