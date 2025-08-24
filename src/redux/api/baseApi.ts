import { axiosBaseQuery } from "@/axios/axios.base.query";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["Parcel", "User"],
});
