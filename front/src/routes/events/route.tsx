import { createFileRoute } from "@tanstack/react-router"
import { Heading } from "../-components/Heading"

export const Route = createFileRoute("/events")({
  component: () => <Heading text="開催予定イベント一覧" />,
})
