import { defineConfig } from "orval";

export default defineConfig({
	backend: {
		input: {
			target: "../openapi.yml",
		},
		output: {
			client: "react-query",
			target: "./src/api.ts",
			// baseUrl: "http://localhost:3000",
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
