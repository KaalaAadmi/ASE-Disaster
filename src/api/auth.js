import axios from "axios";

const BACKEND = `http://127.0.0.1:8000/api/v1`;

const AUTH_URL = `${BACKEND}/auth`;

const storageEvent = new Event("storageEvent");

export const login = async (email, password, setIsAuthenticated) => {
    try {
        let data = JSON.stringify({
            "email": email,
            "password": password
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${AUTH_URL}/login`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios.request(config);

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        window.dispatchEvent(storageEvent);
        console.log(`HELP: ${response.data.isAdmin}`);
        setIsAuthenticated(true);
        console.log(JSON.stringify(response.data));
        console.log("Successful Login!")
    } catch (error) {
        if (error.response.status === 401) {
            console.log("Incorrect email or password");
        // Display an error message to the user here
        } else {
            console.log("An error occurred: " + error.message);
        }
    }
}


export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${AUTH_URL}/logout`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.request(config);
        localStorage.removeItem("token", response.data.accessToken);
        localStorage.removeItem("isAdmin", response.data.isAdmin);
        window.dispatchEvent(storageEvent);
        console.log("Successful Logout!")
    } catch (error) {
        console.error(error);
        throw error;
    }
};
