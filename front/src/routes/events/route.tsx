import { createFileRoute } from "@tanstack/react-router"
import { Heading } from "../-components/Heading"

export const Route = createFileRoute("/events")({
  component: () => <Heading text="イベント一覧" />,
})
