import { Avatar, Badge, Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import { RiCheckFill, RiFlagFill } from "react-icons/ri"
import { EventImage } from "../EventImage"

type Props = {
  title: string
  imageUrl?: string
  iconCharCode?: string
  userImageUrl?: string
  userName: string
  startDate: string
  isOrganizer: boolean
  isParticipant: boolean
  onClick: () => void
}

export const Card = (props: Props) => {
  const startDate = new Date(props.startDate)
  const formattedStartDate = format(startDate, "yyyy/MM/dd HH:mm ~")

  return (
    <Box
      bg="backgroundLight"
      p={4}
      mb={4}
      sx={{
        borderRadius: "md",
        boxShadow: "md",
        transition: "all 0.2s",
      }}
      _hover={{
        cursor: "pointer",
        opacity: 0.7,
      }}
      onClick={props.onClick}
    >
      <Stack>
        <Flex gap={2}>
          <Text fontWeight="bold" fontSize="lg" noOfLines={3}>
            {props.title}
          </Text>
          <Spacer />
          <EventImage
            imageUrl={props.imageUrl}
            iconCharCode={props.iconCharCode}
            title={props.title}
            w={32}
          />
        </Flex>
        <Flex alignItems={"center"}>
          <Flex alignItems={"center"} gap={4} color={"gray"}>
            <Flex alignItems={"center"} gap={2}>
              <Avatar size="xs" src={props.userImageUrl} />
              <Text fontSize={"small"}>{props.userName}</Text>
            </Flex>
            <Text>|</Text>
            <Text fontSize={"small"}>{formattedStartDate}</Text>
          </Flex>
          <Spacer />
          <Flex gap={2}>
            {props.isOrganizer && (
              <Badge
                colorScheme="green"
                variant="subtle"
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <RiFlagFill />
                主催
              </Badge>
            )}
            {props.isParticipant && (
              <Badge
                colorScheme="primary"
                variant="subtle"
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <RiCheckFill />
                参加予定
              </Badge>
            )}
          </Flex>
        </Flex>
      </Stack>
    </Box>
  )
}
