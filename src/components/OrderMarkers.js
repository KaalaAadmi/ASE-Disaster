import mapboxgl from "mapbox-gl";

let safehouseMarkers = [];
let hospitalMarkers = [];
let gardaMarkers = [];
let firestationMarkers = [];

export function createDisasterMarker(orderData, map) {
	console.log(orderData);
	const disaster = new mapboxgl.Marker({ color: "yellow" })
		.setLngLat([orderData[0].Location.lat, orderData[0].Location.lng])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(orderData[0].disaster))
		.addTo(map.current);
}

export function createSafeHouseMarker(safehouseData, map) {

	console.log(safehouseData);
	const el = document.createElement("div");
	el.className = "marker_safehouse";

	const marker_sh = new mapboxgl.Marker(el)
		.setLngLat([safehouseData[0].Location.lat, safehouseData[0].Location.lng])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(safehouseData[0].Name))
		.addTo(map.current)
		.togglePopup();
	safehouseMarkers.push(marker_sh);
}

export function createHospitalMarker(hospitalData, map) {
	console.log("hospital", hospitalData);
	console.log("map", map);
	const el = document.createElement("div");
	el.className = "marker_hospital";

	const marker_hs = new mapboxgl.Marker(el)
		.setLngLat([hospitalData[0].Location.lat, hospitalData[0].Location.lng])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(hospitalData[0].Name))
		.addTo(map.current)
		.togglePopup();
	hospitalMarkers.push(marker_hs);
}

export function createGardaMarker(gardaData, map) {
	console.log(gardaData);
	const el = document.createElement("div");
	el.className = "marker_garda";

	const maker_garda = new mapboxgl.Marker(el)
		.setLngLat([gardaData[0].Location.lat, gardaData[0].Location.lng])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(gardaData[0].Name))
		.addTo(map.current)
		.togglePopup();
	gardaMarkers.push(maker_garda);
}

export function createFirestationMarker(firestationData, map) {
	console.log(firestationData);
	const el = document.createElement("div");
	el.className = "marker_firestation";

	const marker_fs = new mapboxgl.Marker(el)
		.setLngLat([firestationData[0].Location.lat, firestationData[0].Location.lng])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(firestationData[0].Name))
		.addTo(map.current)
		.togglePopup();
	firestationMarkers.push(marker_fs);
}

export const clearMarker = () => {
	safehouseMarkers.forEach((marker) => {
		marker.remove();
	});
	safehouseMarkers = [];

	hospitalMarkers.forEach((marker) => {
		marker.remove();
	});
	hospitalMarkers = [];

	gardaMarkers.forEach((marker) => {
		marker.remove();
	});
	gardaMarkers = [];

	firestationMarkers.forEach((marker) => {
		marker.remove();
	});
	firestationMarkers = [];
};
