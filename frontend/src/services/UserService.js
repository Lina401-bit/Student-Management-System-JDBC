import axios from "axios";

const API_URL = "http://localhost:8080";


export const loginUser = (username, password) => {

    return axios.post(
        `${API_URL}/login`,
        null,
        {
            params: {
                username: username,
                password: password
            }
        }
    );

};


export const registerUser = (username, password) => {

    return axios.post(
        `${API_URL}/signup`,
        {
            username: username,
            password: password
        }
    );

};