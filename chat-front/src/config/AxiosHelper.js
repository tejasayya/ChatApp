import axios from "axios";
export const baseURL = "http://localhost:8080";
// export const baseURL = "http://64.227.156.141:8080";
export const httpClient = axios.create({
  baseURL: baseURL,
});