import {
  ROOT,
  APPLICATIONS,
  APPLICATIONS_STATUS,
  APPLICATIONS_CREATE,
  APPLICATIONS_DETAIL,
  APPLICATIONS_QUEUE,
  CHILDREN_DETAIL,
  CHILDREN_LIST,
  PROFILE,
  PERSONAL,
  CHILDREN_ADD,
  PROMO_CODE
} from "shared/constants/routes"
import { Suspense, lazy } from "react"
import { RelativeLoader } from "../../RelativeLoader/RelativeLoader"
import makeRoutes from "features/seo/makeRoutes"

const Home = lazy(() => import("pages/User/Home/Home"))
const Applications = lazy(() => import("pages/User/Applications/Applications"))
const ApplicationsStatus = lazy(() => import("pages/User/ApplicationsStatus/ApplicationsStatus"))
const ApplicationsCreate = lazy(() => import("pages/User/ApplicationsCreate/ApplicationsCreate"))
const ApplicationDetail = lazy(() => import("pages/User/ApplicationsDetail/ApplicationsDetail"))
const ApplicationsQueue = lazy(() => import("pages/User/ApplicationsQueue/ApplicationsQueue"))
const ChildrenDetail = lazy(() => import("pages/User/ChildrenDetail/ChildrenDetail"))
const ChildrenList = lazy(() => import("pages/User/ChildrenList/ChildrenList"))
const Profile = lazy(() => import("pages/User/Profile/Profile"))
const ChildrenAdd = lazy(() => import("pages/User/ChildrenAdd/ChildrenAdd"))
const Personal = lazy(() => import("pages/User/Personal/Personal"))
const PromoCode = lazy(() => import("pages/User/PromoCode/PromoCode"))

const wrap = (children) => <Suspense fallback={<RelativeLoader />}>{children}</Suspense>

const pages = {
  [ROOT]: { element: wrap(<Home />), helmet: { title: "Главная" } },
  [APPLICATIONS]: { element: wrap(<Applications />), helmet: { title: "Заявки" } },
  [APPLICATIONS_STATUS]: { element: wrap(<ApplicationsStatus />), helmet: { title: "Заявка" } },
  [APPLICATIONS_CREATE]: { element: wrap(<ApplicationsCreate />), helmet: { title: "Подать заявку" } },
  [APPLICATIONS_DETAIL]: { element: wrap(<ApplicationDetail />), helmet: { title: "Заявка" } },
  [APPLICATIONS_QUEUE]: { element: wrap(<ApplicationsQueue />), helmet: { title: "Электронная очередь" } },
  [CHILDREN_ADD]: { element: wrap(<ChildrenAdd />), helmet: { title: "Добавить ребенка" } },
  [CHILDREN_DETAIL]: { element: wrap(<ChildrenDetail />), helmet: { title: "Ребенок" } },
  [CHILDREN_LIST]: { element: wrap(<ChildrenList />), helmet: { title: "Дети" } },
  [PERSONAL]: { element: wrap(<Personal />), helmet: { title: "Данные заявителя" } },
  [PROFILE]: { element: wrap(<Profile />), helmet: { title: "Личный кабинет" } },
  [PROMO_CODE]: { element: wrap(<PromoCode />), helmet: { title: "Промокоды" } }
}
export const UserRouteStack = () => {
  return makeRoutes(pages)
}
