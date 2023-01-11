import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.interceptors.request.use(config => {
//     const token = store.commonStore.token;
//     if (token) config.headers.Authorization = `Bearer ${token}`
//     return config;
// })


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {

}


const agent = {
    Account,
}

export default agent;