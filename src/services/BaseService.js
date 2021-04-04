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
            url: `${this.generateApiUrl()}/${this.module}/detail/${id}`
        })
    }

    insert(data) {
        return axios({
            method: "POST",
            headers: this.header,
            url: `${this.generateApiUrl()}/${this.module}/store`,
            data: data
        })
    }

    update(id, data) {
        return axios({
            method: "PUT",
            headers: this.header,
            url: `${this.generateApiUrl()}/${this.module}/update/${id}`,
            data: data
        })
    }

    delete(ids) {
        return axios({
            method: "DELETE",
            headers: this.header,
            url: `${this.generateApiUrl()}/${this.module}/delete`,
            data: ids
        })
    }



    //Report
    purchaseItemReport() {
        return axios({
            method: "GET",
            headers: this.header,
            url: `${this.generateApiUrl()}/report/lists/purchase-items`,
        })
    }

    sellItemReport() {
        return axios({
            method: "GET",
            headers: this.header,
            url: `${this.generateApiUrl()}/report/lists/sell-items`,
        })
    }
 
}