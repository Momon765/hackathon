import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Header, TABS } from "./-components/Header"
import { Box, Container } from "@chakra-ui/react"
import { useGetMe } from "../api"

export const Route = createRootRoute({
  component: () => {
    const location = useLocation()
    const navigate = useNavigate({
      from: location.pathname,
    })

    // 認証
    // const { data, error } = useGetMe()

    // if (error) {
    // if (location.pathname !== "/login") {
    //   navigate({ to: "/login" })
    //   return null
    // }

    const handleClickTab = (index: number) => {
      navigate({
        to: TABS[index],
      })
    }

    const handleClickSettings = () => {
      navigate({
        to: "/settings/profile",
      })
    }

    return (
      <Box minH="100vh" background={"background"}>
        <Header
          isLoggedin={
            location.pathname !== "/login" && location.pathname !== "/signup"
          }
          onClickSettings={handleClickSettings}
          pathName={location.pathname}
          onClickTab={handleClickTab}
          onClickNew={() => console.log("click new")}
        />
        <Container maxW="container.lg" pt={20} background={"background"}>
          <Outlet />
        </Container>
        <TanStackRouterDevtools />
      </Box>
    )
  },
})
