import axios from 'axios';

export default (useAuth = true) => {
  const options = {
    baseURL: 'https://mud-api-20.herokuapp.com/'
  }
  
  if (useAuth) {
    const userToken = localStorage.getItem('mud_token');
    options.headers = {
      "Authentication": `Token ${userToken}`
    }
  }

  return axios.create(options)
}