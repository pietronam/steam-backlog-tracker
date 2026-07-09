import {
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
    CheckboxRoot,
    SimpleGrid,
} from "@chakra-ui/react";
import { memo, useMemo } from "react";
import type { GameFilterState } from "../../../functions/filterGames";
import { steamColors } from "../../theming/steamColors";

type CheckboxSectionProps = {
    values: Array<string | number>;
    selectedValues: Array<string | number>;
    keyName: keyof GameFilterState;
    labels?: Record<string, string>;
    setDraftFilters: React.Dispatch<React.SetStateAction<GameFilterState>>;
};

const toggleSelection = <T extends string | number>(
    values: T[],
    value: T,
) =>
    values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

const CheckboxSectionComponent = ({
    values,
    selectedValues,
    keyName,
    labels,
    setDraftFilters,
}: CheckboxSectionProps) => {
    const selectedSet = useMemo(
        () => new Set(selectedValues),
        [selectedValues]
    );

    const handleToggle = <T extends string | number>(
        value: T,
        checked: boolean,
    ) => {
        setDraftFilters((prev) => {
            const current = prev[keyName] as T[];

            return {
                ...prev,
                [keyName]: checked
                    ? toggleSelection(current, value)
                    : current.filter((item) => item !== value),
            };
        });
    };

    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={2} p={"0rem 1rem"}>
            {values.map((value) => (
                <CheckboxRoot
                    key={String(value)}
                    checked={selectedSet.has(value)}
                    onCheckedChange={({ checked }) =>
                        handleToggle(value, checked === true)
                    }
                    color={steamColors.textPrimary}
                    borderColor={steamColors.border}
                >
                    <CheckboxHiddenInput />
                    <CheckboxControl />
                    <CheckboxLabel>
                        {labels?.[String(value)] ?? String(value)}
                    </CheckboxLabel>
                </CheckboxRoot>
            ))}
        </SimpleGrid>
    );
};

export const CheckboxSection = memo(CheckboxSectionComponent);