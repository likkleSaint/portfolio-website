import { AppRoutes } from './app/routes'
import { AppShell } from './components/layout/AppShell'

export default function App() {
  return (
    <AppShell>
      <AppRoutes />
    </AppShell>
  )
}
