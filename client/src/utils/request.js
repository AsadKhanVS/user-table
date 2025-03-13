import axios from "axios";

// create axios instance
const request = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export default request;
