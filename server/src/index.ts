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
    } catch {
        res.status(500).json({
            error: "Failed to contact Steam API",
        })
    }
})

app.listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`)
})