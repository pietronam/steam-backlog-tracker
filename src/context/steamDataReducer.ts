import type { SteamDataState } from "../types/SteamDataState";
import type { GameType } from "../types/GameType";

export type SteamDataAction =
  | { type: "SET_STEAM_ID"; payload: number }
  | { type: "ADD_CUSTOM_TAG"; payload: { appid: number; tag: string } }
  | { type: "REMOVE_CUSTOM_TAG"; payload: { appid: number; tag: string } }
  | {
      type: "ADD_CUSTOM_DESCRIPTION";
      payload: { appid: number; description: string };
    }
  | { type: "REMOVE_CUSTOM_DESCRIPTION"; payload: { appid: number } }
  | {
      type: "CHANGE_GAME_STATUS";
      payload: { appid: number; status: GameType["status"] };
    }
  | { type: "CLEAR_DATA" };

export const initialSteamDataState: SteamDataState = {
  steamid: 0,
  games: [],
};

export function steamDataReducer(
  state: SteamDataState,
  action: SteamDataAction,
): SteamDataState {
  switch (action.type) {
    case "SET_STEAM_ID":
      return { ...state, steamid: action.payload };

    case "ADD_CUSTOM_TAG": {
      const { appid, tag } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appid === appid
            ? {
                ...g,
                custom_tags: Array.from(new Set([...g.custom_tags, tag])),
              }
            : g,
        ),
      };
    }

    case "REMOVE_CUSTOM_TAG": {
      const { appid, tag } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appid === appid
            ? { ...g, custom_tags: g.custom_tags.filter((t) => t !== tag) }
            : g,
        ),
      };
    }

    case "ADD_CUSTOM_DESCRIPTION": {
      const { appid, description } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appid === appid ? { ...g, custom_description: description } : g,
        ),
      };
    }

    case "REMOVE_CUSTOM_DESCRIPTION": {
      const { appid } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appid === appid ? { ...g, custom_description: "" } : g,
        ),
      };
    }

    case "CHANGE_GAME_STATUS": {
      const { appid, status } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appid === appid ? { ...g, status } : g,
        ),
      };
    }

    case "CLEAR_DATA":
      return { ...initialSteamDataState };

    default:
      return state;
  }
}
