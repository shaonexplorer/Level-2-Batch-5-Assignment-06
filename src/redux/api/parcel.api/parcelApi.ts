import { baseApi } from "../baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllParcel: builder.query({
      query: () => ({ url: "/parcel", method: "GET" }),
      providesTags: ["Parcel"],
    }),
    getMyParcels: builder.query({
      query: () => ({ url: "/parcel/me", method: "GET" }),
      providesTags: ["Parcel"],
    }),
    createParcel: builder.mutation({
      query: (data) => ({ url: "/parcel", method: "POST", data }),
      invalidatesTags: ["Parcel"],
    }),
    cancelParcel: builder.mutation({
      query: (id) => ({ url: `/parcel/cancel/${id}`, method: "PATCH" }),
      invalidatesTags: ["Parcel"],
    }),
    trackParcel: builder.query({
      query: (id) => ({ url: `/parcel/${id}`, method: "GET" }),
    }),
  }),
});

export const {
  useGetAllParcelQuery,
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
  useTrackParcelQuery,
} = parcelApi;
