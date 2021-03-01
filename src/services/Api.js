
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.43.141:3000/',
});

export default api;