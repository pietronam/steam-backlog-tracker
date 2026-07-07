import {
    Box,
    Button,
    Image,
    Text,
    VStack
} from "@chakra-ui/react"
import { useSteamDataActions } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { memo } from "react"

const getCoverImageUrl = (appId: number) =>
    `https://shared.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900.jpg`

export type GameCardProps = {
    game: GameType
    onOpen?: (game: GameType) => void
}

const GameCardComponent = ({ game, onOpen }: GameCardProps) => {
    const coverImageUrl = getCoverImageUrl(game.appId)

    const { changeGameStatus } = useSteamDataActions();
    const handleStatusChange = (status: GameType["status"]) => {
        changeGameStatus(game.appId, status);
    };

    return (
        <Box
            as="article"
            role="group"
            position="relative"
            overflow="hidden"
            width="200px"
            height="300px"
            borderRadius="lg"
            shadow="md"
            cursor={onOpen ? "pointer" : "default"}
            transition="transform 0.2s ease"
            transformOrigin="center"
            _hover={{
                transform: "scale(1.08)",
                zIndex: 10,
            }}
            css={{
                "&:hover .overlay": {
                    opacity: 1,
                },
                "&:hover .gradient": {
                    opacity: 1,
                },
            }} onClick={() => onOpen?.(game)}
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
                w="100%"
                h="100%"
                bg="gray.100"
            />
            <Box
                position="absolute"
                inset={0}
                background="linear-gradient(
    to bottom,
    rgba(0,0,0,.9) 0%,
    rgba(0,0,0,.45) 45%,
    rgba(0,0,0,0) 100%
)"                opacity={0}
                transition="opacity .2s"
                className="gradient"
            />
            <Box
                className="overlay"
                position="absolute"
                inset={0}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p={3}
                opacity={0}
                transition="opacity .2s"
            >
                <Text
                    color="white"
                    fontWeight="bold"
                    fontSize="md"
                    lineClamp={2}
                >
                    {game.name}
                </Text>

                <VStack>
                    <Button size="md" flex={1} onClick={(e) => {
                        e.stopPropagation()
                        if (game.status === "backlog") {
                            handleStatusChange("untracked")
                        } else {
                            handleStatusChange("backlog")
                        }
                    }}>
                        {game.status === "backlog" ? "Remove from\nbacklog" : "Backlog"}
                    </Button>

                    <Button size="md" flex={1} onClick={(e) => {
                        e.stopPropagation()
                        if (game.status === "completed") {
                            handleStatusChange("untracked")
                        } else {
                            handleStatusChange("completed")
                        }
                    }}>
                        {game.status === "completed" ? "Unmark\ncompleted" : "Completed"}
                    </Button>
                </VStack>
            </Box>
        </Box>
    )
}

export const GameCard = memo(GameCardComponent)