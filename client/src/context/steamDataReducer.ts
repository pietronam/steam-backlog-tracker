import type { SteamDataState } from "../types/steamDataState";
import type { GameType } from "../types/gameType";
import type { userType } from "../types/userType";

export type SteamDataAction =
  | { type: "SET_STEAM_USER"; payload: userType }
  | { type: "SET_SESSION"; payload: { user: userType; games: GameType[] } }
  | { type: "ADD_GAMES"; payload: GameType[] }
  | { type: "REMOVE_GAMES"; payload: number[] }
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

const emptyUser: userType = {
  steamid: "",
  username: "",
  profileurl: "",
  avatar: "",
  avatarmedium: "",
  avatarfull: "",
  personastate: 0,
};

export const initialSteamDataState: SteamDataState = {
  user: emptyUser,
  games: [],
};

export function steamDataReducer(
  state: SteamDataState,
  action: SteamDataAction,
): SteamDataState {
  switch (action.type) {
    case "SET_STEAM_USER":
      return { ...state, user: action.payload };

    case "SET_SESSION":
      return {
        user: action.payload.user,
        games: action.payload.games,
      };

    case "ADD_GAMES": {
      const incomingGames = action.payload;
      const gameMap = new Map(state.games.map((game) => [game.appid, game]));

      incomingGames.forEach((game) => {
        gameMap.set(game.appid, game);
      });

      return {
        ...state,
        games: Array.from(gameMap.values()),
      };
    }

    case "REMOVE_GAMES": {
      const appidsToRemove = new Set(action.payload);
      return {
        ...state,
        games: state.games.filter((game) => !appidsToRemove.has(game.appid)),
      };
    }

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
