import axios from "axios";

const BACKEND = `http://127.0.0.1:8000/api/v1`;

export const addReport = async (type, latitude, longitude, details, token) => {
    try {
        let data = JSON.stringify({
            "detail": details,
            "latitude": latitude,
            "longitude": longitude,
            "type": type.toLowerCase()
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BACKEND}/add-report-data`,
            headers: { 
                'Authorization':`Bearer ${token}`,
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

export const getReports = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/all-report-data`,
            headers: { }
        };
        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// THIS ISN'T WORKIING
// export const getIndividualReport = async (id) => {
//     try {
//         let config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: `${BACKEND}/report/${id}`,
//             headers: { }
//         };
//         const response = await axios.request(config);
//         return JSON.stringify(response.data);
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };