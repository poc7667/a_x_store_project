import { Constants } from "./Constants";

export const utils = {
    async putRequest(postBody, location) {
        const postData = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(postBody) // body data type must match "Content-Type" header
        }
        return await fetch(Constants.SERVER_URL + location, postData).then(data => data.json());
    },

    async postRequest(postBody, location) {
        const postData = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(postBody) // body data type must match "Content-Type" header
        }
        return await fetch(Constants.SERVER_URL + location, postData).then(data => data.json());
    }

}
