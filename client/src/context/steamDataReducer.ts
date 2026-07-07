import type { SteamDataState } from "../types/steamDataState";
import type { GameType } from "../types/gameType";
import type { UserType } from "../types/userType";
import { DEFAULT_GENRES } from "../utils/default_genres";
import type { GameSummaryType } from "../types/gameSummaryType";

export type SteamDataAction =
  | { type: "SET_STEAM_USER"; payload: UserType }
  | { type: "LOGIN"; payload: { user: UserType, games: GameType[] } }

  | {
    type: "SET_SESSION";
    payload: {
      user: UserType;
      games: GameType[];
      genreMap: Record<number, string>;
      categoryMap: Record<number, string>;
    };
  }

  | { type: "ADD_GAMES"; payload: GameType[] }
  | { type: "REMOVE_GAMES"; payload: number[] }
  | {
    type: "ADD_LOOKUPS";
    payload: {
      genres?: {
        id: string;
        description: string;
      }[];
      categories?: {
        id: number;
        description: string;
      }[];
    };
  }
  | { type: "ADD_CUSTOM_TAG"; payload: { appId: number; tag: string } }
  | { type: "REMOVE_CUSTOM_TAG"; payload: { appId: number; tag: string } }
  | {
    type: "ADD_CUSTOM_NOTES";
    payload: { appId: number; notes: string };
  }
  | {
    type: "UPDATE_GAME_SUMMARY";
    payload: {
      appId: number;
      summary: GameSummaryType;
    };
  }
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
  genreMap: DEFAULT_GENRES,
  categoryMap: {},
};

export function steamDataReducer(
  state: SteamDataState,
  action: SteamDataAction,
): SteamDataState {
  switch (action.type) {
    case "SET_STEAM_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        games: action.payload.games,
      }

    case "SET_SESSION":
      return {
        user: action.payload.user,
        games: action.payload.games,
        genreMap: action.payload.genreMap,
        categoryMap: action.payload.categoryMap,
      };

    case "ADD_GAMES": {
      const incomingGames = action.payload;
      const gameMap = new Map(
        state.games.map((game) => [game.appId, game]),
      );

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
        games: state.games.filter(
          (game) => !appIdsToRemove.has(game.appId),
        ),
      };
    }

    case "ADD_LOOKUPS": {
      const genreMap = { ...state.genreMap };
      const categoryMap = { ...state.categoryMap };

      action.payload.genres?.forEach((genre) => {
        genreMap[Number(genre.id)] = genre.description;
      });

      action.payload.categories?.forEach((category) => {
        categoryMap[category.id] = category.description;
      });

      return {
        ...state,
        genreMap,
        categoryMap,
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
              custom_tags: Array.from(
                new Set([...g.custom_tags, tag]),
              ),
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
            ? {
              ...g,
              custom_tags: g.custom_tags.filter(
                (t) => t !== tag,
              ),
            }
            : g,
        ),
      };
    }

    case "ADD_CUSTOM_NOTES": {
      const { appId, notes } = action.payload;

      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId
            ? {
              ...g,
              custom_notes: notes,
            }
            : g,
        ),
      };
    }

    case "UPDATE_GAME_SUMMARY": {
      const { appId, summary } = action.payload;

      return {
        ...state,
        games: state.games.map((game) =>
          game.appId === appId
            ? {
              ...game,
              summary,
            }
            : game
        ),
      };
    }

    case "CHANGE_GAME_STATUS": {
      const { appId, status } = action.payload;

      return {
        ...state,
        games: state.games.map((g) =>
          g.appId === appId
            ? {
              ...g,
              status,
            }
            : g,
        ),
      };
    }

    case "CLEAR_DATA":
      return {
        ...initialSteamDataState,
      };

    default:
      return state;
  }
}