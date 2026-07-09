import { DialogDescription, DialogHeader, DialogTitle, Flex, Image, Text } from "@chakra-ui/react"
import { steamText } from "../../theming/steamText"
import { sanitizeSteamDescription } from "../../../utils/sanitizeSteamDescriptions"
import type { GameType } from "../../../types/gameType"
import type { GameDetailsType } from "../../../types/gameDetailsType"

type GameDetailsHeaderProps = {
    game: GameType,
    gameDetails?: GameDetailsType
}

export const GameDetailHeader = ({ game, gameDetails }: GameDetailsHeaderProps) => {
    return (
        <DialogHeader display="flex" flexDirection={"column"} alignItems="flex-start" gap={4} >
            <DialogTitle css={steamText.heading}>{game.name ?? "Game details"}</DialogTitle>
            <Flex direction={"row"} minW={0} gap={4} align="flex-start">
                <Image src={gameDetails?.header_image} flex="0 0 30%" maxW="30%" objectFit="cover" />
                <DialogDescription minW={0} flex="1">
                    <Text css={steamText.defaultText} lineClamp={8} dangerouslySetInnerHTML={{ __html: sanitizeSteamDescription(gameDetails ? gameDetails.about_the_game : "") }} />
                </DialogDescription>
            </Flex>
        </DialogHeader >
    )
}
