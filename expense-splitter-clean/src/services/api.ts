import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8088/api', //  adresa  spre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
