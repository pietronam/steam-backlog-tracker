import { Box, Button, Flex, Text, Textarea, VStack } from "@chakra-ui/react"
import { steamText } from "../theming/steamText"
import type { GameType } from "../../types/gameType"
import type { GameDetailsType } from "../../types/gameDetailsType"
import { steamMisc } from "../theming/steamMisc"
import { useEffect, useState } from "react"
import { useSteamDataActions } from "../../context/SteamDataContext"
import { steamButtons } from "../theming/steamButtons"

type GameDetailTagsProps = {
    game: GameType
    gameDetails?: GameDetailsType
}


export const GameDetailInfosection = ({ game, gameDetails }: GameDetailTagsProps) => {
    const { addCustomNotes } = useSteamDataActions();
    const [notesDraft, setNotesDraft] = useState(game.custom_notes);


    useEffect(() => {
        setNotesDraft(game.custom_notes);
    }, [game.appId, game.custom_notes]);

    const handleNotesSave = () => {
        addCustomNotes(game.appId, notesDraft.trim());
    };

    return (
        <VStack align="stretch" gap={4}>
            <Flex justifyContent={"space-between"}>
                <Flex direction={"column"} gap={4} flex="0 0 34%">
                    <Box flex="1" minW={0}>
                        <Text css={steamText.defaultText} fontWeight="bold">Genres</Text>
                        <Text css={steamText.defaultText}>{gameDetails?.genres.map((genre) => genre.description).join(", ")}</Text>
                    </Box>
                    {gameDetails?.metacritic.score !== 0 &&
                        <Box flex="1" minW={0}>
                            <Text css={steamText.defaultText} fontWeight="bold">Metacritic Rating</Text>
                            <Text css={steamText.defaultText}>{gameDetails?.metacritic.score}</Text>
                        </Box>
                    }
                </Flex>
                <Flex direction={"column"} gap={4} flex="0 0 34%">
                    <Box flex="1" minW={0}>
                        <Text css={steamText.defaultText} fontWeight="bold">Developers</Text>
                        <Text css={steamText.defaultText}>{gameDetails?.developers.join(", ")}</Text>
                    </Box>
                    <Box flex="1" minW={0}>
                        <Text css={steamText.defaultText} fontWeight="bold">Publishers</Text>
                        <Text css={steamText.defaultText}>{gameDetails?.publishers.join(", ")}</Text>
                    </Box>
                </Flex>
                <Flex direction={"column"} gap={4} flex="0 0 34%">
                    <Box>
                        <Text css={steamText.defaultText} fontWeight="bold">Notes</Text>
                        <Text css={steamText.defaultText}>{game.custom_notes ? game.custom_notes : "No custom notes."}</Text>
                        <Textarea
                            css={steamMisc.input}
                            value={notesDraft}
                            onChange={(event) => setNotesDraft(event.target.value)}
                            onBlur={handleNotesSave}
                            placeholder="Add a custom note"
                            minH="60px"
                            w="80%"
                            resize="vertical"
                            mt={2}
                        />
                        <Button css={steamButtons.secondaryButton} size="sm" mt={2} onClick={handleNotesSave}>
                            Save notes
                        </Button>
                    </Box>
                </Flex>
            </Flex>
        </VStack>

    )
}