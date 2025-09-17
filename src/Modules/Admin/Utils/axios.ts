import axios from "axios";
import { baseUrl } from "./constant";

const adminAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});
export default adminAxios;