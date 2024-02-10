import axios from "axios";
import { useToken } from "../context/TokenContext";

const BASE_URL = "http://localhost:8080"

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    "headers": {"Content-Type": "application/json"}
})