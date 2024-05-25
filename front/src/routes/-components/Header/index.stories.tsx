import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Header } from "./index"

const meta = {
  title: "Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabIndex: 0,
    onClickTab: fn(),
    onClickNew: fn(),
  },
}
