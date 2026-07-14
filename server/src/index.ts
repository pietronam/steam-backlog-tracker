import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())

const PORT = 3000

app.get("/api/player/:steamId", async (req, res) => {
    const { steamId } = req.params

    try {
        const response = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
        )

        if (!response.ok) {
            return res.sendStatus(response.status)
        }

        const data = await response.json()

        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Failed to fetch user data.",
        })
    }
})

app.get("/api/games/:steamId", async (req, res) => {
    const { steamId } = req.params

    try {
        const response = await fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
        )

        if (!response.ok) {
            return res.sendStatus(response.status)
        }

        const data = await response.json()

        res.json(data)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: "Failed to fetch user games.",
        })
    }
})

app.get("/api/games/detail/:appId", async (req, res) => {
    const { appId } = req.params
    console.log(`Fetching metadata for ${appId}`);

    try {
        const response = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appId}&l=english`
        )

        if (!response.ok) {
            const body = await response.text();

            console.error(
                `Steam returned ${response.status} for ${appId}`
            );
            console.error(body);

            return res.status(response.status).send(body);
        }

        const data = await response.json()

        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Failed to game details.",
        })
    }
})

app.listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`)
})