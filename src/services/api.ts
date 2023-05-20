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
  baseURL: 'https://api-movie-play.onrender.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
