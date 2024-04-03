import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { FORGOT_PASSWORD, SIGN_IN, SIGN_UP } from "shared/constants/routes"
import SignUp from "pages/Auth/SignUp/SignUp"
import SignIn from "pages/Auth/SignIn/SignIn"
import ForgotPassword from "pages/Auth/ForgotPassword/ForgotPassword"
import makeRoutes from "features/seo/makeRoutes"

export const AuthRouteStack = () => {
  const location = useLocation()

  const pages = {
    [SIGN_UP]: { element: <SignUp />, helmet: { title: "Регистрация" } },
    [SIGN_IN]: { element: <SignIn />, helmet: { title: "Авторизация" } },
    [FORGOT_PASSWORD]: { element: <ForgotPassword />, helmet: { title: "Восстановление пароля" } }
  }

  return (
    <>
      <Routes>
        {makeRoutes(pages)}
        <Route path="*" element={<Navigate to={SIGN_IN} state={{ backurl: location.pathname }} replace={true} />} />
      </Routes>
    </>
  )
}
