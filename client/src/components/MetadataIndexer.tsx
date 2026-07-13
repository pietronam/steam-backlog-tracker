import {
    HStack,
    Progress,
    Text
} from "@chakra-ui/react";

import { useMetadataIndexer } from "../hooks/useMetadataIndexer";
import { steamLayout } from "./theming/steamLayout";

export const MetadataIndexer = () => {
    const { progress } = useMetadataIndexer();

    if (!progress.running && !progress.finished) {
        return null;
    }
    return (
        <HStack
            css={steamLayout.panel}
            align="center"
            gap={3}
            p={2}
            justifyItems={"center"}
        >
            <Text fontSize="sm">
                Fetching game data...
            </Text>

            <Progress.Root
                value={progress.percentage}
                size="sm"
                width="220px"
                colorPalette="cyan"
                bgColor="black"
                position="relative"
                variant="subtle"
            >
                <Progress.Track
                    height="5px"
                    borderRadius={10}
                    bgColor="gray"
                >
                    <Progress.Range />
                </Progress.Track>
            </Progress.Root>

            {progress.failed > 0 && (
                <Text fontSize="xs" color="red.400" minWidth="60px">
                    {progress.failed} failed
                </Text>
            )}
            <Text>
                {progress.completed} / {progress.total}
            </Text>
        </HStack>
    );
}