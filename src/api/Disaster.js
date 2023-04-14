import axios from "axios";

const BACKEND = `http://127.0.0.1:8000/api/v1`;

export const activateDisaster = async (id, type, radius, size, site, disasterName, disasterDescription) => {
    try {
        let data = JSON.stringify({
            "type": type,
            "radius": parseInt(radius),
            "size": parseInt(size),
            "site": site,
            "disasterName": disasterName,
            "disasterDescription": disasterDescription,
            "evacuation": false
        });
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BACKEND}/activate-disaster/${id}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// I AM NOT SURE THE BEST APPROACH FOR THIS... e.g. how should the details come in
export const updateDisaster = async (id, details) => {
    try {
        let data = JSON.stringify(details);
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BACKEND}/activate-disaster/${id}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const resolveDisaster = async (id) => {
    try {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BACKEND}/resolve-disaster/${id}`,
            headers: { 
              'Content-Type': 'application/json'
            }
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCurrentDisasters = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/relevant-disaster-data`,
            headers: { }
        };
        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getActiveDisasters = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/active-disaster-data`,
            headers: { }
        };
        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllDisasters = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/all-disaster-data`,
            headers: { }
        };
        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getIndividualDisaster = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/disaster/${id}`,
            headers: { }
        };
        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addReportToDisaster = async (disasterID, reportID) => {
    try {
        let data = JSON.stringify({ "reportId": reportID });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BACKEND}/add-report-to-disaster/${disasterID}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
};