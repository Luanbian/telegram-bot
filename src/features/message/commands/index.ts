import { bot } from '../../../services/telegram';
import { helpCommand, startCommand } from './core'; // Exemplo de outro comando

const commands = [helpCommand, startCommand];

commands.forEach((command) => {
    bot.onText(command.pattern, (msg) => command.handler(bot, msg));
});
