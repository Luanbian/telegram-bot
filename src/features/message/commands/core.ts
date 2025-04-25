import fs from 'fs';
import path from 'path';
import debug from 'debug';
import axios from 'axios';
import { TelegramBot } from '../../../services';
import { buildContent } from '../../../utils/buildContent';
import { DRAFT_API_URL } from '../../../constants';
import { extractPlayersByStatus } from '../../../utils/extractPlayerByStatus';

const logger = debug('features:message:commands:core');

export const helpCommand = {
    pattern: /\/help/,
    handler: (bot: TelegramBot, msg: any) => {
        const chatId = msg.chat.id;
        const content = buildContent('help');
        bot.sendMessage(chatId, content, { parse_mode: 'Markdown' });
    },
};

export const startCommand = {
    pattern: /\/start/,
    handler: (bot: TelegramBot, msg: any) => {
        const chatId = msg.chat.id;
        const content = buildContent('start');
        bot.sendMessage(chatId, content, { parse_mode: 'Markdown' });
    },
};

export const lineUpCommand = {
    pattern: /\/lineup/,
    handler: async (bot: TelegramBot, msg: any) => {
        try {
            const chatId = msg.chat.id;

            const contentPath = path.resolve(
                __dirname,
                `../../../contents/lineup.md`
            );
            let content = fs.readFileSync(contentPath, 'utf-8');

            const res = await axios.get(DRAFT_API_URL);
            const { playerData } = res.data.data;

            const players = extractPlayersByStatus('Titular', playerData);
            const coaches = extractPlayersByStatus('Coach', playerData);
            const reserves = extractPlayersByStatus('Reserva', playerData);

            players.forEach((element, index) => {
                content = content.replace(`{{PLAYER_${index}}}`, element.name);
            });
            coaches.forEach((element, index) => {
                content = content.replace(`{{COACH_${index}}}`, element.name);
            });
            reserves.forEach((element, index) => {
                content = content.replace(`{{RESERVE_${index}}}`, element.name);
            });

            bot.sendMessage(chatId, content, { parse_mode: 'Markdown' });
        } catch (error) {
            logger('Error fetching data from API:', error);
            bot.sendMessage(
                msg.chat.id,
                'Desculpe, algo deu errado. Tente novamente mais tarde.'
            );
        }
    },
};
