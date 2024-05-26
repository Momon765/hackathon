import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { RiPencilFill, RiSettings4Fill } from "react-icons/ri"

export const TABS = ["/", "/events", "/history"] as const

type Props = {
  pathName: string
  avatarUrl?: string
  isLoggedin: boolean
  onClickTab: (index: number) => void
  onClickNew: () => void
  onClickSettings: () => void
}

export const Header = (props: Props) => {
  const tabIndex = TABS.findIndex((tab) => tab.startsWith(props.pathName))

  return (
    <Box
      as="header"
      bg="backgroundLight"
      pt={2}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container position="relative" maxW="container.lg">
        <Text fontSize="small" fontWeight="bold">
          🍙 GOHAN
        </Text>
        {props.isLoggedin ? (
          <>
            <Tabs
              variant="unstyled"
              colorScheme="red"
              onChange={props.onClickTab}
              index={tabIndex}
            >
              <TabList>
                <Tab
                  sx={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                  _selected={{
                    color: "black",
                  }}
                >
                  新着
                </Tab>
                <Tab
                  sx={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                  _selected={{
                    color: "black",
                  }}
                >
                  開催予定
                </Tab>
                <Tab
                  sx={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                  _selected={{
                    color: "black",
                  }}
                >
                  履歴
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="primary.500"
                borderRadius="1px"
              />
            </Tabs>
            <Flex position="absolute" gap={4} bottom={1} right={4}>
              <Menu>
                <MenuButton
                  _hover={{
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                >
                  <Avatar src={props.avatarUrl} size="sm" />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={props.onClickSettings}
                    icon={<RiSettings4Fill />}
                  >
                    設定
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button
                leftIcon={<RiPencilFill />}
                colorScheme="primary"
                color="white"
                size="sm"
                onClick={props.onClickNew}
              >
                作成
              </Button>
            </Flex>
          </>
        ) : (
          <Box p={1} />
        )}
      </Container>
    </Box>
  )
}
