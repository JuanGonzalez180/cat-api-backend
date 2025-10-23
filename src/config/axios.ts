import axios from 'axios';

const CAT_API_URL = process.env.CAT_API_URL || 'https://api.thecatapi.com/v1';
const CAT_API_KEY = process.env.CAT_API_KEY || '';

export const catApiClient = axios.create({
  baseURL: CAT_API_URL,
  headers: {
    'x-api-key': CAT_API_KEY,
  },
});
