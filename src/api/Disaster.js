import axios from "axios";

const BACKEND = `http://127.0.0.1:8000/api/v1`;

export default class Disaster {
    constructor(id, type, radius, size, site, name, description) {
        this.id = id;
        this.disasterName = name;
        this.disasterDescription = description;
        this.type = type;
        this.radius = radius;
        this.size = size;
        this.site = site;
        this.evacuation = false;
    }

    async activate() {
        try {
            let data = JSON.stringify({
                "type": this.type,
                "radius": parseInt(this.radius),
                "size": parseInt(this.size),
                "site": this.site,
                "disasterName": this.disasterName,
                "disasterDescription": this.disasterDescription,
                "evacuation": this.evacuation
            });
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${BACKEND}/activate-disaster/${this.id}`,
                headers: {
                'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(details) {
        try {
            let data = JSON.stringify(details);
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${BACKEND}/activate-disaster/${this.id}`,
                headers: {
                'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async resolve() {
        try {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${BACKEND}/resolve-disaster/${this.id}`,
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
    }

    static async getCurrentDisasters() {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${BACKEND}/relevant-disaster-data`,
                headers: {}
            };
            const response = await axios.request(config);
            return JSON.stringify(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getActiveDisasters() {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${BACKEND}/active-disaster-data`,
                headers: {}
            };
            const response = await axios.request(config);
            return JSON.stringify(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllDisasters() {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${BACKEND}/all-disaster-data`,
                headers: {}
            };
            const response = await axios.request(config);
            return JSON.stringify(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getIndividualDisaster(id) {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${BACKEND}/disaster/${id}`,
                headers: {}
            };
            const response = await axios.request(config);
            return JSON.stringify(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async addReportToDisaster(disasterID, reportID) {
        try {
            let data = JSON.stringify({ "reportId": reportID });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${BACKEND}/add-report-to-disaster/${disasterID}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

