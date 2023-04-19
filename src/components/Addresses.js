import axios from "axios";

const accessToken =
  "pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

export const getAddressFromLatLng = (latitude, longitude, setAddress = () => {}, setAddresses = () => {}, index = () => {}) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

  axios.get(apiUrl)
    .then((response) => {
      const features = response.data.features;
      if (features.length > 0) {
        const address = features[0].place_name;
        console.log(address);
        setAddress(address ?? "");
        setAddresses(prevAddresses => ({ ...prevAddresses, [index]: address }));
      } else {
        console.log('No address found');
      }
    })
    .catch((error) => {
      console.log(error);
      console.log('Error retrieving data');
    })
};  

export const getCurrentLoc = (setLatitude, setLongitude) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLongitude(position.coords.longitude);
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${accessToken}`
          )
          .then((response) => {
            if (response.data.features.length > 0) {
              document.getElementById("location").value =
                response.data.features[0].place_name;
            } else {
              alert("No results found");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Error retrieving data");
          });
      });
    } else {
      console.log("Not Available");
    }
  };

const validAddressRegex = /^(\d+[\s\S]*$|^[^\d].*$)/;

export const getPosition = async (address, setAddress, setLatitude, setLongitude) => {
    if (!validAddressRegex.test(address)) {
        alert("Invalid address format.");
        return;
    }
    setAddress(address);
    const encodedAddress = encodeURIComponent(address);
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${accessToken}`
      )
      .then((response) => {
        if (response.data.features.length > 0) {
          setLatitude(response.data.features[0].center[1]);
          console.log("Latitude is :", response.data.features[0].center[1]);
          setLongitude(response.data.features[0].center[0]);
          console.log("Longitude is :", response.data.features[0].center[0]);
        } else {
          alert("Location Not Found");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error retrieving data");
      });
  };