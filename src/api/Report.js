import axios from "axios";

const BACKEND = `http://127.0.0.1:8000/api/v1`;

export default class Report {
    constructor(type, latitude, longitude, details) {
        this.type = type;
        this.latitude = latitude;
        this.longitude = longitude;
        this.details = details;
    }

    async submit(token) {
        try {
            let data = JSON.stringify({
                "detail": this.details,
                "latitude": this.latitude,
                "longitude": this.longitude,
                "type": this.type.toLowerCase()
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
    }

    async getAll() {
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
    }
}