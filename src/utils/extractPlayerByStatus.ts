export const extractPlayersByStatus = (status: string, data: any): any[] =>
    data
        .filter((player: any) => player.playerHistory[0].status === status)
        .map((player: any) => ({
            name: player.playerNickname,
        }));
