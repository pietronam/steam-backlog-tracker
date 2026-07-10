import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { FaSteam } from "react-icons/fa"
import { GameSelector } from "./GameSelector"
import { steamColors } from "./theming/steamColors"
import { steamLayout } from "./theming/steamLayout"
import { steamText } from "./theming/steamText"
import { MetadataIndexer } from "./MetadataIndexer"

export const Home = () => {
    const defaultStyle = {
        ...steamLayout.page,
        ...steamText.defaultText
    }

    return (
        <Flex css={defaultStyle} direction="column" minH="100vh">
            <Flex position={"fixed"} w={"100vw"} bgColor={steamColors.header} as="header" gap={3} px={12} py={6} alignItems="center" justifyContent={"space-between"} zIndex={2}>
                <Flex>
                    <Icon size={"2xl"}><FaSteam /></Icon>
                    <Heading fontSize="2xl">Steam Backlog Tracker</Heading>
                </Flex>
                <MetadataIndexer />
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