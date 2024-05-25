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
import { Container } from "@chakra-ui/react"

export const Route = createRootRoute({
  component: () => {
    const location = useLocation()
    const navigate = useNavigate({
      from: location.pathname,
    })

    const handleClickTab = (index: number) => {
      navigate({
        to: TABS[index],
      })
    }

    return (
      <>
        <Header
          pathName={location.pathname}
          onClickTab={handleClickTab}
          onClickNew={() => console.log("click new")}
        />
        <Container maxW="container.xl" pt={20}>
          <Outlet />
        </Container>
        <TanStackRouterDevtools />
      </>
    )
  },
})
