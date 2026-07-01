export type GetAppDetailsResponseType = Record<string, GameDetailData> //appid (number string), data


type GameDetailData = {
    success: boolean,
    data: {
        type: string,
        name: string,
        steam_appid: number,
        required_age: string //number string,
        is_free: boolean,
        controller_support: string,
        dlc: number[],
        detailed_description: string,   //HTML
        about_the_game: string,         //HTML
        short_description: string,      //HTML?
        supported_languages: string,    //HTML
        header_image: string,
        capsule_image: string,
        capsule_imagev5: string,
        website: string,
        pc_requirements: {
            minimum: string,    //HTML
            required: string,   //HTML
        }
        mac_requirements?: {
            minimum: string,
            required?: string,
        },
        linux_requirements?: {
            minimum: string,
            required?: string,
        },
        legal_notice: string,   //HTML
        developers: string[],
        publishers: string[],
        price_overview: {
            currency: string,
            initial: number //in cents
            final: number,  //in cents
            discount_percent: number,
            initial_formatted: string,
            final_formatted: string,
        },
        packages: number[]  //discount bundles
        package_groups: {
            name: string,
            title: string,
            description: string,
            selection_text: string,
            save_text: string,
            display_type: number,
            is_recurring_subscription: string,
            subs: {
                packageid: number,
                percent_savings_text: string,
                percent_savings: number,
                option_text: string,
                option_description: string,
                can_get_free_license: string,    //number string
                is_free_license: boolean,
                price_in_cents_with_discount: number
            }[],
        }[],
        platforms: {
            windows: boolean,
            mac: boolean,
            linux: boolean,
        },
        metacritic: {
            score: number,
            url: string,
        },
        categories: {
            id: number,
            description: string,
        }[],
        genres: {
            id: number,
            description: string,
        }[]
        screenshots:
        {
            id: number,
            path_thumbnail: string,
            path_full: string,
        }[],
        movies: {
            id: number,
            name: string,
            thumbnail: string,
            dash_av1: string,
            dash_h264: string,
            hls_h264: string,
            highlight: boolean,
        }[],
        recommendations: {
            total: number,
        },
        achievements: {
            total: number,
            highlighted: {
                icon: string,
                localized_name: string,
                name: string,
                path: string,
            }[],
        },
        release_date: {
            coming_soon: boolean,
            date: string,
        },
        support_info: {
            url: string,
            email: string,
        },
        background: string,
        background_raw: string,
        content_descriptors: {
            ids: number[],
            notes: string,
        },
        ratings: Record<string, ratingData>
    }
}

type ratingData = {
    rating_generated: string,    //boolean string ("0"/"1")
    rating: string,
    use_age_gate: string,   //boolean string
    required_age: string,   //number string
    descriptors: string,    //formatted string
}
