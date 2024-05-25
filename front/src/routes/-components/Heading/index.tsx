import { Box, Text } from "@chakra-ui/react"

type Props = {
  text: string
}

export const Heading = (props: Props) => {
  return (
    <Box paddingBlock={2}>
      <Text
        fontSize="xl"
        fontWeight="bold"
        paddingBlock={1}
        borderLeft="4px solid"
        borderColor={"primary.500"}
        paddingLeft={4}
      >
        {props.text}
      </Text>
    </Box>
  )
}
