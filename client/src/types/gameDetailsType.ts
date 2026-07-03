export type GameDetailsType = {
    header_image: string,
    genres: {
        id: string,
        description: string,
    }[],
    categories: {
        id: string,
        description: string,
    }[]
    about_the_game: string,
    developers: string[],
    publishers: string[],
    metacritic: {
        score: number,
        url: string,
    },
    pc_requirements: {
        minimum: string,    //HTML
        required: string,   //HTML
    },
    website: string,
    price_overview: {
        currency: string,
        discount_percent: number,
        initial_formatted: string,
        final_formatted: string,
    },
    dlc: number[],
}