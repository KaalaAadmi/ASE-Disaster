import mapboxgl from "mapbox-gl";

export	function createDisasterMarker(disasterDataset,map) {
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

//todo: rest centre coordinates reversed, to be fixed in the backend.
export	function createSafeHouseMarker(safehouse_loc, map) {
			//console.log(typeof safehouse_loc);
			for (var i = 0; i < safehouse_loc.length; i++) {
				const el = document.createElement('div');
				el.className = 'marker_safehouse';
				
				const marker_sh = new mapboxgl.Marker(el)
					//.setLngLat([safehouse_loc[i].Location.lng, safehouse_loc[i].Location.lat])
					.setLngLat([safehouse_loc[i].Location.lat, safehouse_loc[i].Location.lng])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(safehouse_loc[i].Name)
					)
					.addTo(map.current)
					.togglePopup();
			}
		}
		//https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
export	function createHospitalMarker(loc_hospitals, map) {
			for (var i = 0; i < loc_hospitals.length; i++) {
				// Create a DOM element for each marker.
				const el = document.createElement('div');
				el.className = 'marker_hospital';

				const marker_hs = new mapboxgl.Marker(el)
					.setLngLat([loc_hospitals[i].Location.lng, loc_hospitals[i].Location.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(loc_hospitals[i].Name)
					)
					.addTo(map.current)
					.togglePopup();
			}
		}

export	function createGardaMarker(loc_gardi, map) {
			console.log(typeof loc_gardi);
			console.log(loc_gardi);
			for (var i = 0; i < loc_gardi.length; i++) {
				const el = document.createElement('div');
				el.className = 'marker_garda';
				
				const maker_garda = new mapboxgl.Marker(el)
					.setLngLat([loc_gardi[i].Location.lng, loc_gardi[i].Location.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(loc_gardi[i].Name)
					)
					.addTo(map.current)
					.togglePopup();
			}
		}
		
export function createFirestationMarker(loc_firestations, map) {
			//console.log(typeof loc_firestations);
			for (var i = 0; i < loc_firestations.length; i++) {
				//https://docs.mapbox.com/help/tutorials/markers-js/
				//https://labs.mapbox.com/maki-icons/
						
				const el = document.createElement('div');
				el.className = 'marker_firestation';
				const marker_fs = new mapboxgl.Marker(el)
					.setLngLat([loc_firestations[i].Location.lng, loc_firestations[i].Location.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setText(loc_firestations[i].Name)
					)
					.addTo(map.current)
					.togglePopup();
			}
		}
		