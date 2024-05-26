import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Text,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useGetLoginUrl } from "../../api"

export const Route = createFileRoute("/login")({
  component: () => <Index />,
})

const Index = () => {
  const { data } = useGetLoginUrl()

  return (
    <Card margin="auto" maxW="container.sm">
      <CardHeader>
        <Center>
          <Text fontWeight={"bold"} fontSize={"3xl"}>
            GOHAN
          </Text>
        </Center>
      </CardHeader>
      <CardBody>
        <Center>
          <Text fontSize="4xl">🍙</Text>
        </Center>
      </CardBody>
      <CardFooter>
        <Button margin="auto" width="100%" colorScheme="primary">
          Slackでログイン
        </Button>
      </CardFooter>
    </Card>
  )
}
