import { Grid, useToast } from "@chakra-ui/react"
import { useGetEvents, useJoinEvent } from "../../../api"
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
  const toast = useToast()

  const { mutateAsync: joinEvent } = useJoinEvent()
  const handleJoinEvent = async () => {
    if (!searchParams.id) return

    try {
      await joinEvent({
        eventId: searchParams.id,
        data: {
          user_id: 1,
        },
      })
      toast({
        title: "イベントに参加しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      navigate({ search: {} })
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.error(error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error?.message}</div>
  }

  if (!data) {
    return <div>データがありません</div>
  }

  if (data?.events?.length === 0) {
    return <div>開催予定のイベントがありません</div>
  }

  const events = data?.events

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      gap={2}
    >
      {events?.map((event) => {
        const eventId = event.id
        if (!eventId) return null

        // const isOrganizer = event.organizer.id === 1
        const isOrganizer = false
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
              isAnonymous={event.is_anonymous}
              onClick={() => navigate({ search: { id: event.id } })}
            />
            <EventDetailModal
              event={event}
              isOpen={isSelected}
              mode={
                isOrganizer ? "owner" : isParticipant ? "participant" : "other"
              }
              onParticipate={handleJoinEvent}
              onEdit={() =>
                navigate({
                  to: "/events/$eventId/edit",
                  params: { eventId: String(eventId) },
                  search: {},
                })
              }
              onClose={() => navigate({ search: {} })}
            />
          </React.Fragment>
        )
      })}
    </Grid>
  )
}
