import { Grid } from "@chakra-ui/react"
import { useGetEvents } from "../../../api"
import { EventDetailModal } from "../EventDetailModal"
import { Card } from "../Card"
import { useNavigate, useSearch } from "@tanstack/react-router"
import React from "react"

export const Cards = () => {
  const searchParams: {
    id?: number
  } = useSearch({
    strict: false,
  })
  const navigate = useNavigate()

  const { data, isLoading, error, isError } = useGetEvents()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error?.message}</div>
  }

  if (data?.data.events.length === 0) {
    return <div>開催予定のイベントがありません</div>
  }

  const events = data?.data.events

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      gap={2}
    >
      {events?.map((event) => {
        if (event.id === undefined) return null

        const isOrganizer = event.organizer.id === 1
        const isParticipant =
          event.users?.some((participant) => participant.id === 1) ?? false
        const isSelected = searchParams.id === event.id

        return (
          <React.Fragment key={event.id}>
            <Card
              key={event.id}
              title={event.title}
              imageUrl={event.image_url}
              userName={event.organizer.name}
              startDate={event.start_date}
              isOrganizer={isOrganizer}
              isParticipant={isParticipant}
              onClick={() => navigate({ search: { id: event.id } })}
            />
            <EventDetailModal
              event={event}
              isOpen={isSelected}
              mode={
                isOrganizer ? "owner" : isParticipant ? "participant" : "other"
              }
              onParticipate={() => {}}
              onEdit={() => {}}
              onClose={() => navigate({ search: {} })}
            />
          </React.Fragment>
        )
      })}
    </Grid>
  )
}
