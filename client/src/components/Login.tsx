import {
    Box,
    Button,
    Code,
    Dialog,
    Field,
    Heading,
    HStack,
    Input,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { useGetUserData } from "../hooks/useGetUserData"
import { useLogin } from "../hooks/useLogin"
import { steamButtons } from "./theming/steamButtons"
import { steamLayout } from "./theming/steamLayout"
import { steamMisc } from "./theming/steamMisc"
import { steamText } from "./theming/steamText"

export const Login = () => {
    const [input, setInput] = useState("")
    const [submittedSteamId, setSubmittedSteamId] = useState("")
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const defaultStyle = {
        ...steamLayout.page,
        ...steamText.defaultText
    }

    const {
        data,
        isFetching,
        isError,
        error,
    } = useGetUserData(submittedSteamId);

    const loginMutation = useLogin();

    useEffect(() => {
        if (data) {
            setShowConfirmDialog(true)
        }
    }, [data])

    const handleSubmit = () => {
        setSubmittedSteamId(input.trim())
    }

    const handleConfirm = () => {
        if (!data) return

        loginMutation.mutate(data)
    }

    const handleDeny = () => {
        setShowConfirmDialog(false)
        setSubmittedSteamId("")
    }


    return (
        <Box css={defaultStyle}>
            <Box maxW="md" mx="auto" py={6}>
                <Heading css={steamText.heading} size="lg" mb={6}>
                    Login with your Steam ID
                </Heading>

                <Field.Root mb={4}>
                    <Field.Label>Steam ID</Field.Label>

                    <Input
                        css={steamMisc.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your Steam ID"
                    />
                </Field.Root>

                <Button
                    css={steamButtons.primaryButton}
                    onClick={handleSubmit}
                    loading={isFetching}
                    loadingText="Searching..."
                >
                    Submit
                </Button>

                {isError && (
                    <Text mt={4} color="red.500">
                        {error?.message ?? "Unable to fetch data."}
                    </Text>
                )}
            </Box>

            {showConfirmDialog && data && (
                <Dialog.Root
                    open={showConfirmDialog}
                    onOpenChange={(details) =>
                        setShowConfirmDialog(details.open)
                    }
                >
                    <Dialog.Backdrop />

                    <Dialog.Positioner>
                        <Dialog.Content css={steamLayout.panel}>
                            <Dialog.Header>
                                <Dialog.Title>
                                    Is this your Steam account?
                                </Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Code
                                    display="block"
                                    whiteSpace="pre-wrap"
                                    p={4}
                                    mb={4}
                                >
                                    {JSON.stringify(data, null, 2)}
                                </Code>

                                <Text>
                                    Please confirm this is your account.
                                </Text>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <HStack gap={3}>
                                    <Button
                                        css={steamButtons.secondaryButton}
                                        variant="outline"
                                        onClick={handleDeny}
                                        disabled={loginMutation.isPending}
                                    >
                                        Deny
                                    </Button>

                                    <Button
                                        css={steamButtons.successButton}
                                        onClick={handleConfirm}
                                        loading={loginMutation.isPending}
                                        loadingText="Logging in..."
                                    >
                                        Confirm
                                    </Button>
                                </HStack>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            )}

            {loginMutation.isError && (
                <Text mt={4} color="red.500">
                    {loginMutation.error.message}
                </Text>
            )}
        </Box>
    )
}