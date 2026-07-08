import type { DialogOpenChangeDetails } from "@chakra-ui/react"
import {
    Box,
    Input,
    SimpleGrid,
    Text
} from "@chakra-ui/react"
import { useCallback, useState } from "react"
import type { GameType } from "../types/gameType"
import { GameCard } from "./GameCard"
import { GameDetailDialog } from "./GameDetailDialog"
import { steamColors } from "./theming/steamColors"

export type CardHolderProps = {
    games: GameType[]
}

export const CardHolder = ({ games }: CardHolderProps) => {
    const [open, setOpen] = useState(false)
    const [game, setSelectedGame] = useState<GameType | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleOpenGame = useCallback((game: GameType) => {
        setSelectedGame(game)
        setOpen(true)
    },[])

    const handleOpenChange = (details: DialogOpenChangeDetails) => {
        setOpen(details.open)
        if (!details.open) {
            setSelectedGame(null)
        }
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()
    const filteredGames = games.filter((game) => {
        if (!normalizedQuery) {
            return true
        }

        return game.name.toLowerCase().includes(normalizedQuery)
    })

    return (
        <Box width="full" px={4} py={2}>
            <Box mb={4} maxW="400px">
                <Input
                    placeholder="Search games by name"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    bg={steamColors.background}
                    borderColor="gray.500"
                    _placeholder={{ color: "gray.500" }}
                />
            </Box>

            {filteredGames.length > 0 ? (
                <SimpleGrid
                    p={5}
                    bgColor={steamColors.background}
                    borderRadius={4}
                    columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
                    gap={4}>
                    {filteredGames.map((game) => (
                        <GameCard key={game.appId} game={game} onOpen={handleOpenGame} />
                    ))}
                </SimpleGrid>
            ) : (
                <Text color="gray.500" px={1} py={6}>
                    No games match your search.
                </Text>
            )}

            {game && open && <GameDetailDialog appId={game.appId} open={open} handleOpenChange={handleOpenChange} />}
        </Box>
    )
}
