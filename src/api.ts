import { config } from './config';
import axios from 'axios';

export default axios.create({
  baseURL: config.apiBase,
  headers: {
    'Access-Control-Allow-Origin': '*',
    token: JSON.parse(window.localStorage.getItem('walletData'))?.token,
    signature: JSON.parse(window.localStorage.getItem('walletData'))?.signature
  }
});
