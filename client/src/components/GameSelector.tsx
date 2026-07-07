import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useSteamDataState } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { CardHolder } from "./CardHolder"
import { steamColors } from "./theming/steamColors"
import { steamLayout } from "./theming/steamLayout"
import { steamText } from "./theming/steamText"

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

    return (
        <Box css={steamLayout.panel} w={("95vw")} my={10}>
            <Box px={4} py={3}>
                <HStack width="full" wrap="wrap" gap={2} justifyContent={"space-between"}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.value
                        return (
                            <Flex
                                css={steamText.heading}
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                flexGrow={1}
                            >
                                <Text
                                    borderBottom={"3px solid"}
                                    borderBottomColor={isActive ? steamColors.blue : "transparent"}
                                >
                                    {tab.label}
                                </Text>
                            </Flex>
                        )
                    })}
                </HStack>
            </Box>

            {visibleGames.length > 0 ? (
                <CardHolder games={visibleGames} />
            ) : (
                <Text px={4} py={6} color="gray.500">
                    No games in this view yet.
                </Text>
            )}
        </Box>
    )
}
