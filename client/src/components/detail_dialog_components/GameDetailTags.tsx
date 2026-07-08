import { Badge, Box, Button, CloseButton, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import type { GameType } from "../../types/gameType";
import { steamButtons } from "../theming/steamButtons";
import { useSteamDataActions } from "../../context/SteamDataContext";
import { steamMisc } from "../theming/steamMisc";
import type { GameDetailsType } from "../../types/gameDetailsType";

type GameDetailTagsProps = {
    game: GameType
    gameDetails?: GameDetailsType
}


export const GameDetailTags = ({game, gameDetails}: GameDetailTagsProps) => {
    const { changeGameStatus, removeCustomTag, addCustomTag } = useSteamDataActions();
    const statusOptions: Array<{ label: string; status: GameType["status"] }> = [
        { label: "Add to backlog", status: "backlog" },
        { label: "Mark completed", status: "completed" },
        { label: "Stop tracking", status: "untracked" },
    ];
    const visibleStatusOptions = statusOptions.filter(({ status }) => status !== game.status);
        const handleStatusChange = (status: GameType["status"]) => {
        changeGameStatus(game.appId, status);
    };

    const [showCustomTagInput, setShowCustomTagInput] = useState(false);
    const [newCustomTag, setNewCustomTag] = useState("");

    return (<>
        <HStack gap={2} wrap="wrap">
            {visibleStatusOptions.map(({ label, status }) => (
                <Button css={steamButtons.secondaryButton} key={status} size="sm" onClick={() => handleStatusChange(status)}>
                    {label}
                </Button>
            ))}
        </HStack>

        <HStack gap={2} wrap="wrap">
            <Badge css={steamMisc.storeTag} colorScheme="green" px={3} py={1} fontSize="sm">
                {/* Capitalizes first letter */}
                {game.status ? `${game.status.charAt(0).toUpperCase()}${game.status.slice(1)}` : game.status}
            </Badge>
            {gameDetails?.genres.map((genre) => (
                <Badge css={steamMisc.storeTag} key={genre.id} px={3} py={1} fontSize="sm">
                    {genre.description}
                </Badge>
            ))}
            {game.custom_tags.map((tag) => (
                <Badge css={{ ...steamMisc.storeTag, display: "inline-flex", alignItems: "center", gap: "0.25rem" }} key={tag} px={3} py={1} fontSize="sm">
                    {tag}
                    <CloseButton
                        size="2xs"
                        background={"transparent"}
                        onClick={() => removeCustomTag(game.appId, tag)}
                        aria-label={`Remove tag ${tag}`}
                    />
                </Badge>
            ))}
            {!showCustomTagInput &&
                <Button
                    css={steamMisc.storeTag}
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCustomTagInput(true)}
                >
                    + add custom tag
                </Button>
            }
            {showCustomTagInput && (
                <Box display="inline-flex" alignItems="center" gap="0.5rem" h={2}>
                    <Input
                        css={steamMisc.input}
                        size="2xs"
                        value={newCustomTag}
                        onChange={(event) => setNewCustomTag(event.target.value)}
                        placeholder="Insert tag"
                        autoFocus
                    />
                    <Button
                        css={steamButtons.secondaryButton}
                        size="2xs"
                        onClick={() => {
                            const trimmedTag = newCustomTag.trim();
                            if (trimmedTag) {
                                addCustomTag(game.appId, trimmedTag);
                                setNewCustomTag("");
                                setShowCustomTagInput(false);
                            }
                        }}
                    >
                        Add
                    </Button>
                    <Button
                        css={steamButtons.secondaryButton}
                        size="2xs"
                        variant="outline"
                        onClick={() => {
                            setNewCustomTag("");
                            setShowCustomTagInput(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            )}
        </HStack>
    </>
    )
}