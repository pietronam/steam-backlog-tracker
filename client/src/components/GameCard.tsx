import {
    Box,
    Button,
    HStack,
    Icon,
    Image,
    Text
} from "@chakra-ui/react"
import { memo } from "react"
import { FaClipboardList, FaRegStar, FaStar } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { IoIosCheckbox } from "react-icons/io"
import placeholderImage from "../assets/steam_placeholder_image.jpg"
import { useSteamDataActions } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { steamButtons } from "./theming/steamButtons"

const getCoverImageUrl = (appId: number) =>
    `https://shared.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900.jpg`

export type GameCardProps = {
    game: GameType
    onOpen?: (game: GameType) => void
}

const GameCardComponent = ({ game, onOpen }: GameCardProps) => {
    const coverImageUrl = getCoverImageUrl(game.appId)

    const { changeGameStatus, setPriority } = useSteamDataActions();
    const handleStatusChange = (status: GameType["status"]) => {
        changeGameStatus(game.appId, status);
    };

    const leftButton = (() => {
        if (game.status !== "backlog") {
            return {
                label: "Add to backlog",
                action: () => handleStatusChange("backlog"),
                icon: <FaClipboardList />,
            };
        }

        if (game.priority === 5) {
            return {
                label: "Remove high priority",
                action: () => setPriority(game.appId, 1),
                icon: <FaRegStar color="gray" />,
            };
        }

        return {
            label: "High priority",
            action: () => setPriority(game.appId, 5),
            icon: <FaStar color="yellow" />,
        };
    })();

    const rightButton = (() => {
        if (game.status === "completed") {
            return {
                label: "Stop tracking",
                action: () => handleStatusChange("untracked"),
                icon: <ImCross />,
            };
        } else {
            return {
                label: "Mark completed",
                action: () => handleStatusChange("completed"),
                icon: <IoIosCheckbox color="lightGreen" />,
            };

        }
    })();
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
            {game.priority === 5 && (
                <Box
                    position="absolute"
                    top={2}
                    right={2}
                    zIndex={2}
                    bg="blackAlpha.600"
                    borderRadius="full"
                    p={1}
                >
                    <FaStar color="yellow" size={16} />
                </Box>
            )}
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
                    <Button
                        css={steamButtons.secondaryButton}
                        size="md"
                        flex={1}
                        aria-label={leftButton.label}
                        title={leftButton.label}
                        onClick={(e) => {
                            e.stopPropagation();
                            leftButton.action()
                        }}
                    >
                        <Icon>{leftButton.icon}</Icon>
                    </Button>

                    <Button
                        css={steamButtons.secondaryButton}
                        size="md"
                        flex={1}
                        aria-label={rightButton.label}
                        title={rightButton.label}
                        onClick={(e) => {
                            e.stopPropagation()
                            rightButton.action()
                        }}
                    >
                        <Icon>{rightButton.icon}</Icon>
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}

export const GameCard = memo(GameCardComponent)