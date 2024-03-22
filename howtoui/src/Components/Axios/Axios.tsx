import axios from "axios";
import { AppOptions } from "../../AppOptions";

const headers = {
    'Content-Type': 'application/json',
    /*    'Authorization': 'Bearer yourAccessToken', // Add any additional headers as needed*/
};

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const Get = (url: string) => {
    return axios.get(`${AppOptions.baseURL}/${url}`);
}

export const Post = async (url: string, data: any) => {
    return axios.post(`${AppOptions.baseURL}/${url}`, data, {headers});
}

export const Put = async (url: string, data: any) => {
    return axios.put(`${AppOptions.baseURL}/${url}`, data, {headers});
}

export const Delete = async(url: string) => {
    return axios.delete(`${AppOptions.baseURL}/${url}`, {headers})
}