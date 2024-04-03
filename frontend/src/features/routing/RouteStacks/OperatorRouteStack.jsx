import {
  OPERATOR_APPOINTMENT_SCHEDULE,
  OPERATOR_HOME,
  OPERATOR_APPLICATIONS_DETAIL,
  OPERATOR_APPLICATIONS
} from "shared/constants/routes"
import { Suspense, lazy } from "react"
import { RelativeLoader } from "../../RelativeLoader/RelativeLoader"
import makeRoutes from "features/seo/makeRoutes"

const OperatorHome = lazy(() => import("pages/Operator/OperatorHome/OperatorHome"))
const Applications = lazy(() => import("pages/Operator/Applications/Applications"))
const ApplicationsDetail = lazy(() => import("pages/Operator/ApplicationsDetail/ApplicationsDetail"))
const AppointmentSchedule = lazy(() => import("pages/Operator/AppointmentSchedule/AppointmentSchedule"))

const wrap = (children) => <Suspense fallback={<RelativeLoader />}>{children}</Suspense>

const pages = {
  [OPERATOR_HOME]: { element: wrap(<OperatorHome />), helmet: { title: "Главная" } },
  [OPERATOR_APPOINTMENT_SCHEDULE]: { element: wrap(<AppointmentSchedule />), helmet: { title: "Электронная очередь" } },
  [OPERATOR_APPLICATIONS]: { element: wrap(<Applications />), helmet: { title: "Список заявок" } },
  [OPERATOR_APPLICATIONS_DETAIL]: { element: wrap(<ApplicationsDetail />), helmet: { title: "Заявка" } }
}

export const OperatorRouteStack = () => {
  return makeRoutes(pages)
}
