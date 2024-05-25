// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	colors: {
		primary: {
			50: "#ffeedd", // 50は非常に明るい色
			100: "#ffdbba", // 100は明るい色
			200: "#ffca99", // 200は少し明るい色
			300: "#ffb97a", // 300は中程度の色
			400: "#ffa85b", // 400は中程度の色
			500: "#ff8e3c", // 500は基本色
			600: "#cc7130", // 600は少し暗い色
			700: "#995423", // 700はかなり暗い色
			800: "#663816", // 800は非常に暗い色
			900: "#331c0b", // 900は最も暗い色
		},
	},
});
