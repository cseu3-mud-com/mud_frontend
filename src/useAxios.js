import axios from 'axios';
import { baseUrl, userTokenKey } from "./config";

export default (useAuth = true) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: baseUrl
  }
  
  if (useAuth) {
    const userToken = localStorage.getItem(userTokenKey);
    options.headers = {
      "Authorization": `${userToken}`
    }
  }

  return axios.create(options)
}