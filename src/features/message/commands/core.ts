import { TelegramBot } from '../../../services';
import { buildContent } from '../../../utils/buildContent';

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
