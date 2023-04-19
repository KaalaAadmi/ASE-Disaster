

// import bbox from "turf";
// import polygon from "turf";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import axios from "axios";
import { markerData } from "../assets/data";
import { rr_create_obstacle, rr_avoid_obstacle } from "./direction_rr";
import { getResourses, clearRoutes } from "./reroute";
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from "../api/Order";
import {
	createDisasterMarker,
	createSafeHouseMarker,
	createHospitalMarker,
	createGardaMarker,
	createFirestationMarker,
	clearMarker,
} from "./OrderMarkers";

const { addRoute_safehouse } = require('./evacuation');
const { addRoute_hospital } = require('./reroute');
const { addRoute_garda } = require('./reroute');
const { addRoute_firestation } = require('./reroute');



// mapbox token
const REACT_APP_MAPBOX_TOKEN =
	"pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN;

let loc_hospitals = null;
let loc_firestations = null;
let loc_safehouses = null;
let loc_gardi = null;
let disasterJson = null;
let obstacle = null;
//let disasterLocation = null;

const OrderMap = (props) => {
	const { id } = useParams();
	// create references for the map
	const mapContainer = useRef(null);
	const map = useRef(null);

	const [selectedOrder, setSelectedOrder] = React.useState(id || "");
	const [orderData, setOrderData] = React.useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const order = await getOrder(id);
				console.log(order);
				setOrderData(order.order);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
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
	useEffect(() => {
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

			map.current.addControl(directions_rr, 'top-left');


			// Add origin and destination to the map direction
			map.current.on("load", function () {
				//directions_rr.setOrigin([marker.longitude, marker.latitude]);
				//directions.setDestination([-6.25819, 53.344415]);

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

				//generateRoutesForDisasters(disasterJson);
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
	// New function to clear markers and routes
	const clearMarkersAndRoutes = () => {
		// Clear existing markers and routes
		// ...
		console.log('clearMarkersAndRoutes');
		clearRoutes(map.current);
	};

	const generateOrderRoute = async (orderData) => {
		if (orderData && orderData.location) {
			clearMarkersAndRoutes();
			clearMarker();

			const resourceLocation = {
				lat: parseFloat(orderData.latitude),
				lng: parseFloat(orderData.longitude),
				id: orderData.location._id,
			};

			const disasterLocation = {
				lat: parseFloat(orderData.location.latitude),
				lng: parseFloat(orderData.location.longitude),
				id: orderData.disaster._id,
			};

			switch (orderData.resource) {
				case 'rest centre':
					createSafeHouseMarker([orderData.location], map);
					addRoute_safehouse(map.current, disasterLocation, resourceLocation);
					break;

				case 'ambulance':
					createHospitalMarker([orderData.location], map);
					addRoute_hospital(map.current, disasterLocation, resourceLocation);
					break;

				case 'garda':
					createGardaMarker([orderData.location], map);
					addRoute_garda(map.current, disasterLocation, resourceLocation);
					break;

				case 'fire':
					createFirestationMarker([orderData.location], map);
					addRoute_firestation(map.current, disasterLocation, resourceLocation);
					break;

				default:
					console.log('Resource type not recognized');
					break;
			}
		}
	};

	React.useEffect(() => {
		if (map.current && orderData) {
			generateOrderRoute(orderData);
		}
	}, [orderData]);

	if ((viewState.latitude && viewState.longitude)) {
		return (
			<div>
				{
					<>
						{/* Add lower div to display the current position of the user --> for testing use */}
						{/* <div className="sidebar">
              You current location: <br /> Longitude: {marker.longitude} |
              Latitude: {marker.latitude}
            </div> */}
						{/* Add a sidebar to display the list of disasters */}
						<div className="disaster-sidebar">
							<h3>Instructions</h3>
							<ul>
								{orderData.instuctions}
							</ul>
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

export default OrderMap;