import { Spinner, useToast } from "@chakra-ui/react"
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import {
  useGetEmploymentTypes,
  useGetEvent,
  useGetRoles,
  usePutEvent,
} from "../../../../api"
import type { ComponentProps } from "react"
import { EventForm } from "../../-components/EventForm"

export const Route = createFileRoute("/events/$eventId/edit")({
  component: () => <Index />,
})

const Index = () => {
  const toast = useToast()
  const navigate = useNavigate({
    from: "/events/new",
  })
  const eventId = useParams({
    from: "/events/$eventId/edit",
    select: (params) => params.eventId,
  })

  const {
    data: event,
    error: eventError,
    isLoading: isLoadingEvent,
  } = useGetEvent(eventId)
  const { data: roles, isLoading: isLoadingRoles } = useGetRoles()
  const { data: employmentTypes, isLoading: isLoadingEmploymentTypes } =
    useGetEmploymentTypes()
  const { mutateAsync: putEvent } = usePutEvent()

  const loading = isLoadingRoles || isLoadingEmploymentTypes || isLoadingEvent

  if (loading) {
    return <Spinner />
  }

  if (eventError) {
    return <div>Error: {eventError.message}</div>
  }

  const handleSubmit: ComponentProps<typeof EventForm>["onSubmit"] = async (
    values
  ) => {
    try {
      await putEvent({
        eventId: eventId,
        data: values,
      })
      toast({
        title: "イベントを更新しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      navigate({ from: "/events/new", to: "/events" })
    } catch (error) {
      toast({
        title: "イベントの更新に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <EventForm
      roles={roles?.data.roles ?? []}
      employmentTypes={employmentTypes?.data.employmentTypes ?? []}
      heading="イベント編集"
      submitButtonText="更新"
      onSubmit={handleSubmit}
      defaultValues={event?.data.event}
      onClose={() => {
        navigate({ from: "/events/$eventId/edit", to: "/events" })
      }}
    />
  )
}
