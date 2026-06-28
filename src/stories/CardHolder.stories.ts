import { createElement, type ReactElement } from "react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

import { CardHolder } from "../components/CardHolder"
import type { GameType } from "../types/GameType"

type CardHolderStoryArgs = {
  games: GameType[]
}

const renderWithChakra = (args: CardHolderStoryArgs): ReactElement =>
  createElement(
    ChakraProvider,
    {
      value: defaultSystem,
      children: createElement(CardHolder as (props: CardHolderStoryArgs) => ReactElement, args),
    },
  )

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
    appid: 570,
    name: "Dota 2",
    status: "backlog",
    custom_tags: ["moba", "strategy"],
    custom_description: "An evergreen competitive MOBA with deep strategy.",
    game_info: {
      short_description: "Two teams of five players compete to destroy the enemy Ancient.",
      developers: ["Valve"],
      publishers: ["Valve"],
      genres: [
        { id: "2", description: "Strategy" },
        { id: "36", description: "Free-to-Play" },
      ],
    },
  },
  {
    appid: 730,
    name: "Counter-Strike: Global Offensive",
    status: "finished",
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
    appid: 620,
    name: "Portal 2",
    status: "finished",
    custom_tags: ["puzzle", "singleplayer"],
    custom_description: "A brilliant physics-puzzle game with a strong narrative.",
    game_info: {
      short_description: "Solve puzzles with a portal gun in a science facility.",
      developers: ["Valve"],
      publishers: ["Valve"],
      genres: [
        { id: "9", description: "Puzzle" },
        { id: "23", description: "Story Rich" },
      ],
    },
  },
  {
    appid: 578080,
    name: "PUBG: BATTLEGROUNDS",
    status: "backlog",
    custom_tags: ["battle royale", "survival"],
    custom_description: "A large-scale survival shooter with tense matches.",
    game_info: {
      short_description: "Players fight to be the last person standing on a shrinking battlefield.",
      developers: ["PUBG Corporation"],
      publishers: ["KRAFTON, Inc."],
      genres: [
        { id: "1", description: "Action" },
        { id: "37", description: "Free-to-Play" },
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
  {
    appid: 1091500,
    name: "Cyberpunk 2077",
    status: "backlog",
    custom_tags: ["rpg", "sci-fi"],
    custom_description: "A neon-soaked open world with RPG depth.",
    game_info: {
      short_description: "Explore Night City and shape your character's fate.",
      developers: ["CD PROJEKT RED"],
      publishers: ["CD PROJEKT RED"],
      genres: [
        { id: "3", description: "RPG" },
        { id: "24", description: "Futuristic" },
      ],
    },
  },
  {
    appid: 1811260,
    name: "Risk of Rain 2",
    status: "backlog",
    custom_tags: ["roguelike", "co-op"],
    custom_description: "A fast-paced roguelike shooter with cooperative play.",
    game_info: {
      short_description: "Survive waves of enemies and collect powerful items.",
      developers: ["Hopoo Games"],
      publishers: ["Gearbox Publishing"],
      genres: [
        { id: "1", description: "Action" },
        { id: "23", description: "Roguelike" },
      ],
    },
  },
]

const meta = {
  title: "Components/CardHolder",
  component: CardHolder,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    games: sampleGames,
  },
  render: (args: CardHolderStoryArgs) => renderWithChakra(args),
}

export default meta

export const Default = {
  args: {
    games: sampleGames,
  },
}
