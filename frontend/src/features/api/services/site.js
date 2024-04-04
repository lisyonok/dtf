import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "../baseQuery"

export const siteApi = createApi({
  reducerPath: "SiteApi",
  baseQuery: baseQuery,
  tagTypes: [],

  endpoints: (builder) => ({
    sendCanvas: builder.mutation({
      query: ({ drawing }) => ({ url: `drawing/create`, method: "POST", body: { drawing } })
    }),
    getDrawing: builder.query({
      query: ({ id }) => ({ url: `drawing/${id}` })
    })
  })
})

export const { useSendCanvasMutation, useGetDrawingQuery } = siteApi
