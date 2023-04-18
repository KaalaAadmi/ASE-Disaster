import axios from "axios";

const BACKEND = `http://127.0.0.1:8000/api/v1`;

export const requestResponders = async (id, ambulance, police, fireTruck, buses, helicopter, evacBool) => {
    try {
        let data = JSON.stringify({
            "disasterId": id,
            "ambulance": ambulance,
            "police": police,
            "fireTruck": fireTruck,
            "buses": buses,
            "helicopter": helicopter,
            "evacuation": evacBool
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BACKEND}/request-resources`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const disasterOrders = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/disaster-orders/${id}`,
            headers: { }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/all-order-data`,
            headers: { }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/// THIS MIGHT NOT BE WORKING IN THE BACKEND..
export const getOrder = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/order/${id}`,
            headers: { }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};