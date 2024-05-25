import type { Preview } from "@storybook/react";
// .storybook/preview.js

// const theme = require('../path/to/your/theme')

// export const parameters = {
//   chakra: {
//     theme,
//   },
// }

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
