import fs from 'fs';
import path from 'path';
import debug from 'debug';
import axios from 'axios';
import dedent from 'dedent';
import { format, fromUnixTime } from 'date-fns';
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

            const res = await axios.get(
                `${DRAFT_API_URL}/teams/330?actual=true`
            );
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

export const nextMatchupCommand = {
    pattern: /\/proximos_jogos/,
    handler: async (bot: TelegramBot, msg: any) => {
        try {
            const chatId = msg.chat.id;

            const contentPath = path.resolve(
                __dirname,
                `../../../contents/nextMatchup.md`
            );
            let content = fs.readFileSync(contentPath, 'utf-8');

            const [matchesResponse, tournamentsResponse] = await Promise.all([
                axios.get(
                    `${DRAFT_API_URL}/matches?page=1&amount=10&finished=0&featured=0&team=330&showHidden=0`
                ),
                axios.get(
                    `${DRAFT_API_URL}/tournaments?page=1&amount=50&finished=0&featured=0&team=330`
                ),
            ]);

            const { list, totalItems } = matchesResponse.data.data;
            if (totalItems === 0 && list.length === 0) {
                content = content.replace(
                    '{{NEXT_MATCHUP}}',
                    dedent(`
                        🚨 **NENHUM JOGO ENCONTRADO... MAS A CAÇADA NUNCA PARA!** 🦁🔥

                        Por enquanto, a matilha tá **afiando as garras** e **carregando o arsenal** pra próxima batalha.  
                        **A qualquer momento**, o rugido volta a ecoar nos servidores do mundo inteiro!

                        ## 🛡️ O que vem por aí?

                        - Treinos pesados 💪
                        - Estratégias novas no forno 🧠
                        - Foco total pra dominar o próximo campeonato 🔥
                    `)
                );
            }
            if (totalItems > 0 && list.length > 0) {
                let matchups = '';
                list.forEach((element: any) => {
                    const date = fromUnixTime(element.matchDate);
                    const formattedDate = format(date, 'dd/MM/yyyy');

                    matchups += `${dedent(`
                        🎯 **FURIA vs ${element.teamB.teamName}**  
                        📍 Campeonato: ${element.tournament.tournamentName}
                        📅 Data: ${formattedDate}
                        🖥️ Assistir: https://www.youtube.com/watch?v=${element.mainStream.streamChannel}
                    `)}\n\n`;
                });
                content = content.replace('{{NEXT_MATCHUP}}', matchups);
            }

            const { data } = tournamentsResponse.data;
            if (data.length === 0) {
                content = content.replace(
                    '{{NEXT_TOURNAMENT}}',
                    dedent(`
                        🚨 **NENHUM CAMPEONATO NO RADAR... POR ENQUANTO** 🦁🔥

                        A selva tá em silêncio...  
                        **Mas a FURIA tá treinando, evoluindo e preparando o próximo rugido que vai sacudir o cenário!** 🎯

                        ## 🛡️ O que vem por aí?

                        - Treino insano todos os dias 🔥
                        - Estratégias novas sendo forjadas 🛡️
                        - Foco máximo pra **voltar mais forte do que nunca** 💣
                    `)
                );
            }
            if (data.length > 0) {
                let tournaments = '';
                data.filter(
                    (value: any) => value.isTournamentHided === 0
                ).forEach((element: any) => {
                    const date = fromUnixTime(element.tournamentStart);
                    const formattedDate = format(date, 'dd/MM/yyyy');

                    tournaments += `${dedent(`
                        🏆 **${element.tournamentName}**  
                        📅 Data: ${formattedDate}
                    `)}\n\n`;
                });
                content = content.replace('{{NEXT_TOURNAMENT}}', tournaments);
            }

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
