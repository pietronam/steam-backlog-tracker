import { useState } from "react"
import {
    Box,
    Button,
    SimpleGrid,
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogBody,
    DialogFooter,
    DialogCloseTrigger,
    Text,
    VStack,
    HStack,
    Badge,
    Portal,
    DialogBackdrop,
    DialogPositioner,
} from "@chakra-ui/react"
import { GameCard } from "./GameCard"
import type { GameType } from "../types/gameType"
import type { DialogOpenChangeDetails } from "@chakra-ui/react"

export type CardHolderProps = {
    games: GameType[]
}

export const CardHolder = ({ games }: CardHolderProps) => {
    const [open, setOpen] = useState(false)
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null)

    const handleOpenGame = (game: GameType) => {
        setSelectedGame(game)
        setOpen(true)
    }

    const handleOpenChange = (details: DialogOpenChangeDetails) => {
        setOpen(details.open)
        if (!details.open) {
            setSelectedGame(null)
        }
    }

    return (
        <Box width="full" px={4} py={2}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }} gap={4}>
                {games.map((game) => (
                    <GameCard key={game.appid} game={game} onOpen={handleOpenGame} />
                ))}
            </SimpleGrid>

            <DialogRoot open={open} onOpenChange={handleOpenChange} size={"cover"} placement={"center"}>
                <Portal>
                    <DialogBackdrop />
                    <DialogPositioner>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{selectedGame?.name ?? "Game details"}</DialogTitle>
                                <DialogDescription>
                                    {selectedGame?.game_details.short_description}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogBody>
                                {selectedGame ? (
                                    <VStack align="stretch" gap={4}>
                                        <HStack gap={2} wrap="wrap">
                                            <Badge colorScheme="green">{selectedGame.status}</Badge>
                                            {selectedGame.custom_tags.map((tag) => (
                                                <Badge key={tag} colorScheme="blue">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </HStack>

                                        <Box>
                                            <Text fontWeight="bold">Developers</Text>
                                            <Text>{selectedGame.game_details.developers.join(", ")}</Text>
                                        </Box>

                                        <Box>
                                            <Text fontWeight="bold">Publishers</Text>
                                            <Text>{selectedGame.game_details.publishers.join(", ")}</Text>
                                        </Box>

                                        <Box>
                                            <Text fontWeight="bold">Genres</Text>
                                            <Text>{selectedGame.game_details.genres.map((genre) => genre.description).join(", ")}</Text>
                                        </Box>

                                        {selectedGame.game_details.metacritic ? (
                                            <Box>
                                                <Text fontWeight="bold">Metacritic</Text>
                                                <Text>{selectedGame.game_details.metacritic.score}</Text>
                                            </Box>
                                        ) : null}

                                        <Box>
                                            <Text fontWeight="bold">Description</Text>
                                            <Text>{selectedGame.custom_description}</Text>
                                        </Box>
                                    </VStack>
                                ) : (
                                    <Text>No game selected.</Text>
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
        </Box>
    )
}
