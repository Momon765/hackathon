import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Card } from "./index";

const meta = {
	title: "Card",
	component: Card,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
	args: {
		title: "【全社】エンジニア交流会",
		startDate: "2024-05-26T16:31:17.423Z",
		userName: "User Name",
		isOrganizer: true,
		isParticipant: true,
		imageUrl:
			"https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		userImageUrl:
			"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		iconCharCode: "🎉",
		onClick: fn(),
	},
};

export const withIcon: Story = {
	args: {
		title: "【全社】エンジニア交流会",
		startDate: "2024-05-26T16:31:17.423Z",
		userName: "User Name",
		isOrganizer: true,
		isParticipant: true,
		iconCharCode: "🎉",
		onClick: fn(),
	},
};

export const Minimal: Story = {
	args: {
		title: "【全社】エンジニア交流会",
		startDate: "2024-05-26T16:31:17.423Z",
		userName: "User Name",
		isOrganizer: false,
		isParticipant: false,
		onClick: fn(),
	},
};
