import 'dotenv/config';
import './services';
import * as features from './features';
import { app } from './services/express';

app.use(features.message.controller.router);
