import mapboxgl from "mapbox-gl";

let safehouseMarkers = [];
let hospitalMarkers = [];
let gardaMarkers = [];
let firestationMarkers = [];

export function createDisasterMarker(orderData, map) {
	console.log(orderData);
	const disaster = new mapboxgl.Marker({ color: "yellow" })
		.setLngLat([orderData.locationLongitude, orderData.locationLatitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(orderData.disaster))
		.addTo(map.current);
}

export function createSafeHouseMarker(safehouseData, map) {

	console.log(safehouseData);
	const el = document.createElement("div");
	el.className = "marker_safehouse";

	const marker_sh = new mapboxgl.Marker(el)
		.setLngLat([safehouseData.latitude, safehouseData.longitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(safehouseData.Name))
		.addTo(map.current)
		.togglePopup();
	safehouseMarkers.push(marker_sh);
}

export function createHospitalMarker(hospitalData, map) {
	console.log(hospitalData);
	const el = document.createElement("div");
	el.className = "marker_hospital";

	const marker_hs = new mapboxgl.Marker(el)
		.setLngLat([hospitalData.latitude, hospitalData.longitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(hospitalData.Name))
		.addTo(map.current)
		.togglePopup();
	hospitalMarkers.push(marker_hs);
}

export function createGardaMarker(gardaData, map) {
	console.log(gardaData);
	const el = document.createElement("div");
	el.className = "marker_garda";

	const maker_garda = new mapboxgl.Marker(el)
		.setLngLat([gardaData.latitude, gardaData.longitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(gardaData.Name))
		.addTo(map.current)
		.togglePopup();
	gardaMarkers.push(maker_garda);
}

export function createFirestationMarker(firestationData, map) {
	console.log(firestationData);
	const el = document.createElement("div");
	el.className = "marker_firestation";

	const marker_fs = new mapboxgl.Marker(el)
		.setLngLat([firestationData.latitude, firestationData.longitude])
		.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(firestationData.Name))
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
