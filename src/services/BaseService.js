import axios from "axios";

export default class BaseService {
    module = "";
    apiHost = "https://jsonplaceholder.typicode.com";
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
            url: `${this.generateApiUrl()}/${this.module}`
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