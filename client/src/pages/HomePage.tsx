import { Flex } from "@chakra-ui/react"
import { GameSelector } from "../components/GameSelector"
import { steamLayout } from "../components/theming/steamLayout"
import { steamText } from "../components/theming/steamText"

export const HomePage = () => {
    const defaultStyle = {
        ...steamLayout.page,
        ...steamText.defaultText
    }

    return (
        <Flex css={defaultStyle} justifyContent={"center"}>
            <GameSelector />
        </Flex>
    )
}