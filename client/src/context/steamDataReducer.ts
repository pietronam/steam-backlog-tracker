import type { SteamDataState } from "../types/steamDataState";
import type { GameType } from "../types/gameType";
import type { UserType } from "../types/userType";

export type SteamDataAction =
  | { type: "SET_STEAM_USER"; payload: UserType }
  | { type: "SET_SESSION"; payload: { user: UserType; games: GameType[] } }
  | { type: "ADD_GAMES"; payload: GameType[] }
  | { type: "REMOVE_GAMES"; payload: number[] }
  | { type: "ADD_CUSTOM_TAG"; payload: { appId: number; tag: string } }
  | { type: "REMOVE_CUSTOM_TAG"; payload: { appId: number; tag: string } }
  | {
      type: "ADD_CUSTOM_DESCRIPTION";
      payload: { appId: number; description: string };
    }
  | { type: "REMOVE_CUSTOM_DESCRIPTION"; payload: { appId: number } }
  | {
      type: "CHANGE_GAME_STATUS";
      payload: { appId: number; status: GameType["status"] };
    }
  | { type: "CLEAR_DATA" };

const emptyUser: UserType = {
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
      const gameMap = new Map(state.games.map((game) => [game.appId, game]));

      incomingGames.forEach((game) => {
        gameMap.set(game.appId, game);
      });

      return {
        ...state,
        games: Array.from(gameMap.values()),
      };
    }

    case "REMOVE_GAMES": {
      const appIdsToRemove = new Set(action.payload);
      return {
        ...state,
        games: state.games.filter((game) => !appIdsToRemove.has(game.appId)),
      };
    }

    case "ADD_CUSTOM_TAG": {
      const { appId, tag } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId
            ? {
                ...g,
                custom_tags: Array.from(new Set([...g.custom_tags, tag])),
              }
            : g,
        ),
      };
    }

    case "REMOVE_CUSTOM_TAG": {
      const { appId, tag } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId
            ? { ...g, custom_tags: g.custom_tags.filter((t) => t !== tag) }
            : g,
        ),
      };
    }

    case "ADD_CUSTOM_DESCRIPTION": {
      const { appId, description } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId ? { ...g, custom_description: description } : g,
        ),
      };
    }

    case "REMOVE_CUSTOM_DESCRIPTION": {
      const { appId } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId ? { ...g, custom_description: "" } : g,
        ),
      };
    }

    case "CHANGE_GAME_STATUS": {
      const { appId, status } = action.payload;
      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId ? { ...g, status } : g,
        ),
      };
    }

    case "CLEAR_DATA":
      return { ...initialSteamDataState };

    default:
      return state;
  }
}
