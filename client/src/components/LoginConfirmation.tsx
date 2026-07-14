import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import type { UserType } from "../types/userType"
import { steamButtons } from "./theming/steamButtons"
import { steamColors } from "./theming/steamColors"
import { steamText } from "./theming/steamText"

type LoginConfirmationProps = {
    data: UserType,
    onConfirm: () => void,
    onDeny: () => void,
    isConfirming: boolean,
}

export const LoginConfirmation = ({
    data,
    onConfirm,
    onDeny,
    isConfirming,
}: LoginConfirmationProps) => {
    const getPresenceLabel = (personastate: number) => {
        switch (personastate) {
            case 1:
                return "Online"
            case 2:
                return "Busy"
            case 3:
                return "Away"
            case 4:
                return "Snooze"
            case 5:
                return "Looking to trade"
            case 6:
                return "Looking to play"
            default:
                return "Offline"
        }
    }

    const presenceLabel = getPresenceLabel(data.personastate)

    return (
        <Box>
            <Text css={steamText.heading} fontSize="md" mb={4}>
                Is this your Steam account?
            </Text>
            <HStack
                bgColor={steamColors.elevated}
                p={5}
                align="center"
                gap={4}
                mb={4}
            >
                <Image
                    src={data.avatarfull}
                    alt={`${data.username} avatar`}
                    w="96px"
                    h="96px"
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor={data.personastate === 0 ? steamColors.offline : steamColors.online}
                />
                <VStack align="start">
                    <Text fontSize="lg" color={data.personastate === 0 ? steamColors.offline : steamColors.online}>
                        {data.username}
                    </Text>
                    <Text fontSize="sm" color={data.personastate === 0 ? steamColors.offline : steamColors.online}>
                        {presenceLabel}
                    </Text>
                </VStack>
            </HStack>
            <Text css={steamText.defaultText} mb={4}>
                Please confirm this is your account.
            </Text>
            <HStack gap={3}>
                <Button
                    css={steamButtons.secondaryButton}
                    variant="outline"
                    onClick={onDeny}
                    disabled={isConfirming}
                >
                    Deny
                </Button>
                <Button
                    css={steamButtons.successButton}
                    onClick={onConfirm}
                    loading={isConfirming}
                    loadingText="Logging in..."
                >
                    Confirm
                </Button>
            </HStack>
        </Box>
    )
}