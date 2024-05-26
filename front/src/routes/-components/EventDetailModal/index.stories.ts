import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { EventDetailModal } from "./index";
import { getGetEventResponseMock } from "../../../api";

const meta = {
	title: "EventDetailModal",
	component: EventDetailModal,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
} satisfies Meta<typeof EventDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		event: getGetEventResponseMock().event,
		isOpen: true,
		mode: "owner",
		onParticipate: fn(),
		onEdit: fn(),
		onClose: fn(),
	},
};

export const Participant: Story = {
	args: {
		event: getGetEventResponseMock().event,
		isOpen: true,
		mode: "participant",
		onParticipate: fn(),
		onEdit: fn(),
		onClose: fn(),
	},
};

export const Other: Story = {
	args: {
		event: getGetEventResponseMock().event,
		isOpen: true,
		mode: "other",
		onParticipate: fn(),
		onEdit: fn(),
		onClose: fn(),
	},
};
