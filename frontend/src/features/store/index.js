import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { siteApi } from "features/api/services/site"

export const store = configureStore({
  reducer: {
    [siteApi.reducerPath]: siteApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(siteApi.middleware)
})

if (process.env.NODE_ENV === "development") window.store = store

setupListeners(store.dispatch)
