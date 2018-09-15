import {GET, POST} from './../constant/api';

export default class Http {

    static get(url) {
        return Http._request(GET, url);
    }

    static post(url, data = null) {
        return Http._request(POST, url, data);
    }

    static _request(method, url, data = null) {

        const fetchOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (data) {
            fetchOptions.body = JSON.stringify(data);
        }

        return fetch(url, fetchOptions).then(resp => resp.json());
    }
}
