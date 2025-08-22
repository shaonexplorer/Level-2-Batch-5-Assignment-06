import { baseApi } from "../baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllParcel: builder.query({
      query: () => ({ url: "/parcel", method: "GET" }),
    }),
  }),
});

export const { useGetAllParcelQuery } = parcelApi;
