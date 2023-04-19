import axios from "axios";

// const BACKEND = `http://127.0.0.1:8000/api/v1`;
const BACKEND='https://disaster-backend.onrender.com/api/v1'

export const addReport = async (type, latitude, longitude, details, token) => {
    try {
        if(details==""){
            alert("Please Add Details");
        }
        else if(latitude=="" || longitude==""){
            alert("Please Add Location Data");
        }
        else if(type==""){
            alert("Please Select Type");
        }
        else{
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
        }
    } catch (error) {
        console.error(error);
        alert("ERROR - Could not submit report.");
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
        return response.data;
    } catch (error) {
        console.error(error);
        alert("ERROR - Could not get report records.");
    }
};

export const getIndividualReport = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BACKEND}/report/${id}`,
            headers: { }
        };
        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        alert("ERROR - Could not get individual report record.");
    }
};

export const updateReport = async (id, details) => {
    try {
        let data = JSON.stringify(details);
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BACKEND}/update-report/${id}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        alert("ERROR - Could not update report record.");
    }
};