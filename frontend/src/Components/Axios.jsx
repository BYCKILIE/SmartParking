import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: "http://172.20.10.2:8000/"
});

export default axiosInstance;
