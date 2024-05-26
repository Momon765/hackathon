import { useForm } from "react-hook-form"
import { z } from "zod"
import type {
  EmploymentType,
  Role,
  Event,
  PostEventMutationBody,
} from "../../../../api"
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
  Select,
  Box,
} from "@chakra-ui/react"
import { SEX_ENUM } from "../../../../constants"
import { format, parseISO } from "date-fns"

type Props = {
  roles: Role[]
  employmentTypes: EmploymentType[]
  heading: string
  defaultValues?: Event
  submitButtonText: string
  onSubmit: (values: PostEventMutationBody) => Promise<void>
  onClose: () => void
}

const schema = z.object({
  title: z.string(),
  isAnonymous: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  deadline: z.string(),
  roleIds: z.array(z.number()),
  employmentTypeIds: z.array(z.number()),
  scopeSex: z.number(),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export const EventForm = (props: Props) => {
  const sexOptions = Object.entries(SEX_ENUM).map(([key, value]) => ({
    label: value,
    value: Number(key),
  }))

  const { defaultValues, onSubmit } = props

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      title: defaultValues?.title,
      isAnonymous: defaultValues?.is_anonymous,
      startDate: format(
        parseISO(defaultValues!.start_date!),
        "yyyy-MM-dd'T'HH:mm"
      ),
      endDate: format(parseISO(defaultValues!.end_date!), "yyyy-MM-dd'T'HH:mm"),
      deadline: defaultValues?.deadline
        ? format(parseISO(defaultValues!.deadline!), "yyyy-MM-dd'T'HH:mm")
        : undefined,
      roleIds: defaultValues?.roles?.map((role) => role.id) ?? [],
      employmentTypeIds:
        defaultValues?.employment_types?.map(
          (employmentType) => employmentType.id
        ) ?? [],
      scopeSex: defaultValues?.scope_sex,
      description: defaultValues?.description,
    },
  })

  const onSubmitHandler = handleSubmit(async (values) => {
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
    await onSubmit(event)
  }, console.error)

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

  const currentRoleIds = watch("roleIds")
  const currentEmploymentTypeIds = watch("employmentTypeIds")

  return (
    <Modal isOpen={true} onClose={handleClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <Box as={"form"} display={"contents"} onSubmit={onSubmitHandler}>
          <ModalHeader>{props.heading}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody paddingBlock={4}>
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
                <div>
                  {format(
                    parseISO(defaultValues!.start_date!),
                    "yyyy-MM-ddThh:mm"
                  )}
                </div>
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
              <Text fontWeight={"bold"}>募集条件</Text>
              <FormControl>
                <FormLabel>性別</FormLabel>
                <Select {...register("scopeSex")}>
                  {sexOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>雇用形態</FormLabel>
                {
                  <Stack>
                    {props.employmentTypes.map((employmentType) => (
                      <Checkbox
                        key={employmentType.id}
                        value={employmentType.id}
                        isChecked={currentEmploymentTypeIds.includes(
                          employmentType.id
                        )}
                        onChange={() => {
                          setValue(
                            "employmentTypeIds",
                            currentEmploymentTypeIds.includes(employmentType.id)
                              ? currentEmploymentTypeIds.filter(
                                  (id) => id !== employmentType.id
                                )
                              : [...currentEmploymentTypeIds, employmentType.id]
                          )
                        }}
                      >
                        {employmentType.name}
                      </Checkbox>
                    ))}
                  </Stack>
                }
              </FormControl>
              <FormControl>
                <FormLabel>部署/役職</FormLabel>
                {
                  <Stack>
                    {props.roles.map((role) => (
                      <Checkbox
                        key={role.id}
                        value={role.id}
                        isChecked={currentRoleIds.includes(role.id)}
                        onChange={() =>
                          setValue(
                            "roleIds",
                            currentRoleIds.includes(role.id)
                              ? currentRoleIds.filter((id) => id !== role.id)
                              : [...currentRoleIds, role.id]
                          )
                        }
                      >
                        {role.department.name} / {role.name}
                      </Checkbox>
                    ))}
                  </Stack>
                }
              </FormControl>
            </Stack>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="primary"
              isLoading={isSubmitting}
            >
              {props.submitButtonText}
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}
