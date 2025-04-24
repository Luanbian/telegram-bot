import { NGROK_URL } from './ngrok';

export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '';
export const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export const WEBHOOK_ENDPOINT = '/webhook/' + TELEGRAM_TOKEN;
export const WEBHOOK_URL = NGROK_URL + WEBHOOK_ENDPOINT;
export const SET_TELEGRAM_WEBHOOK_URL = `${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`;
