import {
    HStack,
    Progress,
    Text
} from "@chakra-ui/react";

import type { IndexingProgress } from "../types/indexingTypes";
import { steamLayout } from "./theming/steamLayout";

type MetadataIndexerProps = {
    progress: IndexingProgress
}

export const MetadataIndexer = ({ progress }: MetadataIndexerProps) => {

    if (!progress.running && !progress.finished) {
        return null;
    }
    return (
        <HStack
            css={steamLayout.panel}
            align="center"
            gap={3}
            p={2}
            justifyItems="center"
        >
            {progress.cancelled ? (
                <Text color="orange.300" fontSize="sm">
                    Metadata indexing cancelled.
                </Text>
            ) : progress.finished ? (
                <>
                    <Text fontSize="sm">
                        Fetching finished. Errors:
                    </Text>
                    <Text
                        color = {progress.failed > 0 ? "red.400" : ""}
                        fontSize="sm">
                        {progress.failed}
                    </Text>

                </>
            ) : (
                <>
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
                        <Text
                            fontSize="xs"
                            color="red.400"
                            minWidth="60px"
                        >
                            {progress.failed} failed
                        </Text>
                    )}
                    <Text>
                        {progress.completed} / {progress.total}
                    </Text>
                </>
            )}
        </HStack>
    );
}