import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <>
      <title>Page not found | Portfolio V2</title>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Back home</Link>
    </>
  )
}
