import Router from 'express';
import { route as coreRouter } from './core';
import { WEBHOOK_ENDPOINT } from '../../../constants';

const router = Router();

router.use(WEBHOOK_ENDPOINT, coreRouter);

export { router };
