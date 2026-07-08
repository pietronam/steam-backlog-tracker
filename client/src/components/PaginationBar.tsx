import { Box, Pagination } from "@chakra-ui/react"
import { steamColors } from "./theming/steamColors"

type PaginationBarProps = {
    count: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
}

export const PaginationBar = ({
    count,
    page,
    pageSize,
    onPageChange,
}: PaginationBarProps) => {
    if (count <= pageSize) {
        return null
    }

    return (
        <Pagination.Root
            count={count}
            page={page}
            pageSize={pageSize}
            onPageChange={(details) => onPageChange(details.page)}
            siblingCount={2}
        >
            <Box
                display="flex"
                alignItems="center"
                gap={2}
                px={2}
                py={1}
                borderWidth="1px"
                borderColor={steamColors.border}
                borderRadius="md"
                bg={steamColors.panel}
            >
                <Pagination.PrevTrigger
                    bg="transparent"
                    color={steamColors.textPrimary}
                    _hover={{
                        bg: steamColors.surface,
                        color: steamColors.textHighlight,
                    }}
                    borderRadius="md"
                    px={2}
                    py={1}
                >
                    Previous
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <Pagination.Item
                            key={page.value}
                            type={page.type}
                            value={page.value}
                            bg="transparent"
                            color={steamColors.textPrimary}
                            _hover={{
                                bg: steamColors.surface,
                                color: steamColors.textHighlight,
                            }}
                            borderRadius="md"
                            px={2}
                            py={1}
                            css={{
                                "&[data-selected]": {
                                    background: steamColors.blue,
                                    color: "white",
                                },
                            }}
                        >
                            {page.value}
                        </Pagination.Item>
                    )}
                />

                <Pagination.NextTrigger
                    bg="transparent"
                    color={steamColors.textPrimary}
                    _hover={{
                        bg: steamColors.surface,
                        color: steamColors.textHighlight,
                    }}
                    borderRadius="md"
                    px={2}
                    py={1}
                >
                    Next
                </Pagination.NextTrigger>
            </Box>
        </Pagination.Root>
    )
}