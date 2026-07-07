import type { DialogOpenChangeDetails } from "@chakra-ui/react"
import {
    Box,
    SimpleGrid
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

    return (
        <Box width="full" px={4} py={2}>
            <SimpleGrid
                p={5}
                bgColor={steamColors.background}
                borderRadius={4}
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
                gap={4}>
                {games.map((game) => (
                    <GameCard key={game.appId} game={game} onOpen={handleOpenGame} />
                ))}
            </SimpleGrid>

            {game && open && <GameDetailDialog game={game} open={open} handleOpenChange={handleOpenChange} />}
        </Box>
    )
}
