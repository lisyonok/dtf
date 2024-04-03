import {
  DIRECTOR_HOME,
  DIRECTOR_SHIFTS,
  DIRECTOR_JOURNALS,
  DIRECTOR_JOURNAL_DETAIL,
  DIRECTOR_PROMO_CODE,
  DIRECTOR_REPORTS,
  DIRECTOR_REPORTS_SALES,
  DIRECTOR_REPORTS_CAPACITY,
  DIRECTOR_REPORTS_INFECTIONS,
  DIRECTOR_DEPARTURE
} from "shared/constants/routes"
import { Suspense, lazy } from "react"
import { RelativeLoader } from "../../RelativeLoader/RelativeLoader"
import makeRoutes from "features/seo/makeRoutes"

const DirectorHome = lazy(() => import("pages/Director/DirectorHome/DirectorHome"))
const ShiftsSlots = lazy(() => import("pages/Director/ShiftsSlots/ShiftsSlots"))
const Journals = lazy(() => import("pages/Director/Journals/Journals"))
const JournalDetail = lazy(() => import("pages/Director/Journals/JournalDetail/JournalDetail"))
const PromoCode = lazy(() => import("pages/Director/PromoCode/PromoCode"))
const Reports = lazy(() => import("pages/Director/Reports/Reports"))
const ReportsSales = lazy(() => import("pages/Director/Reports/ReportsSales/ReportsSales"))
const ReportsCapacity = lazy(() => import("pages/Director/Reports/ReportsCapacity/ReportsCapacity"))
const ReportsInfections = lazy(() => import("pages/Director/Reports/ReportsInfections/ReportsInfections"))
const Departure = lazy(() => import("pages/Director/Departure/Departure"))

const wrap = (children) => <Suspense fallback={<RelativeLoader />}>{children}</Suspense>

const pages = {
  [DIRECTOR_HOME]: { element: wrap(<DirectorHome />), helmet: { title: "Главная" } },
  [DIRECTOR_SHIFTS]: { element: wrap(<ShiftsSlots />), helmet: { title: "Редактирование мест в сменах" } },
  [DIRECTOR_JOURNALS]: { element: wrap(<Journals />), helmet: { title: "Журналы смен" } },
  [DIRECTOR_JOURNAL_DETAIL]: { element: wrap(<JournalDetail />), helmet: { title: "Журнал смены" } },
  [DIRECTOR_PROMO_CODE]: { element: wrap(<PromoCode />), helmet: { title: "Промокоды" } },
  [DIRECTOR_REPORTS]: {
    element: wrap(<Reports />),
    helmet: { title: "Отчеты" }
  },
  [DIRECTOR_REPORTS_SALES]: {
    element: wrap(<ReportsSales />),
    helmet: { title: "Заявки в смену" }
  },

  [DIRECTOR_REPORTS_CAPACITY]: {
    element: wrap(<ReportsCapacity />),
    helmet: { title: "Статистика продаж" }
  },
  [DIRECTOR_REPORTS_INFECTIONS]: {
    element: wrap(<ReportsInfections />),
    helmet: { title: "Отчеты для инфекционистов" }
  },
  [DIRECTOR_DEPARTURE]: { element: wrap(<Departure />), helmet: { title: "Подтверждение выезда" } }
}

export const DirectorRouteStack = () => {
  return makeRoutes(pages)
}
