import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import type { GameType } from "../types/gameType";
import type { SteamDataState } from "../types/steamDataState";
import type { UserType } from "../types/userType";
import {
  initialSteamDataState,
  steamDataReducer,
} from "./steamDataReducer";

const STORAGE_KEY = "steamDataState";

type SteamDataContextValue = {
  state: SteamDataState;
  setSteamUser: (user: UserType) => void;
  setSession: (user: UserType, games: GameType[]) => void;
  addGames: (games: GameType[]) => void;
  removeGames: (appIds: number[]) => void;
  addCustomTag: (appId: number, tag: string) => void;
  removeCustomTag: (appId: number, tag: string) => void;
  addCustomNotes: (appId: number, Notes: string) => void;
  changeGameStatus: (
    appId: number,
    status: "completed" | "backlog" | "untracked",
  ) => void;
  clearData: () => void;
};

const SteamDataContext = createContext<SteamDataContextValue | undefined>(
  undefined,
);

function loadFromStorage(): SteamDataState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY); // "raw" output is only a string in JSON format
    if (!raw) return initialSteamDataState;
    const parsed = JSON.parse(raw) as Partial<SteamDataState>;
    if (typeof parsed?.user?.steamid !== "number" || !Array.isArray(parsed?.games))
      return initialSteamDataState; // validate the shape of the parsed object
    return {
      user: { ...initialSteamDataState.user, ...parsed.user },
      games: parsed.games,
    };
  } catch (e) {
    return initialSteamDataState;
  }
}

export function SteamDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    // third argument is a lazy initializer, only runs on the first render
    steamDataReducer,
    initialSteamDataState,
    () => {
      if (typeof window === "undefined") return initialSteamDataState; //this check prevents loadFromStorage() from running in Node.js, only allowed in a browser
      return loadFromStorage();
    },
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore storage errors
    }
  }, [state]);

  const contextValue: SteamDataContextValue = {
    state,
    setSteamUser: (user: UserType) =>
      dispatch({ type: "SET_STEAM_USER", payload: user }),
    setSession: (user: UserType, games: GameType[]) =>
      dispatch({ type: "SET_SESSION", payload: { user, games } }),
    addGames: (games: GameType[]) =>
      dispatch({ type: "ADD_GAMES", payload: games }),
    removeGames: (appIds: number[]) =>
      dispatch({ type: "REMOVE_GAMES", payload: appIds }),
    addCustomTag: (appId: number, tag: string) =>
      dispatch({ type: "ADD_CUSTOM_TAG", payload: { appId, tag } }),
    removeCustomTag: (appId: number, tag: string) =>
      dispatch({ type: "REMOVE_CUSTOM_TAG", payload: { appId, tag } }),
    addCustomNotes: (appId: number, notes: string) =>
      dispatch({
        type: "ADD_CUSTOM_NOTES",
        payload: { appId, notes },
      }),
    changeGameStatus: (
      appId: number,
      status: "completed" | "backlog" | "untracked",
    ) => dispatch({ type: "CHANGE_GAME_STATUS", payload: { appId, status } }),
    clearData: () => dispatch({ type: "CLEAR_DATA" }),
  };

  return (
    <SteamDataContext.Provider value={contextValue}>
      {children}
    </SteamDataContext.Provider>
  );
}

export function useSteamData() {
  const ctx = useContext(SteamDataContext);
  if (!ctx)
    throw new Error("useSteamData must be used within a SteamDataProvider");
  return ctx;
}

export default SteamDataProvider;
