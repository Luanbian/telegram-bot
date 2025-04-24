import axios from 'axios';
import { SET_TELEGRAM_WEBHOOK_URL } from '../../constants/telegram';

export const setWebhookUrl = async () => {
    const res = await axios.get(SET_TELEGRAM_WEBHOOK_URL);
    console.log('Set webhook url response:', res.data);
};
