import axios from 'axios';

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const iptv = axios.create({
  baseURL: 'https://iptv-org.github.io/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const api = axios.create({
  baseURL: 'https://7389-2804-431-c7cc-52dd-5cfd-20bc-b204-ecc6.ngrok-free.app',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
