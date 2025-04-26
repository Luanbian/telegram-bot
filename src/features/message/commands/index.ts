import { bot } from '../../../services';
import {
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
    lastResultsCommand,
    clipsCommand,
    newsCommand,
    storeCommand,
} from './core';

const commands = [
    helpCommand,
    startCommand,
    lineUpCommand,
    nextMatchupCommand,
    lastResultsCommand,
    clipsCommand,
    newsCommand,
    storeCommand,
];

commands.forEach((command) => {
    bot.onText(command.pattern, (msg) => command.handler(bot, msg));
});
