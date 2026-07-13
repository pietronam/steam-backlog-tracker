import { Flex, HStack, Icon, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FaClipboardList } from "react-icons/fa"
import { IoIosCheckbox } from "react-icons/io"
import { IoLibrary } from "react-icons/io5"
import { useSteamDataState } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { CardHolder } from "./CardHolder"
import { steamColors } from "./theming/steamColors"
import { steamText } from "./theming/steamText"
import { steamLayout } from "./theming/steamLayout"

type LibraryTab = "backlog" | "completed" | "library"

const tabs: Array<{ value: LibraryTab; label: string }> = [
    { value: "backlog", label: "Backlog" },
    { value: "completed", label: "Completed" },
    { value: "library", label: "Library" },
]

const matchesTab = (game: GameType, activeTab: LibraryTab) => {
    if (activeTab === "library") return true;

    return activeTab.toLowerCase() === game.status;
}

export const GameSelector = () => {
    const { games } = useSteamDataState()
    const [activeTab, setActiveTab] = useState<LibraryTab>("backlog")

    const visibleGames = games.filter((game) => matchesTab(game, activeTab))
    const tabCounts = {
        backlog: games.filter((game) => game.status === "backlog").length,
        completed: games.filter((game) => game.status === "completed").length,
        library: games.length,
    }

    return (
        <Flex px={4} py={8} direction={"column"} gap={5} w={"95%"}>
            <HStack css={steamLayout.panel} p={3} width="full" wrap="wrap" gap={2} justifyContent={"space-between"}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value
                    const icon =
                        tab.value === "backlog" ? (
                            <FaClipboardList />
                        ) : tab.value === "completed" ? (
                            <IoIosCheckbox />
                        ) : (
                            <IoLibrary />
                        )

                    return (
                        <Flex
                            css={steamText.heading}
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            flexGrow={1}
                        >
                            <HStack gap={2} align="center" borderBottom={"3px solid"}
                                borderBottomColor={isActive ? steamColors.blue : "transparent"}
                            >
                                <Icon size={"md"}>
                                    {icon}
                                </Icon>
                                <Text>
                                    {tab.label}
                                </Text>
                                <Text fontSize="xl">
                                    ({tabCounts[tab.value]})
                                </Text>
                            </HStack>
                        </Flex>
                    )
                })}
            </HStack>
            {visibleGames.length > 0 ? (
                <CardHolder games={visibleGames} />
            ) : (
                <Text px={4} py={6} color="gray.300" fontWeight={"bold"}>
                    No games in this view yet. Add them from your library!
                </Text>
            )}
        </Flex>


    )
}
