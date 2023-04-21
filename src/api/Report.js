// Report.js is used to handle Report related API calls.
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.BACKEND_URL;

/**
 * Add a new report to the system.
 *
 * @param {string} type - The type of the report (e.g. "fire", "flood", "earthquake").
 * @param {number} latitude - The latitude coordinate of the report location.
 * @param {number} longitude - The longitude coordinate of the report location.
 * @param {string} details - Additional details about the report.
 * @param {string} token - The authentication token for the current user.
 * @returns {Promise<void>} - A Promise that resolves when the report has been added successfully.
 * @throws {Error} - If there is an error while adding the report.
 */
export const addReport = async (type, latitude, longitude, details, token) => {
  try {
    if (details == "") {
      toast.error("Please Add Details", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (latitude == "" || longitude == "") {
      toast.error("Please Add Location", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (type == "") {
      toast.error("Please Add Type", {
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
      let data = JSON.stringify({
        detail: details,
        latitude: latitude,
        longitude: longitude,
        type: type.toLowerCase(),
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BACKEND}/add-report-data`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      if (response.status === 200) {
        toast.success("Report Added Successfully!", {
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
    }
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
 * Fetches all reports from the backend server.
 *
 * @returns {Array} Array of report objects, where each report has the following properties:
 *                   - id: string
 *                   - disasterId: string
 *                   - reporterName: string
 *                   - reporterEmail: string
 *                   - description: string
 *                   - imageUrl: string
 *                   - location: string
 *                   - status: string (either "PENDING" or "VERIFIED")
 *
 * @throws {Error} If there is an error while fetching the data.
 */
export const getReports = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/all-report-data`,
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
 * Retrieves the individual disaster report with the specified ID.
 * @param {string} id - The ID of the disaster report to retrieve.
 * @returns {Promise<string>} A Promise that resolves with the JSON stringified data of the individual disaster report.
 * @throws {Error} If an error occurs while retrieving the report data, an error message will be displayed to the user.
 */
export const getIndividualReport = async (id) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND}/report/${id}`,
      headers: {},
    };
    const response = await axios.request(config);
    return JSON.stringify(response.data);
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
 * Updates the report with the given ID using the provided details.
 * @async
 * @param {string} id - The ID of the report to update.
 * @param {Object} details - An object containing the updated report details.
 * @throws {Error} If an error occurs while updating the report.
 */
export const updateReport = async (id, details) => {
  try {
    let data = JSON.stringify(details);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${BACKEND}/update-report/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
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
