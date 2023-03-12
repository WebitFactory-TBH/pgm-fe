import { config } from './config';
import axios from 'axios';

export default axios.create({
  baseURL: config.apiBase,
  headers: {
    'Access-Control-Allow-Origin': '*',
    token:
      JSON.parse(window.localStorage.getItem('walletData') ?? 'null')?.token ??
      null,
    signature:
      JSON.parse(window.localStorage.getItem('walletData') ?? 'null')
        ?.signature ?? null
  }
});
