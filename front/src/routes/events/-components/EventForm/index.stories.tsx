import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { EventForm } from "./index"
import { getEvent, getGetEventResponseMock } from "../../../../api"

const meta = {
  title: "EventForm",
  component: EventForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof EventForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValues: getGetEventResponseMock(),
    heading: "イベント作成",
    submitButtonText: "作成",
  },
}
