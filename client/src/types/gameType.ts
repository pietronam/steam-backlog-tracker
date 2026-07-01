export type GameType = {
    appId: number,
    name: string,
    custom_description: string,
    status: "completed" | "backlog" | "untracked",
    custom_tags: string[],
}