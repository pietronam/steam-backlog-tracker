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
import { DEFAULT_GENRES } from "../utils/defaultGenres";
import type { GameMetadataType } from "../types/gameMetadataType";
import type { SteamDataActions } from "../types/steamDataActions";

const STORAGE_KEY = "steamDataState";

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
      developers: parsed.developers ?? [],
      publishers: parsed.publishers ?? [],
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
      developers: string[],
      publishers: string[]
    ) => {
      dispatch({
        type: "SET_SESSION",
        payload: {
          user,
          games,
          genreMap,
          categoryMap,
          developers,
          publishers,
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
      developers: string[],
      publishers: string[],
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
          developers,
          publishers
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

  const updateGameMetadata = useCallback(
    (
      appId: number,
      metadata: GameMetadataType
    ) => {
      dispatch({
        type: "UPDATE_GAME_METADATA",
        payload: { appId, metadata }
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
      updateGameMetadata,
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