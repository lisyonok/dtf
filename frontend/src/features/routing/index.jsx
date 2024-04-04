import Draw from "pages/Draw"
import Drawing from "pages/Drawing"
import { Navigate, Route, Routes } from "react-router-dom"

const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Draw />} />
      <Route path={"/drawing/:id"} element={<Drawing />} />

      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  )
}
export default Routing
