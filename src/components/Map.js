// import React from "react";
// import Map, { Marker, GeolocateControl, NavigationControl } from "react-map-gl";

// import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

// export default function Maps(props) {
//   // Setting the map and marker states
//   const [viewState, setViewState] = React.useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 16
//   });
//   const [marker, setMarker] = React.useState({
//     latitude: props.latitude,
//     longitude: props.longitude
//     // center: [props.latitude, props.longitude],
//   });
//   // Getting the actual user location through gps
//   React.useEffect(() => {
//     if (!props.latitude && !props.longitude) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setViewState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//           // center: [position.coords.longitude, position.coords.latitude],
//         });
//         setMarker({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//           // center: [position.coords.longitude, position.coords.latitude],
//         });
//       });
//     }
//   }, [props.latitude, props.longitude]);
//   console.log(`lat: ${viewState.latitude}, long: ${viewState.longitude}`);

//   return (
//     <div>
//       <Map
//         // ref={mapRef.current}
//         {...viewState}
//         onMove={(evt) =>
//           setViewState({
//             ...viewState,
//             latitude: evt.viewState.latitude,
//             longitude: evt.viewState.longitude
//           })
//         }
//         style={{ width: "100vw", height: "100vh" }}
//         mapStyle="mapbox://styles/mapbox/dark-v10"
//         mapboxAccessToken={MAPBOX_TOKEN}
//         pitch={50}
//         center={viewState.center}
//       >
//         <Marker
//           longitude={marker.longitude}
//           latitude={marker.latitude}
//           anchor="bottom"
//           color="lightblue"
//         />
//         {/* <MapboxDirections
//             mapRef={mapRef.current}
//             mapboxApiAccessToken={MAPBOX_TOKEN}
//           /> */}
//         <GeolocateControl
//           trackUserLocation
//           position="top-right"
//           showAccuracyCircle={false}
//         />
//         <NavigationControl position="bottom-right" />
//       </Map>
//     </div>
//   );
// }

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Updating node module will keep css up to date.
import { markerData } from "../assets/data";
import { disasterData } from "../assets/data";

// mapbox token
const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN;

const Map = (props) => {
  // Creating all the report markers -- for coordinator 
  function createReportMarker() {
    console.log(typeof markerData);
    for (var i = 0; i < markerData.length; i++) {
      const report = new mapboxgl.Marker({ color: "red" })
        .setLngLat([markerData[i].longitude, markerData[i].latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(markerData[i].description)
        )
        .addTo(map.current);
    }
  }

  // Creating all the disaster markers -- for both coordinator and general public
  function createDisasterMarker() {
    console.log(typeof disasterData);
    for (var i = 0; i < disasterData.length; i++) {
      const disaster = new mapboxgl.Marker({ color: "yellow" })
        .setLngLat([disasterData[i].longitude, disasterData[i].latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(
            disasterData[i].description
          )
        )
        .addTo(map.current);
    }
  }
  // Setting the map and marker states
  const [viewState, setViewState] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 13 // make this 16 for production
  });
  const [marker, setMarker] = React.useState({
    latitude: props.latitude,
    longitude: props.longitude
    // center: [props.latitude, props.longitude],
  });

  // Getting the actual user location through gps
  React.useEffect(() => {
    if (!viewState.latitude && !viewState.longitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewState((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
          // center: [position.coords.longitude, position.coords.latitude],
        }));
        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
          // center: [position.coords.longitude, position.coords.latitude],
        });
      });
    }
  }, [viewState.latitude, viewState.longitude]);

  // create references for the map
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (viewState.latitude && viewState.longitude) {
      // Add map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v9",
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        pitch: 50
      });

      // Add NavigationControl to the map
      const nav = new mapboxgl.NavigationControl();
      map.current.addControl(nav, "bottom-right");

      // Add GeoLocateControl to the map
      const geoLocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: false
      });
      map.current.addControl(geoLocate);

      // Add Directions to the map
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/walking"
      });

      // Add origin and destination to the map direction
      map.current.on("load", function () {
        directions.setOrigin([marker.longitude, marker.latitude]);
        directions.setDestination([-6.25819, 53.344415]);
      });
      // map.current.addControl(directions, "top-left");

      // Add the user location marker
      const origin = new mapboxgl.Marker()
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map.current);
      // Add the destination marker
      // const destination = new mapboxgl.Marker({ color: "red" })
      //   .setLngLat([-6.25819, 53.344415])
      //   .addTo(map.current);

      // console.log(markerData);
      // markerData?.map((item) => {
      //   const marker = new mapboxgl.Marker({ color: "red" })
      //     .setLngLat([item.longitude, item.latitude])
      //     .addTo(map.current);
      // });

      // Add the report markers
      createReportMarker();

      // Add the disaster markers
      createDisasterMarker();
    }
  }, [viewState.latitude, viewState.longitude]);

  return (
    <div>
      {viewState.latitude && viewState.longitude && (
        <>
          {/* Add lower div to display the current position of the user --> for testing use */}
          <div className="sidebar">
            You current location: <br /> Longitude: {marker.longitude} |
            Latitude: {marker.latitude}
          </div>
          {/* Add the map to the screen */}
          <div ref={mapContainer} className="map-container" />
        </>
      )}
    </div>
  );
};

export default Map;
