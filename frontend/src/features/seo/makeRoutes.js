import { Route } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function makeRoutes(pages) {
  const entries = Object.entries(pages)

  return entries.map(([path, { element, helmet }], i) => (
    <Route
      key={`${path}__${i}`}
      path={path}
      element={
        <>
          <Helmet titleTemplate="%s | Лето Тверь" {...helmet} />
          {element}
        </>
      }
    />
  ))
}
