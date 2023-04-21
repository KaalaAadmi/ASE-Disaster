// Order.js is used to handle the Order-related API calls
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

/**
 * Sends a request for disaster response resources to the backend server.
 *
 * @param {string} id - The ID of the disaster for which to request resources.
 * @param {number} ambulance - The number of ambulance units to request.
 * @param {number} police - The number of police units to request.
 * @param {number} fireTruck - The number of fire truck units to request.
 * @param {number} buses - The number of buses to request.
 * @param {boolean} helicopter - Whether to request a helicopter or not.
 * @param {boolean} evacBool - Whether to request evacuation or not.
 *
 * @throws {Error} If there was an error requesting resources.
 * @returns {Promise<object>} A Promise that resolves to the response data from the server.
 */
export const requestResponders = async (
  id,
  ambulance,
  police,
  fireTruck,
  buses,
  helicopter,
  evacBool
) => {
  try {
    console.log(helicopter);
    let data = JSON.stringify({
      disasterId: id,
      ambulance: ambulance,
      police: police,
      fireTruck: fireTruck,
      buses: buses,
      helicopter: helicopter,
      evacuation: evacBool,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BACKEND}/request-resources`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    if (response.data.message !== "Resources Requested.") {
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
    } else {
      toast.success("Resources Requested Successfully!", {
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
    return response.data;
  } catch (error) {
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
  }
};

/**
 * Fetches the disaster orders for a specific disaster.
 *
 * @param {string} id - The ID of the disaster for which to fetch orders.
 * @returns {Array} An array of objects representing the disaster orders.
 * @throws {Error} If an error occurs while fetching the disaster orders.
 */
export const disasterOrders = async (id) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/disaster-orders/${id}`,
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
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
  }
};

/**
 * Retrieves all orders from the backend.
 *
 * @async
 * @function getAllOrders
 * @returns {Promise<Array>} Returns a promise that resolves with an array of order data retrieved from the backend.
 * @throws {Error} Throws an error if an error occurs while retrieving the data from the backend.
 */
export const getAllOrders = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/all-order-data`,
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
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
  }
};

/**
 * Returns an order object for the specified ID by making an API request to the backend.
 *
 * @async
 * @function getOrder
 * @param {number} id - The ID of the order to retrieve.
 * @returns {Promise<Object>} - An order object containing details of the order.
 * @throws {Error} - If an error occurs while fetching the order data.
 */
export const getOrder = async (id) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/order/${id}`,
      headers: {},
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
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
  }
};
