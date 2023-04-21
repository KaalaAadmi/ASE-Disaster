// Auth.js is used to handle the login and logout process of the user.
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const AUTH_URL = `${BACKEND}/auth`;
const storageEvent = new Event("storageEvent");
console.log("Auth URL", AUTH_URL)
/**
 * Attempts to log in the user with the given email and password.
 * If the login is successful, stores the access token and isAdmin flag in local storage,
 * sets the isAuthenticated state to true, and displays a success message.
 * If the login is unsuccessful, displays an appropriate error message.
 *
 * @param {string} email - The email address of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @param {function} setIsAuthenticated - A state setter function to set the isAuthenticated state.
 * @returns {void}
 */
export const login = async (email, password, setIsAuthenticated) => {
  try {
    let data = JSON.stringify({
      email: email,
      password: password,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${AUTH_URL}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("isAdmin", response.data.isAdmin);
    window.dispatchEvent(storageEvent);
    setIsAuthenticated(true);
    toast.success("Logged In Successfully", {
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
    if (error.response.status === 401) {
      toast.error("Incorrect email or password", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Display an error message to the user here
    } else {
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
  }
};

/**
 * Logs out the currently authenticated user by sending a request to the server to invalidate the access token.
 * Removes the access token and isAdmin flag from local storage, sets the isAuthenticated state to false,
 * and displays a success message. If an error occurs during the logout process, displays an error message.
 *
 * @returns {void}
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${AUTH_URL}/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    localStorage.removeItem("token", response.data.accessToken);
    localStorage.removeItem("isAdmin", response.data.isAdmin);
    window.dispatchEvent(storageEvent);
    toast.success("Logged Out Successfully", {
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
