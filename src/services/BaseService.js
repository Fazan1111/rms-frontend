import axios from "axios";

export default class BaseService {
    module = "";
    apiHost = "http://localhost:9000";
    prefix = "";
    version = "";
    header = {
        "Content-Type": "application/json"
    }

    generateApiUrl() {
        return `${this.apiHost}`;
    }

    list() {
        return axios({
            method: "GET",
            header: this.header,
            url: `${this.generateApiUrl()}/${this.module}/lists`
        })
    }

    detail(id) {
        return axios({
            method: "GET",
            header: this.header,
            url: `${this.generateApiUrl()}/${this.module}/${id}`
        })
    }
}