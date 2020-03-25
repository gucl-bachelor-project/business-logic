import axios from "axios";

const endpoint =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : window.location.origin;

export function createEntity(resourcePath, requestBody) {
    return new Promise((resolve, reject) => {
        axios.post(`${endpoint}/${resourcePath}`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 201)
                    return resolve(response);
            })
            .catch(err => {
                if (err.response && err.response.status === 400)
                    return reject(err.response.data);
                else
                    alert(`Failed to create entity. Error message: ${err.message}`);
            });
    });
}
