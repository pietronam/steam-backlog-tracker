export function removeFromSearchIndex(searchIndex: string, stringToRemove: string): string {
    return searchIndex
        .split(" ")
        .filter(term => term !== stringToRemove.toLowerCase())
        .filter(Boolean)
        .join(" ");
}