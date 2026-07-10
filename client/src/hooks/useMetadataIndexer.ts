import { useCallback, useReducer, useRef } from "react";

import { getGameDetails } from "../api/getGameDetails";
import { useSteamDataActions, useSteamDataState } from "../context/SteamDataContext";
import type { IndexingProgress } from "../types/indexingTypes";

const REQUEST_DELAY = 150;

const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const initialProgress: IndexingProgress = {
    running: false,
    cancelled: false,
    finished: false,

    total: 0,
    completed: 0,
    failed: 0,
    percentage: 0,

    currentGame: "",
};

type Action =
    | {
        type: "START";
        total: number;
    }
    | {
        type: "GAME";
        name: string;
    }
    | {
        type: "SUCCESS";
    }
    | {
        type: "FAILURE";
    }
    | {
        type: "FINISH";
    }
    | {
        type: "CANCEL";
    };

const indexReducer = (
    progressState: IndexingProgress,
    action: Action,
): IndexingProgress => {
    switch (action.type) {
        case "START":
            return {
                ...initialProgress,
                running: true,
                total: action.total,
            };

        case "GAME":
            return {
                ...progressState,
                currentGame: action.name,
            };

        case "SUCCESS": {
            const completed = progressState.completed + 1;

            return {
                ...progressState,
                completed,
                percentage:
                    progressState.total === 0
                        ? 100
                        : Math.round((completed / progressState.total) * 100),
            };
        }

        case "FAILURE": {
            const failed = progressState.failed + 1;

            return {
                ...progressState,
                failed,
            };
        }

        case "FINISH":
            return {
                ...progressState,
                running: false,
                finished: true,
                currentGame: "",
            };

        case "CANCEL":
            return {
                ...progressState,
                running: false,
                cancelled: true,
                currentGame: "",
            };

        default:
            return progressState;
    }
}

export function useMetadataIndexer() {
    const state = useSteamDataState();
    const { updateGameMetadata, addLookups } = useSteamDataActions();

    const [progress, progressDispatch] = useReducer(
        indexReducer,
        initialProgress,
    );

    const cancelRef = useRef(false);

    const cancel = useCallback(() => {
        cancelRef.current = true;
    }, []);

    const start = useCallback(async () => {
        cancelRef.current = false;

        const gamesToIndex = state.games.filter(
            (game) => !game.searchIndex,
        );

        progressDispatch({
            type: "START",
            total: gamesToIndex.length,
        });

        for (const game of gamesToIndex) {
            if (cancelRef.current) {
                progressDispatch({
                    type: "CANCEL",
                });

                return;
            }

            progressDispatch({
                type: "GAME",
                name: game.name,
            });

            try {
                const gameDetails = await getGameDetails(
                    game.appId,
                );

                updateGameMetadata(
                    game.appId,
                    {
                        name: game.name,
                        status: game.status,
                        customNotes: game.custom_notes,
                        customTags: game.custom_tags,
                        genres: gameDetails.genres,
                        categories: gameDetails.categories,
                        developers: gameDetails.developers,
                        publishers: gameDetails.publishers,
                    },
                );
                addLookups(gameDetails.developers, gameDetails.publishers, gameDetails.genres, gameDetails.categories)

                progressDispatch({
                    type: "SUCCESS",
                });
            } catch (error) {
                console.error(error);

                progressDispatch({
                    type: "FAILURE",
                });
            }

            await sleep(REQUEST_DELAY);
        }

        progressDispatch({
            type: "FINISH",
        });
    }, [state.games, updateGameMetadata]);

    return {
        progress,
        start,
        cancel,
    };
}