import TelegramBot from 'node-telegram-bot-api';
import { SET_TELEGRAM_WEBHOOK_URL, TELEGRAM_TOKEN } from '../../constants';

const bot = new TelegramBot(TELEGRAM_TOKEN, { webHook: true });

bot.setWebHook(SET_TELEGRAM_WEBHOOK_URL);

export { bot, TelegramBot };
