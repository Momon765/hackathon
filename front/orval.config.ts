import { defineConfig } from "orval";

export default defineConfig({
	backend: {
		input: {
			target: "../openapi.yml",
		},
		output: {
			client: "react-query",
			target: "./src/api.ts",
<<<<<<< Updated upstream
			// baseUrl: "http://localhost:3000",
=======
>>>>>>> Stashed changes
			baseUrl: "https://devsite.local",
			mock: true,
			override: {
				mutator: {
					path: './src/axiosInstance.ts',
					name: 'customInstance',
				}
			}
		},
	},
});
