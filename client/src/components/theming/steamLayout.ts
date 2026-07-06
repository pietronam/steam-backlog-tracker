import type { SystemStyleObject } from "@chakra-ui/react";
import { steamColors } from "./steamColors";

export const steamLayout = {
    page: {
        background: steamColors.background,
        color: steamColors.textPrimary,
        minHeight: "100vh",
    } satisfies SystemStyleObject,

    panel: {
        background: steamColors.surface,
        borderRadius: "4px",
        border: `1px solid ${steamColors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,.4)",
    } satisfies SystemStyleObject,

    divider: {
        borderColor: "#30475a",
    } satisfies SystemStyleObject,

    scrollContainer: {
        "&::-webkit-scrollbar": {
            width: "10px",
        },

        "&::-webkit-scrollbar-track": {
            background: "#16202d",
        },

        "&::-webkit-scrollbar-thumb": {
            background: "#4a657d",
            borderRadius: "8px",
        },

        "&::-webkit-scrollbar-thumb:hover": {
            background: "#5c7c98",
        },
    } satisfies SystemStyleObject,
}