import debug from 'debug';
import { Router } from 'express';
import { bot, APIResponse } from '../../../services';

const logger = debug('features:message:controller:core');
const route = Router();

route.post('/', async (req, res) => {
    try {
        logger(`processed: ${req.body}`);
        bot.processUpdate(req.body);

        res.status(200).json({
            code: 'feature.message.core.webhook.success',
            message: 'Webhook processed successfully',
            data: {},
        } as APIResponse);
    } catch (error) {
        logger(`Error to process updated: ${error}`);
        res.status(500).json({
            code: 'feature.message.core.webhook.error',
            message: 'Error to process update',
            args: error,
            data: {},
        } as APIResponse);
    }
});

export { route };
