import Draw from "pages/Draw"
import { Route, Routes } from "react-router-dom"

const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Draw />} />

      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  )
}
export default Routing
