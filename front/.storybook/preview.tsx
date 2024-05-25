import type { Preview } from "@storybook/react"
import { theme } from "../src/theme"
import { ChakraProvider } from "@chakra-ui/react"
import React from "react"

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
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
