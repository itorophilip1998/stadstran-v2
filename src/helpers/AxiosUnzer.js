import axios from "axios";

const publicKey = process.env.REACT_APP_UNZER_PUBLIC_KEY_BASE64_ALT;

const AxiosUnzer = axios.create({
  baseURL: "https://api.unzer.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: publicKey,
    "Content-Type": "application/json",
  },
});



export default AxiosUnzer