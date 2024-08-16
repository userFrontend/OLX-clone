import axios from "axios"


const serverURL = process.env.REACT_APP_SERVER_URL

const API = axios.create({baseURL: serverURL});

export const userChats = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.get('/api/chat', {headers: {token}})
};

export const findChat = (firstId, secondId) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.get(`/api/chat/${firstId}/${secondId}`, {headers: {token}})
};

export const deleteChat = (chatId) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return API.delete(`/api/chat/${chatId}`, {headers: {token}})
};