import type { Meta, StoryObj } from "@storybook/react-vite"

import { Login } from "../components/Login"

const meta = {
  title: "Components/Login",
  component: Login,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Login>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
