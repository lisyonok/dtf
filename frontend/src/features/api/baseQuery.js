import { fetchBaseQuery } from "@reduxjs/toolkit/query"

export default fetchBaseQuery({
  baseUrl: "http://localhost:3001/",
  async responseHandler(response) {
    return await response.json()
  },
  credentials: "include"
})
