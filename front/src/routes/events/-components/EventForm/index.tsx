import { useForm } from "react-hook-form"
import { z } from "zod"
import type { Event, PostEventMutationBody } from "../../../../api"
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"

type Props = {
  heading: string
  defaultValues: Event
  submitButtonText: string
  onSubmit: (values: PostEventMutationBody) => void
  onClose: () => void
}

const schema = z.object({
  title: z.string(),
  isAnonymous: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  deadline: z.string(),
  departmentId: z.number(),
  roleIds: z.array(z.number()),
  employmentTypeIds: z.array(z.number()),
  scopeSex: z.number(),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export const EventForm = (props: Props) => {
  const { defaultValues, onSubmit } = props
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormData>({
    defaultValues,
  })

  const onSubmitHandler = handleSubmit((values) => {
    const event: PostEventMutationBody = {
      title: values.title,
      is_anonymous: values.isAnonymous,
      start_date: values.startDate,
      end_date: values.endDate,
      deadline: values.deadline,
      role_ids: values.roleIds,
      employment_type_ids: values.employmentTypeIds,
      scope_sex: values.scopeSex,
      description: values.description,
    }
    onSubmit(event)
  })

  const handleClose = () => {
    if (isDirty) {
      const res = window.confirm("変更が保存されていません。本当に閉じますか？")

      if (!res) {
        return
      }
      props.onClose()
    }

    props.onClose()
  }

  return (
    <Modal isOpen={true} onClose={handleClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.heading}</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form onSubmit={onSubmitHandler}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <Input
                  variant="flushed"
                  placeholder="タイトルを入力"
                  fontSize={"lg"}
                  {...register("title")}
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>匿名</FormLabel>
                <Checkbox placeholder="タイトルを入力" {...register("title")} />
                {errors.isAnonymous && (
                  <FormErrorMessage>
                    {errors.isAnonymous.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Divider />
              <Text fontWeight={"bold"}>開催日時</Text>
              <FormControl isRequired>
                <FormLabel>開始</FormLabel>
                <Input type="datetime-local" {...register("startDate")} />
                {errors.startDate && (
                  <FormErrorMessage>
                    {errors.startDate.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>終了</FormLabel>
                <Input type="datetime-local" {...register("endDate")} />
                {errors.endDate && (
                  <FormErrorMessage>{errors.endDate.message}</FormErrorMessage>
                )}
              </FormControl>
              <Divider />
              <FormControl isRequired>
                <FormLabel>締め切り</FormLabel>
                <Input type="datetime-local" {...register("deadline")} />
                {errors.deadline && (
                  <FormErrorMessage>{errors.deadline.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>詳細</FormLabel>
                <Textarea {...register("description")} />
                {errors.description && (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Divider />
            </Stack>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme="primary">{props.submitButtonText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
