
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://49.12.14.47:3000/',
});

export default api;