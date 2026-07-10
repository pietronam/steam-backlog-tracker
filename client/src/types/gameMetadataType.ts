export type GameMetadataType = {
    name: string,
    genres: {
        id: string,
        description: string,
    }[],
    categories: {
        id: number,
        description: string,
    }[],
    developers: string[],
    publishers: string[],
    customTags: string[],
    customNotes: string,
    status: string,
}