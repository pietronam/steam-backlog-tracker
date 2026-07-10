export type GameType = {
    appId: number,
    name: string,
    custom_notes: string,
    status: "completed" | "backlog" | "untracked",
    custom_tags: string[],
    searchIndex?: string,
}