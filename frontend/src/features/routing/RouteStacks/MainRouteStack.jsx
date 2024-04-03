import { Navigate, Routes, useLocation, Route } from "react-router-dom"
import { DirectorRouteStack } from "./DirectorRouteStack"
import { ROOT, FORGOT_PASSWORD, SIGN_IN, SIGN_UP } from "shared/constants/routes"

import Page404 from "pages/Service/Page404/Page404"
import { OperatorRouteStack } from "./OperatorRouteStack"
import { ACCESSRIGHTS } from "shared/constants/accessRightsConstant"
import { UserRouteStack } from "./UserRouteStack"

export const MainRouteStack = ({ type }) => {
  const location = useLocation()

  return (
    <>
      <Routes>
        <Route path={SIGN_UP} element={<Navigate to={ROOT} />} />
        <Route path={SIGN_IN} element={<Navigate to={location.state?.backurl || ROOT} />} />
        <Route path={FORGOT_PASSWORD} element={<Navigate to={location.state?.backurl || ROOT} />} />

        {(type === ACCESSRIGHTS.USER || type === ACCESSRIGHTS.ADMIN) && UserRouteStack()}
        {(type === ACCESSRIGHTS.DIRECTOR || type === ACCESSRIGHTS.ADMIN) && DirectorRouteStack()}
        {(type === ACCESSRIGHTS.OPERATOR || type === ACCESSRIGHTS.ADMIN) && OperatorRouteStack()}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}
