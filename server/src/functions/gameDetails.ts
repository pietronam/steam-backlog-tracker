import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";

import { SteamApiError, steamFetch } from "../services/steam.js";

export async function gameDetails(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {

    const appId = request.params.appId;

    context.log(`Fetching metadata for ${appId}`);

    try {

        const data = await steamFetch(
            `https://store.steampowered.com/api/appdetails?appids=${appId}&l=english`
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

app.http("gameDetails", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "games/detail/{appId}",
    handler: gameDetails,
});