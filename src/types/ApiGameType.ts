export type ApiGameType = {
    appid: number,
    name: string,
    playtime_forever: number, //in minutes
    img_icon_url: string,
    has_community_visible_stats: boolean,
    playtime_windows_forever: number,
    playtime_mac_forever: number,
    playtime_linux_forever: number,
    playtime_deck_forever: number,
    rtime_last_played: number,
    content_descriptorids: number[],
    playtime_disconnected: number
}