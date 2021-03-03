import axios from "axios";
import Util from "../util/util";

export default class BaseService {
    module = "";
    apiHost = "http://localhost:9000";
    prefix = "";
    version = "";
    util = new Util();
    header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.util.getApiToken()}`
    }
    

    generateApiUrl() {
        return `${this.apiHost}`;
    }

    list() {
        console.log(this.util.getApiToken);
        return axios({
            method: "GET",
            headers: this.header,
            url: `${this.generateApiUrl()}/${this.module}/lists`
        })
    }

    detail(id) {
        return axios({
            method: "GET",
            headers: this.header,
            url: `${this.generateApiUrl()}/${this.module}/${id}`
        })
    }
}