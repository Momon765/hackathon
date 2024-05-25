import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Heading } from "./index";

const meta = {
	title: "Heading",
	component: Heading,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "Hello, world!",
	},
};
