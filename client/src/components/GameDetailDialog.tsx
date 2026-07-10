import { Box, CloseButton, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogPositioner, DialogRoot, Portal, Spinner, Text, VStack, type DialogOpenChangeDetails } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSteamDataActions, useSteamDataState } from "../context/SteamDataContext";
import { useGameDetails } from "../hooks/useGameDetails";
import { GameDetailHeader } from "./sub_components/detail_dialog/GameDetailHeader";
import { GameDetailInfosection } from "./sub_components/detail_dialog/GameDetailInfoSection";
import { GameDetailTags } from "./sub_components/detail_dialog/GameDetailTags";
import { steamColors } from "./theming/steamColors";
import { steamLayout } from "./theming/steamLayout";
import { steamText } from "./theming/steamText";

type GameDetailDialogProps = {
    appId: number,
    open: boolean,
    handleOpenChange: (details: DialogOpenChangeDetails) => void,
}

export const GameDetailDialog = ({ appId, open, handleOpenChange }: GameDetailDialogProps) => {
    const { games } = useSteamDataState();

    const game = games.find(game => game.appId === appId)
    if (!game) return null;

    const { data: gameDetails, isFetching, isError, error } = useGameDetails(game.appId);
    const { addLookups, updateGameMetadata } = useSteamDataActions();

    useEffect(() => {
        if (!gameDetails) return;

        addLookups(gameDetails.developers, gameDetails.publishers, gameDetails.genres, gameDetails.categories);
        updateGameMetadata(game.appId, {
            name: game.name,
            customNotes: game.custom_notes,
            customTags: game.custom_tags,
            status: game.status,
            genres: gameDetails.genres,
            categories: gameDetails.categories,
            developers: gameDetails.developers,
            publishers: gameDetails.publishers,
        });
    }, [game.appId, gameDetails]);


    return <DialogRoot open={open} onOpenChange={handleOpenChange} size={"cover"} placement={"center"}>
        <Portal>
            <DialogBackdrop />
            <DialogPositioner>
                <DialogContent css={steamLayout.panel}>
                    <GameDetailHeader game={game} gameDetails={gameDetails} />
                    <DialogBody>
                        {isError ? (
                            <Text css={steamText.defaultText} color="red.500">
                                Unable to load game details{error ? `: ${error.message}` : "."}
                            </Text>
                        ) : isFetching ? (
                            <Box minH="320px" display="flex" alignItems="center" justifyContent="center">
                                <Spinner color={steamColors.textPrimary} size="xl" />
                            </Box>
                        ) : (
                            <VStack align="stretch" gap={4}>
                                <GameDetailTags game={game} gameDetails={gameDetails} />
                                <GameDetailInfosection game={game} gameDetails={gameDetails} />
                            </VStack>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <DialogCloseTrigger asChild>
                            <CloseButton color={steamColors.textPrimary} bgColor={'transparent'} />
                        </DialogCloseTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogPositioner>
        </Portal>
    </DialogRoot >
}