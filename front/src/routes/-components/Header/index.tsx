import { Box, Button } from "@chakra-ui/react"

type Props = {
  hoge: "hoge"
}

export const Header = (props: Props) => {
  return (
    <Box bg="gray.200" p={2}>
      <Button colorScheme="primary" variant="solid">
        Log in
      </Button>
      <Button colorScheme="primary" variant="outline">
        Log in
      </Button>
      <Button colorScheme="primary" variant="ghost">
        Log in
      </Button>
      <Button colorScheme="primary" variant="link">
        Log in
      </Button>
    </Box>
  )
}
