import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { EventForm } from "../-components/EventForm"
import { useGetEmploymentTypes, useGetRoles, usePostEvent } from "../../../api"
import { Spinner, useToast } from "@chakra-ui/react"
import type { ComponentProps } from "react"

export const Route = createFileRoute("/events/new")({
  component: () => <Index />,
})

const Index = () => {
  const toast = useToast()
  const navigate = useNavigate({
    from: "/events/new",
  })
  const { data: roles, isLoading: isLoadingRoles } = useGetRoles()
  const { data: employmentTypes, isLoading: isLoadingEmploymentTypes } =
    useGetEmploymentTypes()
  const { mutateAsync: postEvent } = usePostEvent()

  const loading = isLoadingRoles || isLoadingEmploymentTypes

  if (loading) {
    return <Spinner />
  }

  const handleSubmit: ComponentProps<typeof EventForm>["onSubmit"] = async (
    values
  ) => {
    await postEvent({
      data: values,
    })
    toast({
      title: "イベントを作成しました",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    navigate({ from: "/events/new", to: "/events" })
  }

  return (
    <EventForm
      roles={roles?.data.roles ?? []}
      employmentTypes={employmentTypes?.data.employmentTypes ?? []}
      heading="イベント作成"
      submitButtonText="作成"
      onSubmit={handleSubmit}
      onClose={() => {
        navigate({ from: "/events/new", to: "/events" })
      }}
    />
  )
}
