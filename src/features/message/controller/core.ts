import { Router } from 'express';
import bot from '../../../services/telegram';
import { APIResponse } from '../../../services';

const route = Router();

route.post('/', async (req, res) => {
    try {
        bot.processUpdate(req.body);
        res.status(200).json({
            code: 'feature.message.core.webhook.success',
            message: 'Webhook processed successfully',
            data: {},
        } as APIResponse);
    } catch (error) {
        console.error('Error to process update: ', error);
        res.status(500).json({
            code: 'feature.message.core.webhook.error',
            message: 'Error to process update',
            args: error,
            data: {},
        } as APIResponse);
    }
});

export { route };
