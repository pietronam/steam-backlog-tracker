import {
    Box,
    Button,
    Grid,
    Input,
    Text,
    type DialogOpenChangeDetails,
} from "@chakra-ui/react"
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"
import { FaFilter } from "react-icons/fa"

import { useSteamDataState } from "../context/SteamDataContext"
import type { GameType } from "../types/gameType"
import { filterGames, type GameFilterState } from "../utils/filterGames"
import { GameCard } from "./GameCard"
import { GameDetailDialog } from "./GameDetailDialog"
import { FilterDialog } from "./FilterDialog"
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
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [activeFilters, setActiveFilters] = useState<GameFilterState>({
        selectedGenres: [],
        selectedCategories: [],
        selectedDevelopers: [],
        selectedPublishers: [],
        selectedStatuses: [],
        selectedTags: [],
    })

    const { genreMap, categoryMap } = useSteamDataState()

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

    const filteredGames = useMemo(() => {
        return filterGames(games, searchQuery, activeFilters)
    }, [games, searchQuery, activeFilters])

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
    }, [searchQuery, activeFilters])

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
                <Box display="flex" flex="1" minW="280px" maxW="520px" gap={2}>
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
                    <Button
                        onClick={() => setIsFilterOpen(true)}
                        minW="44px"
                        bg={steamColors.surface}
                        color={steamColors.textPrimary}
                        _hover={{ bg: steamColors.elevated }}
                    >
                        <FaFilter />
                    </Button>
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

            <FilterDialog
                open={isFilterOpen}
                onOpenChange={(details) => setIsFilterOpen(details.open)}
                filters={activeFilters}
                onApplyFilters={setActiveFilters}
                onClearFilters={() => setActiveFilters({
                    selectedGenres: [],
                    selectedCategories: [],
                    selectedDevelopers: [],
                    selectedPublishers: [],
                    selectedStatuses: [],
                    selectedTags: [],
                })}
                genreMap={genreMap}
                categoryMap={categoryMap}
                developers={Array.from(new Set(games.flatMap((game) => game.summary.developers))).sort()}
                publishers={Array.from(new Set(games.flatMap((game) => game.summary.publishers))).sort()}
                statuses={["backlog", "completed", "untracked"]}
                tags={Array.from(new Set(games.flatMap((game) => game.custom_tags))).sort()}
            />

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