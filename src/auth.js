// Import

// Libraries
import axios from "axios";

// Configs
import { baseUrl } from "../config";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    baseURL: baseUrl
  });
};
