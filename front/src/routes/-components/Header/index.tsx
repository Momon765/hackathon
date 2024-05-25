import {
  Box,
  Button,
  Container,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { RiPencilFill } from "react-icons/ri"

type Props = {
  tabIndex: number
  onClickTab: (index: number) => void
  onClickNew: () => void
}

export const Header = (props: Props) => {
  return (
    <Box
      as="header"
      bg="backgroundLight"
      pt={2}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container position="relative" maxW="container.xl">
        <Text fontSize="small" fontWeight="bold">
          🍙 GOHAN
        </Text>
        <Tabs
          variant="unstyled"
          colorScheme="red"
          onChange={props.onClickTab}
          index={props.tabIndex}
        >
          <TabList>
            <Tab>新着</Tab>
            <Tab>開催予定</Tab>
            <Tab>履歴</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="primary.500"
            borderRadius="1px"
          />
        </Tabs>
        <Button
          leftIcon={<RiPencilFill />}
          colorScheme="primary"
          color="white"
          size="sm"
          position="absolute"
          bottom={1}
          right={0}
          onClick={props.onClickNew}
        >
          新規作成
        </Button>
      </Container>
    </Box>
  )
}
