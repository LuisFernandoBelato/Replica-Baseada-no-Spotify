import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, 
  timeout: 5000,               
  headers: { 
    "Content-Type": "application/json"
  },
  withCredentials: true // Importante para enviar/receber cookies
});

export default axiosInstance;
