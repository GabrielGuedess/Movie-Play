import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
