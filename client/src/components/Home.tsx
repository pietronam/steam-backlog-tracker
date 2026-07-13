import { Box, Button, Flex, Heading, Icon, Input, Text } from "@chakra-ui/react"
import { useRef } from "react"
import { FaSteam } from "react-icons/fa"
import { useSteamDataActions, useSteamDataState } from "../context/SteamDataContext"
import { useMetadataIndexer } from "../hooks/useMetadataIndexer"
import { exportData } from "../utils/exportData"
import { importData } from "../utils/importData"
import { GameSelector } from "./GameSelector"
import { MetadataIndexer } from "./MetadataIndexer"
import { steamButtons } from "./theming/steamButtons"
import { steamColors } from "./theming/steamColors"
import { steamLayout } from "./theming/steamLayout"
import { steamText } from "./theming/steamText"

export const Home = () => {
    const defaultStyle = {
        ...steamLayout.page,
        ...steamText.defaultText
    }

    const { setSession } = useSteamDataActions();
    const state = useSteamDataState();

    const indexer = useMetadataIndexer();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImport = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;
        indexer.cancel();

        try {
            const data = await importData(file);
            setSession(
                data.user,
                data.games,
                data.genreMap,
                data.categoryMap,
                data.developers,
                data.publishers);
        } catch (err) {
            console.error(err);
            alert("The selected file is not a valid Steam Backlog export.");
        }
    };


    return (
        <Flex css={defaultStyle} direction="column" minH="100vh">
            <Flex position={"fixed"} w={"100vw"} bgColor={steamColors.header} as="header" gap={5} px={12} py={6} alignItems="center" justifyContent={"space-between"} zIndex={11}>
                <Flex gap={2} justifyContent={"center"}>
                    <Icon size={"2xl"}><FaSteam /></Icon>
                    <Heading fontSize="2xl">Steam Backlog Tracker</Heading>
                </Flex>
                <Flex gap={3}>
                    <MetadataIndexer progress={indexer.progress} />
                    <Button
                        size={"sm"}
                        css={steamButtons.secondaryButton}
                        onClick={() => exportData(state)}>
                        Export Data
                    </Button>
                    <Button
                        size={"sm"}
                        css={steamButtons.secondaryButton}
                        onClick={() => fileInputRef.current?.click()}>
                        Import Data
                    </Button>

                    <Input
                        ref={fileInputRef}
                        css={steamButtons.secondaryButton}
                        type="file"
                        accept=".json,application/json"
                        onChange={handleImport}
                        display={"none"}
                    />
                </Flex>
            </Flex>
            <Box h={"84px"} />
            <Flex as="main" flex={1} justifyContent="center" alignItems="flex-start">
                <GameSelector />
            </Flex>

            <Box bgColor={steamColors.header} as="footer" px={6} py={4}>
                <Text fontSize="sm" textAlign="center">© {new Date().getFullYear()} Steam Backlog Tracker. Valve, please don't sue me. I'm just a little guy.</Text>
            </Box>
        </Flex>
    )
}