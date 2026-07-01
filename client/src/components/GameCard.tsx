import { Box, Image } from "@chakra-ui/react"
import type { GameType } from "../types/gameType"

const getCoverImageUrl = (appId: number) =>
    `https://shared.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900.jpg`

export type GameCardProps = {
    game: GameType
    onOpen?: (game: GameType) => void
}

export const GameCard = ({ game, onOpen }: GameCardProps) => {
    const coverImageUrl = getCoverImageUrl(game.appId)

    return (
        <Box
            as="article"
            overflow="hidden"
            width="200px"
            height="300px"
            shadow="md"
            borderRadius="lg"
            cursor={onOpen ? "pointer" : "default"}
            onClick={() => onOpen?.(game)}
            role={onOpen ? "button" : undefined}
            tabIndex={onOpen ? 0 : undefined}
            onKeyDown={(event) => {
                if (!onOpen) return
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onOpen(game)
                }
            }}
        >
            <Image
                src={coverImageUrl}
                alt={`${game.name} cover`}
                loading="lazy"
                objectFit="cover"
                bg="gray.100"
            />
        </Box>
    )
}