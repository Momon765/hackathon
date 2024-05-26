import {
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  getMe,
  useGetDepartments,
  useGetEmploymentTypes,
  useGetMe,
  useGetRoles,
  usePutUser,
} from "../../../api"
import { SEX_ENUM } from "../../../constants"

export const Route = createFileRoute("/settings/profile")({
  component: () => <Index />,
})

const schema = z.object({
  description: z.string(),
  departmentId: z.number().int(),
  roleId: z.number().int(),
  employmentTypeId: z.number().int(),
  sex: z.number(),
})

type FormData = z.infer<typeof schema>

const Index = () => {
  const toast = useToast()

  const { data: departmentsData } = useGetDepartments()
  const { data: rolesData } = useGetRoles()
  const { data: employmentTypesData } = useGetEmploymentTypes()

  const { mutateAsync: updateProfile } = usePutUser()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const data = await getMe()
      return {
        description: data.user.description ?? "",
        departmentId: data.user.role?.department.id ?? 0,
        roleId: data.user.role?.id ?? 0,
        employmentTypeId: data.user.employmentType?.id ?? 0,
        sex: data.user.sex ?? 2,
      }
    },
  })

  const onSubmit = handleSubmit(
    async (data) => {
      await updateProfile(
        {
          userId: "3",
          data: {
            description: data.description,
            role_id: data.roleId,
            employment_type_id: data.employmentTypeId,
            sex: data.sex as 0 | 1 | 2,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "保存しました",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
          },
          onError: (e) => {
            toast({
              title: "エラーが発生しました",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          },
        }
      )
    },
    (e) => console.error(e, watch())
  )

  const roleOptions = rolesData?.roles.filter(
    (role) => role.department.id === watch("departmentId")
  )

  return (
    <Card>
      <CardHeader>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          プロフィール設定
        </Text>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardBody>
          <Stack>
            <FormControl isInvalid={Boolean(errors.sex)}>
              <FormLabel>性別</FormLabel>
              <Select {...register("sex", { valueAsNumber: true })}>
                {Object.entries(SEX_ENUM).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
              {errors.sex && (
                <FormErrorMessage>{errors.sex.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(errors.departmentId)}>
              <FormLabel>雇用形態</FormLabel>
              <Select
                {...register("employmentTypeId", { valueAsNumber: true })}
              >
                {employmentTypesData?.employmentTypes.map((employmentType) => (
                  <option key={employmentType.id} value={employmentType.id}>
                    {employmentType.name}
                  </option>
                ))}
              </Select>
              {errors.employmentTypeId && (
                <FormErrorMessage>
                  {errors.employmentTypeId.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(errors.departmentId)}>
              <FormLabel>部署</FormLabel>
              <Select {...register("departmentId", { valueAsNumber: true })}>
                {departmentsData?.departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Select>
              {errors.departmentId && (
                <FormErrorMessage>
                  {errors.departmentId.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isDisabled={!watch("departmentId") || !roleOptions?.length}
              isInvalid={Boolean(errors.roleId)}
              isRequired
            >
              <FormLabel>役職</FormLabel>
              <Select {...register("roleId", { valueAsNumber: true })}>
                {roleOptions?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
              {errors.roleId && (
                <FormErrorMessage>{errors.roleId.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel>自己紹介</FormLabel>
              <Textarea {...register("description")} />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button
            isLoading={isSubmitting}
            type="submit"
            ml={"auto"}
            colorScheme={"primary"}
          >
            保存
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
