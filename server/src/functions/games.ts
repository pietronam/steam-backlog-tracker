import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";

import { SteamApiError, steamFetch } from "../services/steam.js";

export async function games(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {

    const steamId = request.params.steamId;

    try {

        const data = await steamFetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
        );

        return {
            jsonBody: data,
        };

    } catch (err) {
        if (err instanceof SteamApiError) {
            context.error(err);

            return {
                status: err.status,
                body: err.body,
            };
        }

        context.error(err);

        return {
            status: 500,
            jsonBody: {
                error: "Internal server error.",
            },
        };
    }
}

app.http("games", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "games/{steamId}",
    handler: games,
});