import { TelegramBot } from '../../../services';

export const helpCommand = {
    pattern: /\/help/,
    handler: (bot: TelegramBot, msg: any) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Here is the help text!');
    },
};

export const startCommand = {
    pattern: /\/start/,
    handler: (bot: TelegramBot, msg: any) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Welcome core');
    },
};
