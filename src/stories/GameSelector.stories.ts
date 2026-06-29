import { createElement, type ReactElement } from "react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

import { GameSelector } from "../components/GameSelector"
import SteamDataProvider from "../context/SteamDataContext"
import type { GameType } from "../types/GameType"

const sampleGames: GameType[] = [
  {
    appid: 440,
    name: "Team Fortress 2",
    status: "backlog",
    custom_tags: ["shooter", "multiplayer"],
    custom_description: "A great candidate for the backlog.",
    game_info: {
      short_description: "A fast-paced class-based shooter with a huge roster of memorable characters.",
      developers: ["Valve"],
      publishers: ["Valve"],
      genres: [
        { id: "1", description: "Action" },
        { id: "37", description: "Free-to-Play" },
      ],
    },
  },
  {
    appid: 730,
    name: "Counter-Strike: Global Offensive",
    status: "completed",
    custom_tags: ["shooter", "competitive"],
    custom_description: "A high-skill tactical shooter with a huge esports scene.",
    game_info: {
      short_description: "A team-based tactical FPS with bomb-plant and hostage modes.",
      developers: ["Valve"],
      publishers: ["Valve"],
      genres: [
        { id: "1", description: "Action" },
        { id: "24", description: "Indie" },
      ],
    },
  },
  {
    appid: 292030,
    name: "The Witcher 3: Wild Hunt",
    status: "untracked",
    custom_tags: ["rpg", "open world"],
    custom_description: "A sprawling RPG full of choices and monsters.",
    game_info: {
      short_description: "Hunt monsters in a vast fantasy world as Geralt of Rivia.",
      developers: ["CD PROJEKT RED"],
      publishers: ["CD PROJEKT RED"],
      genres: [
        { id: "3", description: "RPG" },
        { id: "37", description: "Adventure" },
      ],
    },
  },
]

const renderWithProviders = (): ReactElement => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      "steamDataState",
      JSON.stringify({ steamid: 123456789, games: sampleGames }),
    )
  }

  return createElement(
    ChakraProvider,
    {
      value: defaultSystem,
      children: createElement(
        SteamDataProvider,
        null,
        createElement(GameSelector),
      ),
    },
  )
}

const meta = {
  title: "Components/GameSelector",
  component: GameSelector,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: () => renderWithProviders(),
}

export default meta

export const Default = {}
