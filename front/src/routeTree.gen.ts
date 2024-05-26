/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginRouteImport } from './routes/login/route'
import { Route as HistoryRouteImport } from './routes/history/route'
import { Route as EventsRouteImport } from './routes/events/route'
import { Route as SettingsProfileRouteImport } from './routes/settings/profile/route'
import { Route as EventsNewRouteImport } from './routes/events/new/route'
import { Route as EventsEventIdEditRouteImport } from './routes/events/$eventId/edit/route'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const LoginRouteRoute = LoginRouteImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const HistoryRouteRoute = HistoryRouteImport.update({
  path: '/history',
  getParentRoute: () => rootRoute,
} as any)

const EventsRouteRoute = EventsRouteImport.update({
  path: '/events',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SettingsProfileRouteRoute = SettingsProfileRouteImport.update({
  path: '/settings/profile',
  getParentRoute: () => rootRoute,
} as any)

const EventsNewRouteRoute = EventsNewRouteImport.update({
  path: '/new',
  getParentRoute: () => EventsRouteRoute,
} as any)

const EventsEventIdEditRouteRoute = EventsEventIdEditRouteImport.update({
  path: '/$eventId/edit',
  getParentRoute: () => EventsRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/events': {
      id: '/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsRouteImport
      parentRoute: typeof rootRoute
    }
    '/history': {
      id: '/history'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof HistoryRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRoute
    }
    '/events/new': {
      id: '/events/new'
      path: '/new'
      fullPath: '/events/new'
      preLoaderRoute: typeof EventsNewRouteImport
      parentRoute: typeof EventsRouteImport
    }
    '/settings/profile': {
      id: '/settings/profile'
      path: '/settings/profile'
      fullPath: '/settings/profile'
      preLoaderRoute: typeof SettingsProfileRouteImport
      parentRoute: typeof rootRoute
    }
    '/events/$eventId/edit': {
      id: '/events/$eventId/edit'
      path: '/$eventId/edit'
      fullPath: '/events/$eventId/edit'
      preLoaderRoute: typeof EventsEventIdEditRouteImport
      parentRoute: typeof EventsRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  EventsRouteRoute: EventsRouteRoute.addChildren({
    EventsNewRouteRoute,
    EventsEventIdEditRouteRoute,
  }),
  HistoryRouteRoute,
  LoginRouteRoute,
  SettingsProfileRouteRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/events",
        "/history",
        "/login",
        "/settings/profile"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/events": {
      "filePath": "events/route.tsx",
      "children": [
        "/events/new",
        "/events/$eventId/edit"
      ]
    },
    "/history": {
      "filePath": "history/route.tsx"
    },
    "/login": {
      "filePath": "login/route.tsx"
    },
    "/events/new": {
      "filePath": "events/new/route.tsx",
      "parent": "/events"
    },
    "/settings/profile": {
      "filePath": "settings/profile/route.tsx"
    },
    "/events/$eventId/edit": {
      "filePath": "events/$eventId/edit/route.tsx",
      "parent": "/events"
    }
  }
}
ROUTE_MANIFEST_END */
