import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Header } from "./index";

const meta = {
	title: "Header",
	component: Header,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isLoggedin: true,
		pathName: "/",
		onClickTab: fn(),
		onClickNew: fn(),
		onClickSettings: fn(),
	},
};

export const WithAvatar: Story = {
	args: {
		isLoggedin: true,
		pathName: "/",
		onClickTab: fn(),
		onClickNew: fn(),
		onClickSettings: fn(),
		avatarUrl:
			"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
};

export const NotLoggedin: Story = {
	args: {
		isLoggedin: false,
		pathName: "/",
		onClickTab: fn(),
		onClickNew: fn(),
		onClickSettings: fn(),
	},
};
