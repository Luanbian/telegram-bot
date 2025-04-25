import { bot } from '../../../services';
import { helpCommand, startCommand, lineUpCommand } from './core';

const commands = [helpCommand, startCommand, lineUpCommand];

commands.forEach((command) => {
    bot.onText(command.pattern, (msg) => command.handler(bot, msg));
});
