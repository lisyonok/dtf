import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "../baseQuery"

export const userApi = createApi({
  reducerPath: "UserApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user/",
      providesTags: ["User"]
    }),

    login: builder.mutation({
      query({ username }) {
        return {
          url: "/user/login/",
          method: "POST",
          body: { username }
        }
      },
      invalidatesTags: (result, error) => (!error ? ["User"] : [])
    }),

    logout: builder.mutation({
      query() {
        return {
          url: "/user/logout/",
          method: "GET"
        }
      },
      invalidatesTags: (result, error) => (!error ? ["User"] : [])
    })
  })
})
export const { useGetUserQuery, useLoginMutation, useLogoutMutation } = userApi
