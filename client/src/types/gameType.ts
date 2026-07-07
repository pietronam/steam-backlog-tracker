import type { GameSummaryType } from "./gameSummaryType"

export type GameType = {
    appId: number,
    name: string,
    custom_notes: string,
    status: "completed" | "backlog" | "untracked",
    custom_tags: string[],
    summary: GameSummaryType,
}