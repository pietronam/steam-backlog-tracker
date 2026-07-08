import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { FaSteam } from "react-icons/fa"
import { GameSelector } from "./GameSelector"
import { steamColors } from "./theming/steamColors"
import { steamLayout } from "./theming/steamLayout"
import { steamText } from "./theming/steamText"

export const Home = () => {
    const defaultStyle = {
        ...steamLayout.page,
        ...steamText.defaultText
    }

    return (
        <Flex css={defaultStyle} direction="column" minH="100vh">
            <Flex bgColor={steamColors.header} as="header" gap={3} px={12} py={6} alignItems="center">
                <Icon size={"2xl"}><FaSteam/></Icon>
                <Heading fontSize="2xl">Steam Backlog Tracker</Heading>
            </Flex>

            <Flex as="main" flex={1} justifyContent="center" alignItems="center">
                <GameSelector />
            </Flex>

            <Box bgColor={steamColors.header} as="footer" px={6} py={4}>
                <Text fontSize="sm" textAlign="center">© {new Date().getFullYear()} Steam Backlog Tracker. Valve, please don't sue me. I'm just a little guy.</Text>
            </Box>
        </Flex>
    )
}