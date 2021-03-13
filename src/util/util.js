export default class Util {
    getApiToken() {
        //const accessToken = localStorage.getItem('accessToken');
        let accessToken = sessionStorage.getItem('accessToken');
        return accessToken;
    }

    getUserType() {
        return sessionStorage.getItem('userRole');
    }
}