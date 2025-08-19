/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContents: builder.query<any, { keyword?: string }>({
      query: () => {
        return {
          url: `/content`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["content"],
    }),

    getSingleContent: builder.query({
      query: (id) => ({
        url: `/content/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["content"],
    }),
  }),
});

export const {
  useGetAllContentsQuery,
  useGetSingleContentQuery,
} = contentApi;
