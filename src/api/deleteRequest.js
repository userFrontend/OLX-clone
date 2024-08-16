import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const deleteProd = (id, method) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.delete(`/api/${method}/${id}`, { headers: { token } });
};

export const deleteUser = (id) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.delete(`/api/user/${id}`, { headers: { token } });
};