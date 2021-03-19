import moment from "moment";

export default class Util {
    getApiToken() {
        //const accessToken = localStorage.getItem('accessToken');
        let accessToken = sessionStorage.getItem('accessToken');
        return accessToken;
    }

    getUserType() {
        return sessionStorage.getItem('userRole');
    }

    formatDate (value, format = "DD-MMM-YYYY") {
        format = format === null || format === "" ? "DD MMM YYYY" : format;
        return moment(value).format(format);
    }
}