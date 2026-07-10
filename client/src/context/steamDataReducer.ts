import type { SteamDataState } from "../types/steamDataState";
import type { GameType } from "../types/gameType";
import type { UserType } from "../types/userType";
import { DEFAULT_GENRES } from "../utils/defaultGenres";
import type { GameMetadataType } from "../types/gameMetadataType";
import { buildSearchIndex } from "../utils/buildSearchIndex";
import { appendToSearchIndex } from "../utils/appendToSearchIndex";
import { removeFromSearchIndex } from "../utils/removeFromSearchIndex";

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
      developers: string[],
      publishers: string[],
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
      developers: string[]
      publishers: string[]
    };
  }
  | { type: "ADD_CUSTOM_TAG"; payload: { appId: number; tag: string } }
  | { type: "REMOVE_CUSTOM_TAG"; payload: { appId: number; tag: string } }
  | {
    type: "ADD_CUSTOM_NOTES";
    payload: { appId: number; notes: string };
  }
  | {
    type: "UPDATE_GAME_METADATA";
    payload: {
      appId: number;
      metadata: GameMetadataType;
    };
  }
  | {
    type: "CHANGE_GAME_STATUS";
    payload: { appId: number; status: GameType["status"] };
  }
  | {
    type: "SET_PRIORITY";
    payload: { appId: number; priority: GameType["priority"] };
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
  developers: [],
  publishers: [],
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
        developers: action.payload.developers,
        publishers: action.payload.publishers
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
      const developers = [...state.developers];
      const publishers = [...state.publishers];

      action.payload.genres?.forEach((genre) => {
        genreMap[Number(genre.id)] = genre.description;
      });

      action.payload.categories?.forEach((category) => {
        categoryMap[category.id] = category.description;
      });

      action.payload.developers?.forEach((developer) => {
        if (!developers.includes(developer)) {
          developers.push(developer);
        }
      });

      action.payload.publishers?.forEach((publisher) => {
        if (!publishers.includes(publisher)) {
          publishers.push(publisher);
        }
      });

      return {
        ...state,
        genreMap,
        categoryMap,
        developers,
        publishers,
      };
    }

    case "ADD_CUSTOM_TAG": {
      const { appId, tag } = action.payload;

      return {
        ...state,
        games: state.games.map((g) => {
          if (g.appId !== appId) return g;
          if (g.searchIndex) return {
            ...g,
            custom_tags: Array.from(
              new Set([...g.custom_tags, tag])),
            searchIndex: appendToSearchIndex(g.searchIndex, tag)
          };
          return {
            ...g,
            custom_tags: Array.from(
              new Set([...g.custom_tags, tag]),
            ),
          }
        }),
      };
    }

    case "REMOVE_CUSTOM_TAG": {
      const { appId, tag } = action.payload;

      return {
        ...state,
        games: state.games.map((g) => {
          if (g.appId !== appId) return g;
          if (g.searchIndex) return {
            ...g,
            custom_tags: g.custom_tags.filter(
              (t) => t !== tag,
            ),
            searchIndex: removeFromSearchIndex(g.searchIndex, tag)
          };
          return {
            ...g,
            custom_tags: g.custom_tags.filter(
              (t) => t !== tag,
            ),
          }
        }),
      };
    }

    case "ADD_CUSTOM_NOTES": {
      const { appId, notes } = action.payload;

      return {
        ...state,
        games: state.games.map((g) => {
          if (g.appId !== appId) return g;
          if (g.searchIndex) return {
            ...g,
            custom_notes: notes,
            searchIndex: appendToSearchIndex(g.searchIndex, notes)
          };
          return {
            ...g,
            custom_notes: notes,
          }
        }),
      };
    }

    case "UPDATE_GAME_METADATA": {
      const { appId, metadata } = action.payload;

      return {
        ...state,
        games: state.games.map((game) => {
          if (game.appId !== appId) return game;

          return {
            ...game,
            searchIndex: buildSearchIndex({
              name: game.name,
              genres: metadata.genres.map(
                (g) => state.genreMap[Number(g.id)] ?? g.description,
              ),
              categories: metadata.categories.map(
                (c) => state.categoryMap[c.id] ?? c.description,
              ),
              developers: metadata.developers,
              publishers: metadata.publishers,
              status: game.status,
              customTags: game.custom_tags,
              customNotes: game.custom_notes,
            }),
          };
        }),
      };
    }
    case "CHANGE_GAME_STATUS": {
      const { appId, status } = action.payload;

      return {
        ...state,
        games: state.games.map((g) => {
          if (g.appId !== appId) return g;
          if (g.searchIndex) return {
            ...g,
            status,
            priority: 1,
            searchIndex: appendToSearchIndex(g.searchIndex, status)
          };
          return {
            ...g,
            priority: 1,
            status,
          }
        }),
      };
    }

    case "SET_PRIORITY": {
      const { appId, priority } = action.payload;

      return {
        ...state,
        games: state.games.map((g) => {
          if (g.appId !== appId) return g;
          return {
            ...g,
            priority,
          };
        }),
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