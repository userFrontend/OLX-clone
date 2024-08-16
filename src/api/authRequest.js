import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const signUp = (formData) => API.post(`/api/auth/signup`, formData)

export const login = (formData) => API.post(`/api/auth/login`, formData)

export const googleAuth = (formData) => API.post(`/api/auth/googleAuth`, formData)