import { Image, Box, Text } from "@chakra-ui/react"
import { randomEmoji } from "../../../utils/randomEmoji"
import type { ComponentProps } from "react"

type EventImageProps = {
  title: string
  imageUrl?: string
  iconCharCode?: string
  w?: ComponentProps<typeof Box>["w"]
}

export const EventImage = (props: EventImageProps) => {
  return props.imageUrl ? (
    <Image
      w={props.w ?? 20}
      aspectRatio={16 / 9}
      rounded={"md"}
      objectFit="cover"
      src={props.imageUrl}
      alt={props.title}
      fallback={
        <Box
          w={props.w ?? 20}
          aspectRatio={16 / 9}
          rounded={"md"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundColor={"background"}
        >
          <Text fontSize={"5xl"}>{randomEmoji(props.title.length)}</Text>
        </Box>
      }
    />
  ) : props.iconCharCode ? (
    <Box
      w={props.w ?? 20}
      aspectRatio={16 / 9}
      rounded={"md"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"background"}
    >
      <Text fontSize={"5xl"}>{props.iconCharCode}</Text>
    </Box>
  ) : (
    <Box w={props.w ?? 20} aspectRatio={16 / 9} />
  )
}
