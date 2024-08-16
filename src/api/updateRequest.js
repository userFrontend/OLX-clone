import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const updateProd = (id, data, method) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.put(`/api/${method}/${id}`, data, { headers: {token} });
};

export const likeProd = (id, data) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.put(`/api/user/like/${id}`, data, { headers: { token } });
}