import mapboxgl from "mapbox-gl";

let safehouseMarkers = []; // Add this line at the beginning of your code, outside the function

let hospitalMarkers = [];
let gardaMarkers = [];
let firestationMarkers = [];
let busMarkers = [];
export const createDisasterMarker = (disasterDataset, map) => {
  //	console.log(typeof disasterDataset);
  for (var i = 0; i < disasterDataset.length; i++) {
    const disaster = new mapboxgl.Marker({ color: "yellow" })
      .setLngLat([disasterDataset[i].longitude, disasterDataset[i].latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setText(
          disasterDataset[i].disasterName
        )
      )
      .addTo(map.current);
  }
};

//todo: rest centre coordinates reversed, to be fixed in the backend.
export const createSafeHouseMarker = (safehouse_loc, map) => {
  //console.log(typeof safehouse_loc);
  for (var i = 0; i < safehouse_loc.length; i++) {
    const el = document.createElement("div");
    el.className = "marker_safehouse";

    const marker_sh = new mapboxgl.Marker(el)
      //.setLngLat([safehouse_loc[i].Location.lng, safehouse_loc[i].Location.lat])
      .setLngLat([safehouse_loc[i].Location.lat, safehouse_loc[i].Location.lng])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setText(safehouse_loc[i].Name)
      )
      .addTo(map.current)
      .togglePopup();
    safehouseMarkers.push(marker_sh);
  }
};
//https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
export const createHospitalMarker = (loc_hospitals, map) => {
  for (var i = 0; i < loc_hospitals.length; i++) {
    // Create a DOM element for each marker.
    const el = document.createElement("div");
    el.className = "marker_hospital";
  }
};

export const createGardaMarker = (loc_gardi, map) => {
  //console.log(typeof loc_gardi);
  console.log(loc_gardi);
  for (var i = 0; i < loc_gardi.length; i++) {
    const el = document.createElement("div");
    el.className = "marker_garda";

    const maker_garda = new mapboxgl.Marker(el)
      .setLngLat([loc_gardi[i].Location.lng, loc_gardi[i].Location.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(loc_gardi[i].Name))
      .addTo(map.current)
      .togglePopup();
    gardaMarkers.push(maker_garda);
  }
};

export const createBusMarker = (loc_bus, map) => {
  //console.log(typeof loc_gardi);
  console.log(loc_bus);
  for (var i = 0; i < loc_bus.length; i++) {
    const el = document.createElement("div");
    el.className = "marker_bus";

    const maker_bus = new mapboxgl.Marker(el)
      .setLngLat([loc_bus[i].Location.lng, loc_bus[i].Location.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(loc_bus[i].Name))
      .addTo(map.current)
      .togglePopup();
    gardaMarkers.push(maker_bus);
  }
};

export const createFirestationMarker = (loc_firestations, map) => {
  //console.log(typeof loc_firestations);
  for (var i = 0; i < loc_firestations.length; i++) {
    //https://docs.mapbox.com/help/tutorials/markers-js/
    //https://labs.mapbox.com/maki-icons/

    const el = document.createElement("div");
    el.className = "marker_firestation";
    const marker_fs = new mapboxgl.Marker(el)
      .setLngLat([
        loc_firestations[i].Location.lng,
        loc_firestations[i].Location.lat,
      ])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setText(loc_firestations[i].Name)
      )
      .addTo(map.current)
      .togglePopup();
    firestationMarkers.push(marker_fs);
  }
};

export const clearMarkers = () => {
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

  firestationMarkers.forEach((marker) => {
    marker.remove();
  });
  firestationMarkers = [];

  busMarkers.forEach((marker) => {
    marker.remove();
  });
  busMarkers = [];
};
