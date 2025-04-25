import 'dotenv/config';
import { app } from './services';
import * as features from './features';

app.use(features.message.controller.router);
