import os from 'os';
import express from 'express';
import cors from 'cors';
import { EXPRESS_PORT } from '../../constants/express';
import { APIEcho, APIResponse } from './types';
import pkgJson from '../../../package.json';

const app = express();

// trust proxy
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

// heath check
app.use('/', (_req, res) => {
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
    console.log('Server is running on port', EXPRESS_PORT);
});

export { app, APIResponse, APIEcho };
