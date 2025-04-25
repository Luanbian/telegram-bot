import debug from 'debug';
import os from 'os';
import express from 'express';
import cors from 'cors';
import { EXPRESS_PORT } from '../../constants';
import { APIEcho, APIResponse } from './types';
import pkgJson from '../../../package.json';

const logger = debug('services:express');
const app = express();

// trust proxy
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// heath check
app.get('/', (_req, res) => {
    res.status(200).json({
        code: 'echo',
        message: 'OK',
        args: [],
        data: {
            server: os.hostname(),
            version: pkgJson.version,
        },
    } as APIResponse<APIEcho>);
});

app.listen(EXPRESS_PORT, () => {
    logger(`Server is running on port ${EXPRESS_PORT}`);
});

export { app, APIResponse, APIEcho };
