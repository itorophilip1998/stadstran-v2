import axios from "axios";

const AxiosConfig
 = axios.create({
  baseURL: "https://api.unzer.com/",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
    accept: "application/json"
  },
  timeout: 15_000
});



export default AxiosConfig
