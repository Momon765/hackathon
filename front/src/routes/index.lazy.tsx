import { createLazyFileRoute } from "@tanstack/react-router"
import { Heading } from "./-components/Heading"
import {
  getGetEventMockHandler,
  getGetEventsResponseMock,
  useGetEvents,
} from "../api"
import { Card } from "./-components/Card"
import { Grid } from "@chakra-ui/react"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const { data, isLoading } = useGetEvents()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const events = data?.data.events

  return (
    <>
      <Heading text="新着イベント" />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={2}
      >
        {events?.map((event) => {
          const isOrganizer = event.organizer.id === 1
          const isParticipant =
            event.users?.some((participant) => participant.id === 1) ?? false

          return (
            <Card
              key={event.id}
              title={event.title}
              imageUrl={event.image_url}
              userName={event.organizer.name}
              startDate={event.start_date}
              isOrganizer={isOrganizer}
              isParticipant={isParticipant}
              onClick={() => {}}
            />
          )
        })}
      </Grid>
    </>
  )
}
