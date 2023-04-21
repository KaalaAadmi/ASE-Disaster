import axios from "axios";
import { toast } from "react-toastify";

const accessToken = process.env.REACT_APP_MAP_TOKEN;

/**
 * Fetches the address from latitude and longitude coordinates using Mapbox API
 * and updates the address state and addresses object.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {function} setAddress - A function to set the address state of the location.
 * @param {function} setAddresses - A function to set the addresses state object.
 * @param {number} index - An optional index parameter to set the address in the addresses state object.
 *
 * @returns {void}
 */
export const getAddressFromLatLng = (
  latitude,
  longitude,
  setAddress = () => {},
  setAddresses = () => {},
  index = () => {}
) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const features = response.data.features;
      if (features.length > 0) {
        const address = features[0].place_name;
        setAddress(address ?? "");
        setAddresses((prevAddresses) => ({
          ...prevAddresses,
          [index]: address,
        }));
      } else {
        toast.error("No Address Found!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    })
    .catch((error) => {
      toast.error("Error Occurred! Try Again Later", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
};

/**
 * Get the current location of the user and update the latitude and longitude states.
 *
 * @param {Function} setLatitude - A function that sets the latitude state.
 * @param {Function} setLongitude - A function that sets the longitude state.
 *
 * @returns {void}
 *
 * @throws {Error} If geolocation is not supported by the browser.
 */
export const getCurrentLoc = (setLatitude, setLongitude) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
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
            toast.error("No Results Found", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          toast.error("Error Occurred! Try Again Later", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    });
  } else {
    toast.error("Unavailable", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

// regex to check if address is valid
const validAddressRegex = /^(\d+[\s\S]*$|^[^\d].*$)/;

/**
 * Retrieve the latitude and longitude of a given address using the Mapbox Geocoding API.
 *
 * @param {string} address - The address to retrieve the coordinates for.
 * @param {function} setAddress - The function to update the address state with the provided value.
 * @param {function} setLatitude - The function to update the latitude state with the retrieved value.
 * @param {function} setLongitude - The function to update the longitude state with the retrieved value.
 * @returns {void}
 */
export const getPosition = async (
  address,
  setAddress,
  setLatitude,
  setLongitude
) => {
  if (!validAddressRegex.test(address)) {
    toast.error("Invalid Address Format", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
        setLongitude(response.data.features[0].center[0]);
      } else {
        toast.error("Location Not Found", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    })
    .catch((error) => {
      toast.error("Error Occurred! Try Again Later", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
};
