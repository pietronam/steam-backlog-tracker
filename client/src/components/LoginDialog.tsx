import {
    Box,
    Button,
    DialogBackdrop,
    DialogBody,
    DialogContent,
    DialogPositioner,
    DialogRoot,
    Field,
    Heading,
    Input,
    Text,
    type DialogOpenChangeDetails
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { useGetUserData } from "../hooks/useGetUserData"
import { useLogin } from "../hooks/useLogin"
import { LoginConfirmation } from "./LoginConfirmation"
import { steamButtons } from "./theming/steamButtons"
import { steamLayout } from "./theming/steamLayout"
import { steamMisc } from "./theming/steamMisc"
import { steamText } from "./theming/steamText"

type LoginDialogProps = {
    open: boolean
    onOpenChange: (details: DialogOpenChangeDetails) => void
}

export const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
    const [input, setInput] = useState("")
    const [submittedSteamId, setSubmittedSteamId] = useState("")
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const {
        data,
        isFetching,
        isError,
        error,
    } = useGetUserData(submittedSteamId)

    const loginMutation = useLogin()

    useEffect(() => {
        if (!open) {
            setShowConfirmDialog(false)
            setSubmittedSteamId("")
            setInput("")
            return
        }

        if (data) {
            setShowConfirmDialog(true)
        }
    }, [data, open])

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
        <DialogRoot open={open} onOpenChange={onOpenChange} size="md" placement="center">
            <DialogBackdrop />
            <DialogPositioner>
                <DialogContent css={steamLayout.panel} p={6}>
                    <DialogBody>
                        {data && showConfirmDialog ? (
                            <LoginConfirmation
                                data={data}
                                onConfirm={handleConfirm}
                                onDeny={handleDeny}
                                isConfirming={loginMutation.isPending}
                            />
                        ) : (
                            <>
                                <Box mb={3}>
                                    <Heading css={steamText.heading} size="lg" mb={2}>
                                        Login with your Steam ID
                                    </Heading>
                                    <Text css={steamText.defaultText}>
                                        Enter your Steam ID to import your library and continue.
                                    </Text>
                                    <Text css={steamText.dimText} mt={1}>
                                        To find it, log into Steam and copy the number in the URL.
                                    </Text>
                                </Box>

                                <Field.Root mb={4}>
                                    <Input
                                        css={steamMisc.input}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="example: 76562138084704548..."
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

                                {loginMutation.isError && (
                                    <Text mt={4} color="red.500">
                                        {loginMutation.error.message}
                                    </Text>
                                )}
                            </>
                        )

                        }

                    </DialogBody>
                </DialogContent>
            </DialogPositioner>
        </DialogRoot>
    )
}