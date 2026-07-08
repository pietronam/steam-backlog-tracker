import {
    Box,
    Button,
    HStack,
    Icon,
    Image,
    Text
} from "@chakra-ui/react"
import { memo } from "react"
import { FaClipboardList } from "react-icons/fa"
import { IoIosCheckbox } from "react-icons/io"
import { IoLibrary } from "react-icons/io5"
import { useSteamDataActions } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { steamButtons } from "./theming/steamButtons"
import placeholderImage from "../assets/steam_placeholder_image.jpg";

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
                onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                }}
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

                <HStack>
                    <Button css={steamButtons.secondaryButton} size="md" flex={1} onClick={(e) => {
                        e.stopPropagation()
                        if (game.status === "backlog") {
                            handleStatusChange("untracked")
                        } else {
                            handleStatusChange("backlog")
                        }
                    }}>
                        <Icon>{game.status === "backlog" ? <IoLibrary /> : <FaClipboardList />}</Icon>
                    </Button>

                    <Button css={steamButtons.secondaryButton} size="md" flex={1} onClick={(e) => {
                        e.stopPropagation()
                        if (game.status === "completed") {
                            handleStatusChange("untracked")
                        } else {
                            handleStatusChange("completed")
                        }
                    }}>
                        <Icon>{game.status === "completed" ? <IoLibrary /> : <IoIosCheckbox />}</Icon>
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}

export const GameCard = memo(GameCardComponent)