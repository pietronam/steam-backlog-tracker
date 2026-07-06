import type { SystemStyleObject } from "@chakra-ui/react";
import { steamColors } from "./steamColors";

export const steamMisc = {
    input: {
        background: "#23384b",
        color: steamColors.textHighlight,
        border: "1px solid #000",

        _placeholder: {
            color: steamColors.textSecondary,
        },

        _focusVisible: {
            borderColor: steamColors.blue,
            boxShadow: `0 0 0 1px ${steamColors.blue}`,
        },
    } satisfies SystemStyleObject,

    storeTag: {
        display: "inline-flex",
        alignItems: "center",

        px: "8px",
        h: "22px",
        minW: "48px",

        background: "rgba(103, 193, 245, 0.2)",
        color: "#67c1f5",

        fontSize: "11px",
        fontWeight: "400",
        lineHeight: "22px",
        whiteSpace: "nowrap",
        justifyContent: "center",

        borderRadius: "2px",

        transition: "all 0.15s ease",

        cursor: "pointer",
        userSelect: "none",

        _hover: {
            background: "#67c1f5",
            color: "#fff",
            textDecoration: "none",
        },


    } satisfies SystemStyleObject,

    card: {
        background: steamColors.panel,
        borderRadius: "4px",
        border: `1px solid ${steamColors.border}`,
        boxShadow: "0 2px 6px rgba(0,0,0,.35)",
        overflow: "hidden",
    } satisfies SystemStyleObject,

    elevatedCard: {
        background: steamColors.elevated,
        borderRadius: "4px",
        border: `1px solid ${steamColors.border}`,
        boxShadow: "0 4px 12px rgba(0,0,0,.45)",
    } satisfies SystemStyleObject,

}