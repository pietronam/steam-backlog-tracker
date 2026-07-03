import { Badge, Box, Button, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPositioner, DialogRoot, DialogTitle, Flex, HStack, Image, Portal, Spinner, Text, VStack, type DialogOpenChangeDetails } from "@chakra-ui/react";
import type { GameType } from "../types/gameType";
import { useGameDetails } from "../hooks/useGameDetails";
import { useSteamData } from "../context/SteamDataContext";
import { sanitizeSteamDescription } from "../utils/sanitizeSteamDescriptions";

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
    const { changeGameStatus, addCustomTag } = useSteamData();

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
                    <DialogHeader display="flex" flexDirection={"column"} alignItems="flex-start" gap={4}>
                        <DialogTitle>{game.name ?? "Game details"}</DialogTitle>
                        <Flex direction={"row"} minW={0} gap={4} align="flex-start">
                            <Image src={gameDetails?.header_image} flex="0 0 30%" maxW="30%" objectFit="cover" />
                            <DialogDescription minW={0} flex="1">
                                <Text lineClamp={5} dangerouslySetInnerHTML={{ __html: sanitizeSteamDescription(details.about_the_game) }} />
                            </DialogDescription>
                        </Flex>
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

                                <HStack gap={2} wrap="wrap">
                                    <Badge colorScheme="green" px={3} py={1} fontSize="sm">{game.status}</Badge>
                                    {gameDetails?.genres.map((genre) => (
                                        <Badge key={genre.id} colorScheme="blue" px={3} py={1} fontSize="sm">
                                            {genre.description}
                                        </Badge>
                                    ))}
                                    {game.custom_tags.map((tag) => (
                                        <Badge key={tag} colorScheme="blue" px={3} py={1} fontSize="sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const tag = window.prompt("Enter a custom tag");
                                            if (tag && tag.trim()) {
                                                addCustomTag(game.appId, tag.trim());
                                            }
                                        }}
                                    >
                                        Add custom tag
                                    </Button>
                                </HStack>
                                <Flex justifyContent={"space-between"}>
                                    <Flex direction={"column"} gap={4} flex="0 0 34%">
                                        <Box minW={0}>
                                            <Text fontWeight="bold">Genres</Text>
                                            <Text>{details.genres.map((genre) => genre.description).join(", ")}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Metacritic</Text>
                                            <Text>{details.metacritic ? details.metacritic.score : "No metacritic data found."}</Text>
                                        </Box>
                                    </Flex>
                                    <Flex direction={"column"} gap={4} flex="0 0 34%">
                                        <Box flex="1" minW={0}>
                                            <Text fontWeight="bold">Developers</Text>
                                            <Text>{details.developers.join(", ")}</Text>
                                        </Box>
                                        <Box flex="1" minW={0}>
                                            <Text fontWeight="bold">Publishers</Text>
                                            <Text>{details.publishers.join(", ")}</Text>
                                        </Box>
                                    </Flex>
                                    <Flex direction={"column"} gap={4} flex="0 0 34%">
                                        <Box>
                                            <Text fontWeight="bold">Description</Text>
                                            <Text>{game.custom_description ? game.custom_description : "No custom description."}</Text>
                                        </Box>
                                    </Flex>
                                </Flex>
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
    </DialogRoot >
}