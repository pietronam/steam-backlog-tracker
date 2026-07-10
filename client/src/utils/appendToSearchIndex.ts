export const appendToSearchIndex = (searchIndex: string, additionalString: string): string => {
    return [searchIndex, additionalString]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}