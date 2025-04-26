import { bot } from '../../../services';
import {
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
} from './core';

const commands = [helpCommand, startCommand, lineUpCommand, nextMatchupCommand];

commands.forEach((command) => {
    bot.onText(command.pattern, (msg) => command.handler(bot, msg));
});
