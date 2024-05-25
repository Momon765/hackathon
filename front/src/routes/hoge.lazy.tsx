import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hoge')({
  component: () => <div>Hello /hoge!</div>
})