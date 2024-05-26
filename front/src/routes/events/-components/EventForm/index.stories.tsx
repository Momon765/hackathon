import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { EventForm } from "./index"
import { type Role, type Event, getGetUserResponseMock } from "../../../../api"

const meta = {
  title: "EventForm",
  component: EventForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof EventForm>

export default meta
type Story = StoryObj<typeof meta>

const DEPARTMENTS_MOCK = [
  {
    id: 1,
    name: "部署1",
  },
  {
    id: 2,
    name: "部署2",
  },
]

const ROLES_MOCK: Role[] = [
  {
    id: 1,
    name: "役職1",
    department: DEPARTMENTS_MOCK[0],
  },
  {
    id: 2,
    name: "役職2",
    department: DEPARTMENTS_MOCK[1],
  },
  {
    id: 3,
    name: "役職3",
    department: DEPARTMENTS_MOCK[0],
  },
]

const EMPLOYMENT_TYPES_MOCK = [
  {
    id: 1,
    name: "雇用形態1",
  },
  {
    id: 2,
    name: "雇用形態2",
  },
]

const EVENT_MOCK: Event = {
  id: 1,
  title: "イベント1",
  is_anonymous: false,
  start_date: "2022-01-01T00:00:00Z",
  end_date: "2022-01-01T00:00:00Z",
  deadline: "2022-01-01T00:00:00Z",
  roles: [ROLES_MOCK[0]],
  employment_types: [EMPLOYMENT_TYPES_MOCK[0]],
  image_url: "https://example.com/image.jpg",
  limit: 10,
  organizer: getGetUserResponseMock().user,
}

export const Default: Story = {
  args: {
    defaultValues: EVENT_MOCK,
    heading: "イベント作成",
    submitButtonText: "作成",
    employmentTypes: EMPLOYMENT_TYPES_MOCK,
    roles: ROLES_MOCK,
    departments: DEPARTMENTS_MOCK,
    onClose: fn(),
    onSubmit: fn(),
  },
}
