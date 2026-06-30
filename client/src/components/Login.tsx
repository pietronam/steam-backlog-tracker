import { useState } from "react"
import {
    Box,
    Button,
    Field,
    Heading,
    Input,
    Text,
    Code,
} from "@chakra-ui/react"
import { useLogin } from "../hooks/useLogin"

export const Login = () => {
    const [input, setInput] = useState("")
    const [submittedSteamId, setSubmittedSteamId] = useState("")

    const { data, isFetching, isError, error } = useLogin(submittedSteamId)

    const handleSubmit = () => {
        setSubmittedSteamId(input.trim())
    }

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <Heading size="lg" mb={6}>
                Login with your Steam ID
            </Heading>

            <Field.Root mb={4}>
                <Field.Label>Steam ID</Field.Label>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your Steam ID"
                />
            </Field.Root>

            <Button
                onClick={handleSubmit}
                loading={isFetching}
                loadingText="Submitting..."
            >
                Submit
            </Button>

            {submittedSteamId && (
                <Text mt={4}>
                    Submitted Steam ID: {submittedSteamId}
                </Text>
            )}

            {isError && (
                <Text mt={4} color="red.500">
                    Error: {error?.message ?? "Unable to fetch data."}
                </Text>
            )}

            {data && (
                <Code
                    display="block"
                    whiteSpace="pre-wrap"
                    mt={4}
                    p={4}
                    w="full"
                >
                    {JSON.stringify(data, null, 2)}
                </Code>
            )}
        </Box>
    )
}