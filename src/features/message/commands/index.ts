import { bot } from '../../../services';
import {
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
    lastResultsCommand,
} from './core';

const commands = [
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
    lastResultsCommand,
];

commands.forEach((command) => {
    bot.onText(command.pattern, (msg) => command.handler(bot, msg));
});
