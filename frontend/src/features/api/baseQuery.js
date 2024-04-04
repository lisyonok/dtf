import { fetchBaseQuery } from "@reduxjs/toolkit/query"

export default fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL + "api/",
  async responseHandler(response) {
    return await response.json()
  },
  credentials: "include"
})
