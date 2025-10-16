/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const vastuTipsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVastuTips: builder.query({
      query: () => ({
        url: `/vastuTips`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastuTips"],
    }),

    getSingleVastuTips: builder.query({
      query: (id) => ({
        url: `/vastuTips/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastuTips"],
    }),
  }),
});

export const {
  useGetAllVastuTipsQuery,
  useGetSingleVastuTipsQuery,
} = vastuTipsApi;
