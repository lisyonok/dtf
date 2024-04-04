import Draw from "pages/Draw"
import Drawing from "pages/Drawing"
import Drawings from "pages/Drawings"
import { Navigate, Route, Routes } from "react-router-dom"

const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Draw />} />
      <Route path={"/drawing/:id"} element={<Drawing />} />
      <Route path={"/drawings"} element={<Drawings />} />

      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  )
}
export default Routing
