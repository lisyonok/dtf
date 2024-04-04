import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { siteApi } from "features/api/services/site"
import { userApi } from "features/api/services/user"

export const store = configureStore({
  reducer: {
    [siteApi.reducerPath]: siteApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(siteApi.middleware, userApi.middleware)
})

if (process.env.NODE_ENV === "development") window.store = store

setupListeners(store.dispatch)
