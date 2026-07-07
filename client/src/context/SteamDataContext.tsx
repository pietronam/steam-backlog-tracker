import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import type { GameType } from "../types/gameType";
import type { SteamDataState } from "../types/steamDataState";
import type { UserType } from "../types/userType";

import {
  initialSteamDataState,
  steamDataReducer,
} from "./steamDataReducer";
import { DEFAULT_GENRES } from "../utils/default_genres";
import type { GameSummaryType } from "../types/gameSummaryType";

const STORAGE_KEY = "steamDataState";

/* -------------------- Types -------------------- */

type SteamDataActions = {
  setSteamUser: (user: UserType) => void;
  login: (user: UserType, games: GameType[]) => void;
  setSession: (
    user: UserType,
    games: GameType[],
    genreMap: Record<number, string>,
    categoryMap: Record<number, string>,
  ) => void;
  addGames: (games: GameType[]) => void;
  removeGames: (appIds: number[]) => void;
  addLookups: (
    genres?: {
      id: string;
      description: string;
    }[],
    categories?: {
      id: number;
      description: string;
    }[],
  ) => void;
  addCustomTag: (appId: number, tag: string) => void;
  removeCustomTag: (appId: number, tag: string) => void;
  addCustomNotes: (appId: number, notes: string) => void;
  updateGameSummary: (appId: number, summary: GameSummaryType) => void;
  changeGameStatus: (
    appId: number,
    status: GameType["status"],
  ) => void;
  clearData: () => void;
};

/* -------------------- Contexts -------------------- */

const SteamDataStateContext =
  createContext<SteamDataState | undefined>(undefined);

const SteamDataActionsContext =
  createContext<SteamDataActions | undefined>(undefined);

/* -------------------- Storage -------------------- */

function loadFromStorage(): SteamDataState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return initialSteamDataState;

    const parsed = JSON.parse(raw) as Partial<SteamDataState>;

    if (
      typeof parsed?.user?.steamid !== "string" ||
      !Array.isArray(parsed?.games)
    ) {
      return initialSteamDataState;
    }

    return {
      user: {
        ...initialSteamDataState.user,
        ...parsed.user,
      },
      games: parsed.games,
      genreMap: parsed.genreMap ?? DEFAULT_GENRES,
      categoryMap: parsed.categoryMap ?? {},
    };
  } catch {
    return initialSteamDataState;
  }
}

/* -------------------- Provider -------------------- */

export function SteamDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    steamDataReducer,
    initialSteamDataState,
    () => {
      if (typeof window === "undefined") {
        return initialSteamDataState;
      }

      return loadFromStorage();
    },
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state),
      );
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  /* ---------- Actions ---------- */

  const setSteamUser = useCallback((user: UserType) => {
    dispatch({
      type: "SET_STEAM_USER",
      payload: user,
    });
  }, []);

  const login = useCallback((user: UserType, games: GameType[]) => {
    dispatch({
      type: "LOGIN",
      payload: {
        user,
        games,
      }
    })
  }, []);

  const setSession = useCallback(
    (
      user: UserType,
      games: GameType[],
      genreMap: Record<number, string>,
      categoryMap: Record<number, string>,
    ) => {
      dispatch({
        type: "SET_SESSION",
        payload: {
          user,
          games,
          genreMap,
          categoryMap,
        },
      });
    },
    [],
  );

  const addGames = useCallback((games: GameType[]) => {
    dispatch({
      type: "ADD_GAMES",
      payload: games,
    });
  }, []);

  const removeGames = useCallback((appIds: number[]) => {
    dispatch({
      type: "REMOVE_GAMES",
      payload: appIds,
    });
  }, []);

  const addLookups = useCallback(
    (
      genres?: {
        id: string;
        description: string;
      }[],
      categories?: {
        id: number;
        description: string;
      }[],
    ) => {
      dispatch({
        type: "ADD_LOOKUPS",
        payload: {
          genres,
          categories,
        },
      });
    },
    [],
  );

  const addCustomTag = useCallback(
    (appId: number, tag: string) => {
      dispatch({
        type: "ADD_CUSTOM_TAG",
        payload: { appId, tag },
      });
    },
    [],
  );

  const removeCustomTag = useCallback(
    (appId: number, tag: string) => {
      dispatch({
        type: "REMOVE_CUSTOM_TAG",
        payload: { appId, tag },
      });
    },
    [],
  );

  const addCustomNotes = useCallback(
    (appId: number, notes: string) => {
      dispatch({
        type: "ADD_CUSTOM_NOTES",
        payload: { appId, notes },
      });
    },
    [],
  );

  const updateGameSummary = useCallback(
    (
      appId: number,
      summary: GameSummaryType
    ) => {
      dispatch({
        type: "UPDATE_GAME_SUMMARY",
        payload: { appId, summary }
      })
    }, []);

  const changeGameStatus = useCallback(
    (
      appId: number,
      status: GameType["status"],
    ) => {
      dispatch({
        type: "CHANGE_GAME_STATUS",
        payload: { appId, status },
      });
    },
    [],
  );

  const clearData = useCallback(() => {
    dispatch({
      type: "CLEAR_DATA",
    });
  }, []);

  /* ---------- Memoized actions object ---------- */

  const actions = useMemo(
    () => ({
      setSteamUser,
      login,
      setSession,
      addGames,
      removeGames,
      addLookups,
      addCustomTag,
      removeCustomTag,
      addCustomNotes,
      updateGameSummary,
      changeGameStatus,
      clearData,
    }),
    [
      setSteamUser,
      setSession,
      addGames,
      removeGames,
      addLookups,
      addCustomTag,
      removeCustomTag,
      addCustomNotes,
      changeGameStatus,
      clearData,
    ],
  );

  return (
    <SteamDataStateContext.Provider value={state}>
      <SteamDataActionsContext.Provider value={actions}>
        {children}
      </SteamDataActionsContext.Provider>
    </SteamDataStateContext.Provider>
  );
}

/* -------------------- Hooks -------------------- */

export function useSteamDataState() {
  const context = useContext(SteamDataStateContext);

  if (!context) {
    throw new Error(
      "useSteamDataState must be used within a SteamDataProvider",
    );
  }

  return context;
}

export function useSteamDataActions() {
  const context = useContext(
    SteamDataActionsContext,
  );

  if (!context) {
    throw new Error(
      "useSteamDataActions must be used within a SteamDataProvider",
    );
  }

  return context;
}