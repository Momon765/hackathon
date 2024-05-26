import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Divider,
  Flex,
  Avatar,
  Badge,
  Box,
} from "@chakra-ui/react"
import type { Event } from "../../../api"
import type { ReactNode } from "react"
import { SEX_ENUM } from "../../../constants"
import { EventImage } from "../EventImage"

type Mode = "owner" | "participant" | "other"

type Props = {
  event: Event
  mode: Mode
  isOpen: boolean
  onEdit: () => void
  onParticipate: () => void
  onClose: () => void
}

const EventDetailModalItem = ({
  label,
  values,
}: {
  label: string
  values: ReactNode[]
}) => {
  return (
    <Flex gap={4}>
      <Text minW={24} fontSize="sm" fontWeight="bold">
        {label}
      </Text>
      <Stack spacing={1}>
        {values.map((value, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Text fontSize="sm" key={index}>
            {value}
          </Text>
        ))}
      </Stack>
    </Flex>
  )
}

const EventDetailModalUser = (props: {
  userImageUrl?: string
  userName: string
  isAnonymous?: boolean
}) => {
  return (
    <Flex alignItems={"center"} gap={4} color={"gray"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar
          size="xs"
          src={props.isAnonymous ? undefined : props.userImageUrl}
        />
        <Text fontSize={"small"}>{props.userName}</Text>
      </Flex>
    </Flex>
  )
}

export const EventDetailModal = ({
  event,
  onClose,
  mode,
  isOpen,
  onEdit,
  onParticipate,
}: Props) => {
  const startDate = new Date(event.start_date)
  const endDate = new Date(event.end_date)
  const deadline = new Date(event.deadline ?? "")
  const formattedStartDate = startDate.toLocaleString()
  const formattedEndDate = endDate.toLocaleString()
  const formattedDeadline = deadline.toLocaleString()

  return (
    <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="h2" fontSize="2xl">
            {event.title}
          </Text>
          <Text as="p" fontSize="sm" fontWeight={"normal"} color="gray">
            {formattedStartDate} ~ {formattedEndDate}
          </Text>
          {event.is_anonymous && (
            <Badge colorScheme="primary" variant="subtle">
              匿名
            </Badge>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Stack spacing={4} paddingBlock={4}>
            <Box p={4}>
              <EventImage
                imageUrl={event.image_url}
                title={event.title}
                w="100%"
              />
            </Box>
            <Divider />
            <EventDetailModalItem
              label="締め切り"
              values={[formattedDeadline]}
            />
            <EventDetailModalItem
              label="主催者"
              values={[
                <EventDetailModalUser
                  userImageUrl={
                    event.is_anonymous ? undefined : event.organizer.image_url
                  }
                  userName={event.organizer.name}
                />,
              ]}
            />
            <EventDetailModalItem
              label="場所"
              // TODO: Fix this
              values={["オーケー 札の辻店"]}
            />
            <EventDetailModalItem label="詳細" values={[event.description]} />
            <Divider />
            <Text fontSize="sm" fontWeight="bold">
              募集条件
            </Text>
            <EventDetailModalItem
              label="性別"
              values={event.scope_sex ? [SEX_ENUM[event.scope_sex]] : []}
            />
            <EventDetailModalItem
              label="雇用形態"
              values={
                event.employment_types?.map((employmentType) => {
                  return employmentType.name
                }) ?? []
              }
            />
            <EventDetailModalItem
              label="部署/役職"
              values={
                event.roles?.map((role) => {
                  return `${role.department.name} / ${role.name}`
                }) ?? []
              }
            />
            <Divider />
            <EventDetailModalItem
              label="参加予定"
              values={
                event.users?.map((user) => (
                  <EventDetailModalUser
                    userImageUrl={user.image_url}
                    userName={user.name}
                    isAnonymous={event.is_anonymous}
                  />
                )) ?? []
              }
            />
          </Stack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Flex flex={1} gap={4} justifyContent={"space-between"}>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
            {(mode === "owner" && (
              <Button colorScheme="primary" onClick={onEdit}>
                編集
              </Button>
            )) ||
              (mode === "participant" && (
                <Button colorScheme="primary" isDisabled>
                  参加済み
                </Button>
              )) ||
              (mode === "other" && (
                <Button colorScheme="primary" onClick={onParticipate}>
                  参加
                </Button>
              ))}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
