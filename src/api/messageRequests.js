import axios from "axios"


const serverURL = process.env.REACT_APP_SERVER_URL

const API = axios.create({baseURL: serverURL});

export const addMessage = (data) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.post('/api/message', data, {headers: {token}})
};

export const getMessage = (chatId) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.get(`/api/message/${chatId}`, {headers: {token}})
};

export const updateMessage = (messageId, data) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.put(`/api/message/${messageId}`, data, {headers: {token}})
};

export const deleteMessage = (messageId) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.delete(`/api/message/${messageId}`, {headers: {token}})
};