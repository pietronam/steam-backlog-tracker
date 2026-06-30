import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useSteamData } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { CardHolder } from "./CardHolder"

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
    const { state } = useSteamData()
    const [activeTab, setActiveTab] = useState<LibraryTab>("backlog")

    const visibleGames = state.games.filter((game) => matchesTab(game, activeTab))

    return (
        <Box width="full">
            <Box px={4} py={3}>
                <HStack width="full" wrap="wrap" gap={2} justifyContent={"space-between"}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.value

                        return (
                            <Flex
                                key={tab.value}
                                bgColor={isActive ? "blue" : "gray"}
                                onClick={() => setActiveTab(tab.value)}
                                border={"solid black 1px"}
                                flexGrow={1}
                            >
                                {tab.label}
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
