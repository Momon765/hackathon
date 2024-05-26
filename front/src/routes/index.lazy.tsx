import { createLazyFileRoute } from "@tanstack/react-router"
import { Heading } from "./-components/Heading"
import { useGetEvents } from "../api"
import { Card } from "./-components/Card"
import { Grid } from "@chakra-ui/react"
import { Cards } from "./-components/Cards"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <>
      <Heading text="新着イベント" />
      <Cards />
    </>
  )
}
