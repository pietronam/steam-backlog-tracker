export type userType = {
    steamid: string,  //the response is a number string
    username: string, //personaname in the response
    profileurl: string,
    avatar: string,    //32x32px
    avatarmedium: string, //64x64px
    avatarfull: string, //184x184px
    personastate: number, //online status: 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play.
}
