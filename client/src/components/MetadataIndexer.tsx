import {
    Box,
    Button,
    HStack,
    Progress,
    Text
} from "@chakra-ui/react";

import { useMetadataIndexer } from "../hooks/useMetadataIndexer";
import { steamButtons } from "./theming/steamButtons";
import { steamLayout } from "./theming/steamLayout";

export const MetadataIndexer = () => {
    const { progress, start, cancel } = useMetadataIndexer();

    if (!progress.running && !progress.finished) {
        return (
            <Box>
                <Button
                    css={steamButtons.secondaryButton}
                    size="sm"
                    colorPalette="blue"
                    onClick={start}
                >
                    Index metadata
                </Button>
            </Box>
        );
    }

    return (
            <HStack css={steamLayout.panel} align="stretch" gap={2} p={2} justifyContent={"center"}>
                <Text fontWeight="bold" fontSize="sm">
                    Indexing metadata
                </Text>

                <Progress.Root
                    value={progress.percentage}
                    size="sm"
                >
                    <Progress.Track>
                        <Progress.Range />
                    </Progress.Track>
                </Progress.Root>

                <Text fontSize="xs">
                    {progress.completed} / {progress.total} games
                </Text>

                <Text fontSize="xs">
                    Failed: {progress.failed}
                </Text>

                <Text
                    fontSize="xs"
                    truncate
                >
                    {progress.currentGame}
                </Text>

                {progress.running ? (
                    <Button
                        css={steamButtons.dangerButton}
                        size="2xs"
                        onClick={cancel}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Text
                        fontSize="xs"
                        color={
                            progress.cancelled
                                ? "orange.400"
                                : "green.400"
                        }
                    >
                        {progress.cancelled
                            ? "Cancelled"
                            : "Finished"}
                    </Text>
                )}
            </HStack>
    );
}