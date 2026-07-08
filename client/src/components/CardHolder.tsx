import type { DialogOpenChangeDetails } from "@chakra-ui/react"
import {
    Box,
    Grid,
    Input,
    Text
} from "@chakra-ui/react"
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"

import type { GameType } from "../types/gameType"
import { GameCard } from "./GameCard"
import { GameDetailDialog } from "./GameDetailDialog"
import { PaginationBar } from "./PaginationBar"
import { steamColors } from "./theming/steamColors"

export type CardHolderProps = {
    games: GameType[]
}

export const CardHolder = ({ games }: CardHolderProps) => {
    const [open, setOpen] = useState(false)
    const [game, setSelectedGame] = useState<GameType | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)

    const pageSize = 30

    const handleOpenGame = useCallback((game: GameType) => {
        setSelectedGame(game)
        setOpen(true)
    }, [])

    const handleOpenChange = (details: DialogOpenChangeDetails) => {
        setOpen(details.open)

        if (!details.open) {
            setSelectedGame(null)
        }
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filteredGames = useMemo(() => {
        return games.filter((game) => {
            if (!normalizedQuery) {
                return true
            }

            return game.name.toLowerCase().includes(normalizedQuery)
        })
    }, [games, normalizedQuery])

    const totalPages = Math.max(
        1,
        Math.ceil(filteredGames.length / pageSize)
    )

    const currentPage = Math.min(page, totalPages)

    const pagedGames = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize

        return filteredGames.slice(startIndex, startIndex + pageSize)
    }, [currentPage, filteredGames])

    useEffect(() => {
        setPage(1)
    }, [normalizedQuery])

    return (
        <Box width="full" py={2}>
            <Box
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={4}
                flexWrap="wrap"
            >
                <Box maxW="400px" flex="1" minW="280px">
                    <Input
                        placeholder="Search games by name"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(event.target.value)
                        }
                        bg={steamColors.background}
                        borderColor="gray.500"
                        _placeholder={{ color: "gray.500" }}
                        minH="40px"
                    />
                </Box>

                <PaginationBar
                    count={filteredGames.length}
                    page={currentPage}
                    pageSize={pageSize}
                    onPageChange={setPage}
                />
            </Box>

            {filteredGames.length > 0 ? (
                <>
                    <Grid
                        templateColumns="repeat(auto-fill, 200px)"
                        justifyContent="space-between"
                        gap={4}
                    >
                        {pagedGames.map((game) => (
                            <GameCard
                                key={game.appId}
                                game={game}
                                onOpen={handleOpenGame}
                            />
                        ))}
                    </Grid>
                    <Box mt={4} display="flex" justifyContent="flex-end">
                        <PaginationBar
                            count={filteredGames.length}
                            page={currentPage}
                            pageSize={pageSize}
                            onPageChange={setPage}
                        />
                    </Box>
                </>
            ) : (
                <Text color="gray.500" px={1} py={6}>
                    No games match your search.
                </Text>
            )}

            {game && open && (
                <GameDetailDialog
                    appId={game.appId}
                    open={open}
                    handleOpenChange={handleOpenChange}
                />
            )}
        </Box>
    )
}