export type getPlayerSummariesResponse = {
    players: {
        steamid: string,  //number string
        communityvisibilitystate: number,
        profilestate: number,
        personaname: string,
        profileurl: string,
        avatar: string,
        avatarmedium: string,
        avatarfull: string,
        avatarhash: string,  //number string
        lastlogoff: number,
        personastate: number,
        primaryclanid: string, //number string
        timecreated: number,
        personastateflags: number
    }[]
}
