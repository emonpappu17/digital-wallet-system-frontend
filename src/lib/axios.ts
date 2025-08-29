import config from "@/config";
import axios, { AxiosRequestConfig } from "axios";


export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true
})


let isRefreshing = false;

let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    pendingQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(null);
        }
    });

    pendingQueue = [];
}

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };

    // console.log('originalRequest:', originalRequest);

    // console.log('catch interceptor==>', error.response);

    if (error.response.status === 500 && error.response.data.message === "jwt expired" && !originalRequest._retry) {

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingQueue.push({ resolve, reject });
            })
                .then(() => axiosInstance(originalRequest))
                .catch((error) => Promise.reject(error));
        }

        isRefreshing = true;
        try {
            const res = await axiosInstance.post("/auth/refresh-token")
            console.log('new token', res);

            return axiosInstance(originalRequest);
        } catch (error) {
            console.log(error);
            processQueue(error);
            return Promise.reject(error);
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(error);
});