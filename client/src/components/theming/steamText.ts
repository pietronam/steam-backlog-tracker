import type { SystemStyleObject } from "@chakra-ui/react";
import { steamColors } from "./steamColors";

export const steamText = {
    defaultText: {
        color: steamColors.textPrimary,
        fontFamily: `"Motiva Sans", Arial, Helvetica, sans-serif`,
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        letterSpacing: "0",
    } satisfies SystemStyleObject,

    heading: {
        color: steamColors.textHighlight,
        fontFamily: `"Motiva Sans", Arial, Helvetica, sans-serif`,
        fontSize: "26px",
        fontWeight: "500",
        lineHeight: "32px",
    } satisfies SystemStyleObject,

    mutedText: {
        color: steamColors.textPrimary,
        fontSize: "14px",
        lineHeight: "20px",
    } satisfies SystemStyleObject,

    dimText: {
        color: steamColors.textSecondary,
        fontSize: "13px",
        lineHeight: "18px",
    } satisfies SystemStyleObject,

    link: {
        color: steamColors.blue,
        _hover: {
            color: steamColors.blueHover,
            textDecoration: "underline",
        },
    } satisfies SystemStyleObject,

    tag: {
        background: "#31475c",
        color: steamColors.textPrimary,
        px: 2,
        borderRadius: "2px",
        py: 1,
        fontSize: "sm",
    } satisfies SystemStyleObject,
}