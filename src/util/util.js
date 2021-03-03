export default class Util {
    getApiToken() {
        const accessToken = localStorage.getItem('accessToken');
        return accessToken;
    }

    getUserType() {
        return localStorage.getItem('userRole');
    }
}