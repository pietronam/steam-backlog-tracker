import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";

import { SteamApiError, steamFetch } from "../services/steam.js";

export async function player(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {

    const steamId = request.params.steamid ?? request.params.steamId;

    try {
        const data = await steamFetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
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

    app.http("player", {
        methods: ["GET"],
        authLevel: "anonymous",
        route: "player/{steamid}",
        handler: player,
    });