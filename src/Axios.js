//Local axios config file. This wil take precedenace over index.js config

import axios from "axios";

var AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

//AxiosInstance.interceptors.
//AxiosInstance.defaults.headers.common

export default AxiosInstance;
