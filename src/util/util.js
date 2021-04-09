import moment from "moment";

export default class Util {
    getApiToken() {
        //const accessToken = localStorage.getItem('accessToken');
        let accessToken = localStorage.getItem('accessToken');
        return accessToken;
    }

    getUserType() {
        return localStorage.getItem('userRole');
    }

    formatDate (value, format = "DD-MMM-YYYY") {
        format = format === null || format === "" ? "DD MMM YYYY" : format;
        return moment(value).format(format);
    }

    dateFormatForMySql(value) {
        let format = "YYYY-MM-DD h:mm:ss";
        return moment(value).format(format);
    }

    currencyFormat(currency, symbol = '៛') {
        return new Intl.NumberFormat().format(currency) + symbol;
    }

    quantityFormat(value, unit) {
        return new Intl.NumberFormat().format(value) + unit;
    }

    getCurrentUser() {
        return this.initialUser().id;
    }

    getUserName() {
        return this.initialUser().userName;
    }

    initialUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}