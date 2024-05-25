import type { Preview } from "@storybook/react";
import { theme } from "../src/theme"; 

export const parameters = {
  chakra: {
    theme,
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
