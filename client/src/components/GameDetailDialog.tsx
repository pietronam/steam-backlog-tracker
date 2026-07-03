import { Box, Button, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPositioner, DialogRoot, DialogTitle, HStack, Portal, Spinner, Text, VStack, type DialogOpenChangeDetails } from "@chakra-ui/react";
import type { GameType } from "../types/gameType";
import { useGameDetails } from "../hooks/useGameDetails";
import { useSteamData } from "../context/SteamDataContext";

type GameDetailDialogProps = {
    game: GameType,
    open: boolean,
    handleOpenChange: (details: DialogOpenChangeDetails) => void,
}

const emptyGameDetails = {
    genres: [],
    categories: [],
    about_the_game: "",
    developers: [],
    publishers: [],
    metacritic: {
        score: 0,
        url: "",
    },
    pc_requirements: {
        minimum: "",
        required: "",
    },
    website: "",
    price_overview: {
        currency: "",
        discount_percent: 0,
        initial_formatted: "",
        final_formatted: "",
    },
    dlc: [],
};

export const GameDetailDialog = ({ game, open, handleOpenChange }: GameDetailDialogProps) => {
    const { data: gameDetails, isFetching, isError, error } = useGameDetails(game.appId);
    const { changeGameStatus } = useSteamData();

    const details = gameDetails ?? emptyGameDetails;
    const statusOptions: Array<{ label: string; status: GameType["status"] }> = [
        { label: "Add to backlog", status: "backlog" },
        { label: "Mark completed", status: "completed" },
        { label: "Mark untracked", status: "untracked" },
    ];

    const visibleStatusOptions = statusOptions.filter(({ status }) => status !== game.status);

    const handleStatusChange = (status: GameType["status"]) => {
        changeGameStatus(game.appId, status);
    };

    return <DialogRoot open={open} onOpenChange={handleOpenChange} size={"cover"} placement={"center"}>
        <Portal>
            <DialogBackdrop />
            <DialogPositioner>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{game.name ?? "Game details"}</DialogTitle>
                        <DialogDescription>
                            {details.about_the_game}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        {isError ? (
                            <Text color="red.500">
                                Unable to load game details{error ? `: ${error.message}` : "."}
                            </Text>
                        ) : isFetching ? (
                            <Box minH="320px" display="flex" alignItems="center" justifyContent="center">
                                <Spinner size="xl" />
                            </Box>
                        ) : (
                            <VStack align="stretch" gap={4}>
                                <HStack gap={2} wrap="wrap">
                                    {visibleStatusOptions.map(({ label, status }) => (
                                        <Button key={status} size="sm" onClick={() => handleStatusChange(status)}>
                                            {label}
                                        </Button>
                                    ))}
                                </HStack>

                                {/* IMPLEMENT BUTTONS HERE */}

                                {/* <VStack align="stretch" gap={4}>
                                    <HStack gap={2} wrap="wrap">
                                        <Badge colorScheme="green">{game.status}</Badge>
                                        {game.custom_tags.map((tag) => (
                                            <Badge key={tag} colorScheme="blue">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </HStack>

                                    <Box>
                                        <Text fontWeight="bold">Developers</Text>
                                        <Text>{details.developers.join(", ")}</Text>
                                    </Box>

                                    <Box>
                                        <Text fontWeight="bold">Publishers</Text>
                                        <Text>{details.publishers.join(", ")}</Text>
                                    </Box>

                                    <Box>
                                        <Text fontWeight="bold">Genres</Text>
                                        <Text>{details.genres.map((genre) => genre.description).join(", ")}</Text>
                                    </Box>

                                    {details.metacritic ? (
                                        <Box>
                                            <Text fontWeight="bold">Metacritic</Text>
                                            <Text>{details.metacritic.score}</Text>
                                        </Box>
                                    ) : null}

                                    <Box>
                                        <Text fontWeight="bold">Description</Text>
                                        <Text>{game.custom_description}</Text>
                                    </Box>
                                </VStack> */}
                            </VStack>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <DialogCloseTrigger asChild>
                            <Button>Close</Button>
                        </DialogCloseTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogPositioner>
        </Portal>
    </DialogRoot>
}