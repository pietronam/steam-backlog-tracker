import type { SteamDataState } from "../types/steamDataState";

export function exportData(state: SteamDataState) {
    const json = JSON.stringify(state, null, 2);

    const blob = new Blob([json], {
        type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "steam-backlog.json";
    a.click();

    URL.revokeObjectURL(url);
}