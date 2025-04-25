import axios from 'axios';
import { Router } from 'express';
import { TELEGRAM_API } from '../../../constants/telegram';

const route = Router();

route.post('/', async (req, res) => {
    const chatId = req.body.message.chat.id;
    await axios
        .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: 'Hello from webhook!',
        })
        .catch((err) => {
            console.error('Error sending message:', err);
        });
    res.send();
});

export { route };
