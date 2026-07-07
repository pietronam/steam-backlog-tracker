import { Badge, Box, Button, CloseButton, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPositioner, DialogRoot, DialogTitle, Flex, HStack, Image, Portal, Spinner, Text, Textarea, VStack, type DialogOpenChangeDetails } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSteamDataActions } from "../context/SteamDataContext";
import { useGameDetails } from "../hooks/useGameDetails";
import type { GameType } from "../types/gameType";
import { sanitizeSteamDescription } from "../utils/sanitizeSteamDescriptions";
import { steamButtons } from "./theming/steamButtons";
import { steamColors } from "./theming/steamColors";
import { steamLayout } from "./theming/steamLayout";
import { steamMisc } from "./theming/steamMisc";
import { steamText } from "./theming/steamText";

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
    const { changeGameStatus, addCustomTag, addCustomNotes } = useSteamDataActions();
    const [notesDraft, setNotesDraft] = useState(game.custom_notes);

    const details = gameDetails ?? emptyGameDetails;
    const statusOptions: Array<{ label: string; status: GameType["status"] }> = [
        { label: "Add to backlog", status: "backlog" },
        { label: "Mark completed", status: "completed" },
        { label: "Mark untracked", status: "untracked" },
    ];

    const visibleStatusOptions = statusOptions.filter(({ status }) => status !== game.status);

    useEffect(() => {
        setNotesDraft(game.custom_notes);
    }, [game.appId, game.custom_notes]);

    const handleStatusChange = (status: GameType["status"]) => {
        changeGameStatus(game.appId, status);
    };

    const handleNotesSave = () => {
        addCustomNotes(game.appId, notesDraft.trim());
    };

    return <DialogRoot open={open} onOpenChange={handleOpenChange} size={"cover"} placement={"center"}>
        <Portal>
            <DialogBackdrop />
            <DialogPositioner>
                <DialogContent css={steamLayout.panel}>
                    <DialogHeader display="flex" flexDirection={"column"} alignItems="flex-start" gap={4}>
                        <DialogTitle css={steamText.heading}>{game.name ?? "Game details"}</DialogTitle>
                        <Flex direction={"row"} minW={0} gap={4} align="flex-start">
                            <Image src={gameDetails?.header_image} flex="0 0 30%" maxW="30%" objectFit="cover" />
                            <DialogDescription minW={0} flex="1">
                                <Text css={steamText.defaultText} lineClamp={8} dangerouslySetInnerHTML={{ __html: sanitizeSteamDescription(details.about_the_game) }} />
                            </DialogDescription>
                        </Flex>
                    </DialogHeader>
                    <DialogBody>
                        {isError ? (
                            <Text css={steamText.defaultText} color="red.500">
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
                                        <Button css={steamButtons.secondaryButton} key={status} size="sm" onClick={() => handleStatusChange(status)}>
                                            {label}
                                        </Button>
                                    ))}
                                </HStack>

                                <HStack gap={2} wrap="wrap">
                                    <Badge css={steamMisc.storeTag} colorScheme="green" px={3} py={1} fontSize="sm">{game.status}</Badge>
                                    {gameDetails?.genres.map((genre) => (
                                        <Badge css={steamMisc.storeTag} key={genre.id} px={3} py={1} fontSize="sm">
                                            {genre.description}
                                        </Badge>
                                    ))}
                                    {game.custom_tags.map((tag) => (
                                        <Badge css={steamMisc.storeTag} key={tag} px={3} py={1} fontSize="sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                    <Button
                                        css={steamMisc.storeTag}
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const tag = window.prompt("Enter a custom tag");
                                            if (tag && tag.trim()) {
                                                addCustomTag(game.appId, tag.trim());
                                            }
                                        }}
                                    >
                                        + add custom tag
                                    </Button>
                                </HStack>
                                <Flex justifyContent={"space-between"}>
                                    <Flex direction={"column"} gap={4} flex="0 0 34%">
                                        <Box minW={0}>
                                            <Text css={steamText.defaultText} fontWeight="bold">Genres</Text>
                                            <Text css={steamText.defaultText}>{details.genres.map((genre) => genre.description).join(", ")}</Text>
                                        </Box>
                                        <Box>
                                            <Text css={steamText.defaultText} fontWeight="bold">Metacritic Rating</Text>
                                            <Text css={steamText.defaultText}>{details.metacritic ? details.metacritic.score : "No metacritic data found."}</Text>
                                        </Box>
                                    </Flex>
                                    <Flex direction={"column"} gap={4} flex="0 0 34%">
                                        <Box flex="1" minW={0}>
                                            <Text css={steamText.defaultText} fontWeight="bold">Developers</Text>
                                            <Text css={steamText.defaultText}>{details.developers.join(", ")}</Text>
                                        </Box>
                                        <Box flex="1" minW={0}>
                                            <Text css={steamText.defaultText} fontWeight="bold">Publishers</Text>
                                            <Text css={steamText.defaultText}>{details.publishers.join(", ")}</Text>
                                        </Box>
                                    </Flex>
                                    <Flex direction={"column"} gap={4} flex="0 0 34%">
                                        <Box>
                                            <Text css={steamText.defaultText} fontWeight="bold">Notes</Text>
                                            <Text css={steamText.defaultText}>{game.custom_notes ? game.custom_notes : "No custom notes."}</Text>
                                            <Textarea
                                                css={steamMisc.input}
                                                value={notesDraft}
                                                onChange={(event) => setNotesDraft(event.target.value)}
                                                onBlur={handleNotesSave}
                                                placeholder="Add a custom note"
                                                minH="60px"
                                                w="80%"
                                                resize="vertical"
                                                mt={2}
                                            />
                                            <Button css={steamButtons.secondaryButton} size="sm" mt={2} onClick={handleNotesSave}>
                                                Save notes
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Flex>
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