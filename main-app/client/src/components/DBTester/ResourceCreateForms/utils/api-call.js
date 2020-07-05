import axios from "axios";
import {getBaseEndpoint} from "../../../../util/constants";

export function createResource(resourcePath, requestBody) {
    return new Promise((resolve, reject) => {
        axios.post(`${getBaseEndpoint()}/${resourcePath}`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 201) {
                    return resolve(response);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    return reject(err.response.data);
                } else {
                    return reject(`Failed to create resource. Error message: ${err.message}.`);
                }
            });
    });
}
