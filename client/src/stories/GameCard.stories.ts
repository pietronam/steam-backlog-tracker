import type { Meta, StoryObj } from "@storybook/react-vite"
import { GameCard } from "../components/GameCard"
import type { GameType } from "../types/gameType"


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
} satisfies Meta<typeof GameCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    game: sampleGame,
  },
}
