import type { SystemStyleObject } from "@chakra-ui/react";
import { steamColors } from "./steamColors";


export const steamButtons = {
    primaryButton: {
        background: "linear-gradient(to bottom, #67c1f5, #417a9b)",
        color: "white",
        border: "1px solid #417a9b",
        borderRadius: "3px",
        transition: "all .15s ease",

        _hover: {
            background: "linear-gradient(to bottom, #8ed8ff, #5ca4d6)",
            cursor: "pointer",
        },

        _active: {
            background: "linear-gradient(to bottom, #417a9b, #2f617f)",
        },
    } satisfies SystemStyleObject,

    successButton: {
        background: "linear-gradient(to bottom, #8bc53f, #5ba32b)",
        color: "white",
        border: "1px solid #4f8d28",

        borderRadius: "3px",

        _hover: {
            background: "linear-gradient(to bottom, #9fd84a, #6cb83c)",
        },
    } satisfies SystemStyleObject,

    secondaryButton: {
        background: "#2a475e",
        color: steamColors.textPrimary,
        border: `1px solid ${steamColors.border}`,
        borderRadius: "3px",

        _hover: {
            background: "#36556d",
            color: "white",
        },
    } satisfies SystemStyleObject,

    dangerButton: {
        background: "#8b2f2f",
        color: "white",
        borderRadius: "3px",

        _hover: {
            background: steamColors.danger,
        },
    } satisfies SystemStyleObject,
}
