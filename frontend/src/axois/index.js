import axios from "axios";
import store from "../store/index.js";

const axiosInstance = axios.create({
    baseURL: "https://rajasthan-it-day-hackathon.vercel.app"
})


const axiosInstanceWithHeader = axios.create({
    baseURL: "https://rajasthan-it-day-hackathon.vercel.app"

})
axiosInstanceWithHeader.interceptors.request.use((config) => {
    const token = store.getState().userReducer.accessToken;
    config.headers.Authorization = token;
    return config;
})
export {
    axiosInstance,
    axiosInstanceWithHeader
};