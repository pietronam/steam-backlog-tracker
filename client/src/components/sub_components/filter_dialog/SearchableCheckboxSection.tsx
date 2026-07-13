import {
    Box,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
    CheckboxRoot,
    Input,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { memo, useMemo, useState } from "react";
import type { GameFilterState } from "../../../utils/filterGames";
import { steamColors } from "../../theming/steamColors";
import { steamMisc } from "../../theming/steamMisc";
import { steamText } from "../../theming/steamText";

type SearchableCheckboxSectionProps = {
    values: string[];
    selectedValues: string[];
    keyName: keyof GameFilterState;
    setDraftFilters: React.Dispatch<React.SetStateAction<GameFilterState>>;
};

const MAX_RESULTS = 20;

const SearchableCheckboxSectionComponent = ({
    values,
    selectedValues,
    keyName,
    setDraftFilters,
}: SearchableCheckboxSectionProps) => {
    const [search, setSearch] = useState("");

    const selectedSet = useMemo(
        () => new Set(selectedValues),
        [selectedValues]
    );

    const filteredValues = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return values
                .slice()
                .sort((a, b) => a.localeCompare(b))
                .slice(0, MAX_RESULTS);
        }

        return values
            .filter((value) =>
                value.toLowerCase().includes(normalizedSearch)
            )
            .sort((a, b) => a.localeCompare(b))
            .slice(0, MAX_RESULTS);
    }, [values, search]);

    const visibleValues = useMemo(() => {
        const selectedNotVisible = selectedValues.filter(
            (value) => !filteredValues.includes(value)
        );

        return [...selectedNotVisible, ...filteredValues];
    }, [selectedValues, filteredValues]);

    const handleToggle = (
        value: string,
        checked: boolean,
    ) => {
        setDraftFilters((prev) => {
            const current = prev[keyName] as string[];

            return {
                ...prev,
                [keyName]: checked
                    ? [...current, value]
                    : current.filter((item) => item !== value),
            };
        });
    };

    return (
        <Box px={4}>
            <Input
                css={steamMisc.input}
                mb={3}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {!!search && (
                <Text
                    mb={3}
                    color={steamColors.textPrimary}
                    fontSize="sm"
                >
                    Showing up to {MAX_RESULTS} matches
                </Text>
            )}

            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={2}
            >
                {visibleValues.map((value) => (
                    <CheckboxRoot
                        key={value}
                        checked={selectedSet.has(value)}
                        onCheckedChange={({ checked }) =>
                            handleToggle(value, checked === true)
                        }
                    >
                        <CheckboxHiddenInput />
                        <CheckboxControl />
                        <CheckboxLabel css={steamText.defaultText}>
                            {value}
                        </CheckboxLabel>
                    </CheckboxRoot>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export const SearchableCheckboxSection = memo(
    SearchableCheckboxSectionComponent
);