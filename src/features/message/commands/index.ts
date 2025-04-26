import { bot } from '../../../services';
import {
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
    lastResultsCommand,
    clipsCommand,
} from './core';

const commands = [
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
    lastResultsCommand,
    clipsCommand,
];

commands.forEach((command) => {
    bot.onText(command.pattern, (msg) => command.handler(bot, msg));
});
