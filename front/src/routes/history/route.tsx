import { createFileRoute } from "@tanstack/react-router"
import { Heading } from "../-components/Heading"

export const Route = createFileRoute("/history")({
  component: () => (
    <>
      <Heading text="開催履歴" />
      <br /> まだないよ
    </>
  ),
})
