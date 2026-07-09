import {
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemIndicator,
    AccordionItemTrigger,
    Box,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { steamButtons } from "../../theming/steamButtons";
import { steamColors } from "../../theming/steamColors";
import { steamText } from "../../theming/steamText";

type FilterAccordionItemProps = {
    value: string;
    title: string;
    children: ReactNode;
};

export const FilterAccordionItem = ({
    value,
    title,
    children,
}: FilterAccordionItemProps) => {
    return (
        <AccordionItem value={value}>
            <AccordionItemTrigger
                css={{
                    ...steamButtons.secondaryButton,
                    border: "none",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0.75rem 1rem",
                }}
            >
                <Box
                    color={steamColors.textPrimary}
                    css={steamText.defaultText}
                    fontWeight="bold"
                >
                    {title}
                </Box>

                <AccordionItemIndicator />
            </AccordionItemTrigger>

            <AccordionItemContent>
                <AccordionItemBody pt={3}>
                    {children}
                </AccordionItemBody>
            </AccordionItemContent>
        </AccordionItem>
    );
};