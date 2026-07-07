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

const STORAGE_KEY = "steamDataState";

/* -------------------- Types -------------------- */

type SteamDataActions = {
  setSteamUser: (user: UserType) => void;
  setSession: (user: UserType, games: GameType[]) => void;
  addGames: (games: GameType[]) => void;
  removeGames: (appIds: number[]) => void;
  addCustomTag: (appId: number, tag: string) => void;
  removeCustomTag: (appId: number, tag: string) => void;
  addCustomNotes: (appId: number, notes: string) => void;
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

  const setSession = useCallback(
    (user: UserType, games: GameType[]) => {
      dispatch({
        type: "SET_SESSION",
        payload: { user, games },
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
      setSession,
      addGames,
      removeGames,
      addCustomTag,
      removeCustomTag,
      addCustomNotes,
      changeGameStatus,
      clearData,
    }),
    [
      setSteamUser,
      setSession,
      addGames,
      removeGames,
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