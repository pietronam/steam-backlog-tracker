import { createElement, type ReactElement } from "react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { GameCard, type GameCardProps } from "../components/GameCard"
import type { GameType } from "../types/gameType"

const renderWithChakra = (args: GameCardProps) =>
  createElement(
    ChakraProvider,
    {
      value: defaultSystem,
      children: createElement(GameCard as (props: GameCardProps) => ReactElement, {
        game: args.game,
      }),
    },
  )

const sampleGame: GameType = {
  name: "Team Fortress 2",
  appid: 440,
  status: "backlog",
  custom_tags: ["shooter", "multiplayer"],
  custom_description: "A great candidate for the backlog.",
  game_info: {
    short_description:
      "A fast-paced class-based shooter with a huge roster of memorable characters.",
    developers: ["Valve"],
    publishers: ["Valve"],
    genres: [
      { id: "1", description: "Action" },
      { id: "37", description: "Free-to-Play" },
    ],
    metacritic: {
      score: 92,
      url: "https://www.metacritic.com/game/pc/team-fortress-2",
    },
  },
}

const meta = {
  title: "Components/GameCard",
  component: GameCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    game: sampleGame,
  },
  render: (args) => renderWithChakra(args as GameCardProps),
} satisfies Meta<typeof GameCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    game: sampleGame,
  },
}
