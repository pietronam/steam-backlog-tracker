import { Box, Image } from "@chakra-ui/react"
import type { GameType } from "../types/GameType"

const getCoverImageUrl = (appid: number) =>
    `https://shared.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`

export type GameCardProps = {
    game: GameType
}

export const GameCard = ({ game }: GameCardProps) => {
    const coverImageUrl = getCoverImageUrl(game.appid)

    return (
        <Box
            as="article"
            overflow="hidden"
            bg="white"
            shadow="md"
        >
            <Image
                src={coverImageUrl}
                alt={`${game.name} cover`}
                width="200px"
                height="300px"
                loading="lazy"
                objectFit="cover"
                bg="gray.100"
            />
        </Box>
    )
}