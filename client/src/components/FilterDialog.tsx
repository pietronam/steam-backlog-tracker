import {
    AccordionRoot,
    Box,
    Button,
    CloseButton,
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogPositioner,
    DialogRoot,
    Portal,
    Icon,
    Text,
    VStack,
    type DialogOpenChangeDetails,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import type { GameType } from "../types/gameType";
import type { GameFilterState } from "../functions/filterGames";
import { CheckboxSection } from "./sub_components/filter_dialog/CheckboxSection";
import { steamColors } from "./theming/steamColors";
import { steamLayout } from "./theming/steamLayout";
import { steamText } from "./theming/steamText";
import { FilterAccordionItem } from "./sub_components/filter_dialog/FilterAccordionItem";
import { useSteamDataState } from "../context/SteamDataContext";
import { FiAlertTriangle } from "react-icons/fi";
import { SearchableCheckboxSection } from "./sub_components/filter_dialog/SearchableCheckboxSection";

type FilterDialogProps = {
    open: boolean;
    onOpenChange: (details: DialogOpenChangeDetails) => void;
    filters: GameFilterState;
    onApplyFilters: (filters: GameFilterState) => void;
    onClearFilters: () => void;
    genreMap: Record<number, string>;
    categoryMap: Record<number, string>;
    developers: string[];
    publishers: string[];
    statuses: GameType["status"][];
    tags: string[];
};

const emptyFilters = (): GameFilterState => ({
    selectedGenres: [],
    selectedCategories: [],
    selectedDevelopers: [],
    selectedPublishers: [],
    selectedStatuses: [],
    selectedTags: [],
});

export const FilterDialog = ({
    open,
    onOpenChange,
    filters,
    onApplyFilters,
    onClearFilters,
    genreMap,
    categoryMap,
    developers,
    publishers,
    statuses,
    tags,
}: FilterDialogProps) => {
    const { games } = useSteamDataState();
    const gamesToIndex = games.filter((game) => !game.searchIndex);

    const [draftFilters, setDraftFilters] = useState<GameFilterState>(filters);

    useEffect(() => {
        setDraftFilters(filters);
    }, [filters, open]);

    const genreEntries = useMemo(
        () => Object.entries(genreMap).sort(([left], [right]) => Number(left) - Number(right)),
        [genreMap],
    );

    const categoryEntries = useMemo(
        () => Object.entries(categoryMap).sort(([left], [right]) => Number(left) - Number(right)),
        [categoryMap],
    );

    const genreValues = useMemo(() => genreEntries.map(([id]) => Number(id)), [genreEntries]);

    const genreLabels = useMemo(() => Object.fromEntries(genreEntries), [genreEntries]);

    const categoryValues = useMemo(() => categoryEntries.map(([id]) => Number(id)), [categoryEntries]);

    const categoryLabels = useMemo(() => Object.fromEntries(categoryEntries), [categoryEntries]);

    const handleApply = () => {
        onApplyFilters(draftFilters);
        onOpenChange({ open: false });
    };

    const handleClear = () => {
        setDraftFilters(emptyFilters());
        onClearFilters();
        onOpenChange({ open: false });
    };

    return (
        <DialogRoot open={open} onOpenChange={onOpenChange} size="lg" placement="center">
            <Portal>
                <DialogBackdrop />
                <DialogPositioner>
                    <DialogContent css={steamLayout.panel}>
                        <DialogBody>
                            <VStack align="stretch" gap={4}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Text css={steamText.heading} fontSize="xl">
                                        Filter games
                                    </Text>
                                    <DialogCloseTrigger asChild>
                                        <CloseButton color={steamColors.textPrimary} bgColor="transparent" />
                                    </DialogCloseTrigger>
                                </Box>

                                {gamesToIndex.length > 0 && (
                                    <Box
                                        display="flex"
                                        gap={3}
                                        alignItems="flex-start"
                                        border={`1px solid ${steamColors.border}`}
                                        bg="rgba(255,0,0,0.06)"
                                        p={3}
                                        borderRadius="md"
                                    >
                                        <Icon as={FiAlertTriangle} color="red.400" mt="4px" boxSize={5} />
                                        <Text color={steamColors.textPrimary} fontSize="sm">
                                            Some or all games in your library are missing important metadata. Filtering will not work
                                            correctly until all your games have been indexed. To index your games, click the button on the top
                                            right.
                                        </Text>
                                    </Box>
                                )}

                                <AccordionRoot multiple={false} collapsible lazyMount>
                                    <FilterAccordionItem value="statuses" title="Statuses">
                                        <CheckboxSection
                                            values={statuses}
                                            selectedValues={draftFilters.selectedStatuses}
                                            keyName="selectedStatuses"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>

                                    <FilterAccordionItem value="genres" title="Genres">
                                        <CheckboxSection
                                            values={genreValues}
                                            labels={genreLabels}
                                            selectedValues={draftFilters.selectedGenres}
                                            keyName="selectedGenres"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>

                                    <FilterAccordionItem value="categories" title="Categories">
                                        <CheckboxSection
                                            values={categoryValues}
                                            labels={categoryLabels}
                                            selectedValues={draftFilters.selectedCategories}
                                            keyName="selectedCategories"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>

                                    <FilterAccordionItem
                                        value="developers"
                                        title="Developers"
                                    >
                                        <SearchableCheckboxSection
                                            values={developers}
                                            selectedValues={draftFilters.selectedDevelopers}
                                            keyName="selectedDevelopers"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>

                                    <FilterAccordionItem
                                        value="publishers"
                                        title="Publishers"
                                    >
                                        <SearchableCheckboxSection
                                            values={publishers}
                                            selectedValues={draftFilters.selectedPublishers}
                                            keyName="selectedPublishers"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>

                                    {/* <FilterAccordionItem value="developers" title="Developers">
                                        <CheckboxSection
                                            values={developers}
                                            selectedValues={draftFilters.selectedDevelopers}
                                            keyName="selectedDevelopers"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>

                                    <FilterAccordionItem value="publishers" title="Publishers">
                                        <CheckboxSection
                                            values={publishers}
                                            selectedValues={draftFilters.selectedPublishers}
                                            keyName="selectedPublishers"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem> */}

                                    <FilterAccordionItem value="tags" title="Custom tags">
                                        <CheckboxSection
                                            values={tags}
                                            selectedValues={draftFilters.selectedTags}
                                            keyName="selectedTags"
                                            setDraftFilters={setDraftFilters}
                                        />
                                    </FilterAccordionItem>
                                </AccordionRoot>
                            </VStack>
                        </DialogBody>

                        <DialogFooter>
                            <Button variant="outline" borderColor={steamColors.border} color={steamColors.textPrimary} onClick={handleClear}>
                                Clear
                            </Button>
                            <Button bg={steamColors.blue} color={steamColors.background} _hover={{ bg: steamColors.blueHover }} onClick={handleApply}>
                                Apply filters
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </DialogPositioner>
            </Portal>
        </DialogRoot>
    );
};
