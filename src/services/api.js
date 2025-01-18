import axios from "axios"

export const BASE_URL = "https://ufoodapi.herokuapp.com/unsecure/"
export const SECURE_BASE_URL = "https://ufoodapi.herokuapp.com/"

export const api = axios.create({
    baseURL: BASE_URL,
})

export const secure_api = axios.create({
    baseURL: SECURE_BASE_URL,
})
