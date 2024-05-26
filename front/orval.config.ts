import { defineConfig } from "orval";

export default defineConfig({
	backend: {
		input: {
			target: "../openapi.yml",
		},
		output: {
			client: "react-query",
			target: "./src/api.ts",
			baseUrl: "http://localhost:8000",
			mock: true,
		},
	},
});
