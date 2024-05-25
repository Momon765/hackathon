import { createLazyFileRoute } from "@tanstack/react-router"
import { Heading } from "./-components/Heading"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return <Heading text="新着イベント" />
}
