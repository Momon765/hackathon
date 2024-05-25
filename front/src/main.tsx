import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { worker } from "./mock/browser"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./theme"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

// Start the mock service worker
worker.start()

// Render the app
const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("No root element found")
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
