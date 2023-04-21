// Disaster.js is used to handle the disaster-related API calls.
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

/**
 * Activates a disaster by sending a PUT request to the server with the provided parameters.
 * The PUT request updates the specified disaster's type, radius, size, site, name, and description.
 *
 * @param {string} id - The ID of the disaster to activate
 * @param {string} type - The type of the disaster
 * @param {number} radius - The radius of the disaster in meters
 * @param {number} size - The size of the disaster in hectares
 * @param {string} site - The site of the disaster
 * @param {string} disasterName - The name of the disaster
 * @param {string} disasterDescription - The description of the disaster
 * @returns {void}
 */
export const activateDisaster = async (
  id,
  type,
  radius,
  size,
  site,
  disasterName,
  disasterDescription
) => {
  try {
    let data = JSON.stringify({
      type: type,
      radius: parseInt(radius),
      size: parseInt(size),
      site: site,
      disasterName: disasterName,
      disasterDescription: disasterDescription,
      evacuation: false,
    });
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${BACKEND}/activate-disaster/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    toast.success("Disaster Activated Successfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    toast.error("Could Not Fetch Disaster Data", {
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
 * Updates the details of a disaster with the specified ID.
 *
 * @param {string} id - The ID of the disaster to update.
 * @param {Object} details - An object containing the updated details for the disaster.
 * @throws {Error} If an error occurs while updating the disaster.
 * @returns {Promise<void>} A Promise that resolves when the disaster has been successfully updated.
 */
export const updateDisaster = async (id, details) => {
  try {
    let data = JSON.stringify(details);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${BACKEND}/update-disaster/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    toast.success("Disaster Updated Successfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
 * Resolve a disaster with the given ID.
 *
 * @param {string} id - The ID of the disaster to be resolved.
 * @throws {Error} Throws an error if an error occurs while resolving the disaster.
 * @returns {Promise<void>} - Returns a Promise that resolves with no value when the disaster is successfully resolved.
 */
export const resolveDisaster = async (id) => {
  try {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${BACKEND}/resolve-disaster/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);
    toast.success("Disaster Resolved", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
 * Fetches relevant disaster data from the backend API.
 *
 * @returns {Object} An object containing relevant disaster data.
 * @throws {Error} If an error occurs while fetching the data.
 */
export const getRelevantDisasters = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/relevant-disaster-data`,
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
 * Retrieve pending disaster records from the server.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing pending disaster records.
 *
 * @throws {Error} If an error occurs while attempting to retrieve the pending disaster records.
 */
export const getPendingDisasters = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/pending-disaster-data`,
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
 * Retrieves a list of active disasters from the server.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} An array of objects representing active disasters. Each object contains
 *                              information about the disaster, including its type, radius, size, location,
 *                              and other details.
 * @throws {Error} If there is an error retrieving the data from the server, an error is thrown.
 *                 The error message will indicate that the active disaster records could not be retrieved.
 */
export const getActiveDisasters = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/active-disaster-data`,
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
 * Retrieves all disaster data from the backend.
 *
 * @returns {Promise<Array>} An array of objects containing information about all disasters.
 * @throws {Error} If an error occurs while fetching the data.
 */
export const getAllDisasters = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/all-disaster-data`,
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
 * Retrieve information about a single disaster by ID from the backend API.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier for the disaster to retrieve.
 * @returns {Promise<object>} - The data for the specified disaster.
 * @throws {Error} - If an error occurs while attempting to retrieve the data.
 */
export const getIndividualDisaster = async (id) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/disaster/${id}`,
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
 * Adds a report to the specified disaster.
 *
 * @param {string} disasterID - The ID of the disaster to add the report to.
 * @param {string} reportID - The ID of the report to add to the disaster.
 * @returns {boolean} - Returns true if the report was added successfully, false otherwise.
 * @throws {Error} - Throws an error if an error occurs while making the request to the server.
 */
export const addReportToDisaster = async (disasterID, reportID) => {
  try {
    let data = JSON.stringify({ reportId: reportID });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BACKEND}/add-report-to-disaster/${disasterID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return true;
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
