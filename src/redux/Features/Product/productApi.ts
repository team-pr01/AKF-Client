/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      any,
      { keyword?: string; category?: string; page?: number; limit?: number }
    >({
      query: ({ keyword = "", category, page = 1, limit = 10 }) => {
        let queryStr = `?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}&limit=${limit}`;

        if (category) {
          queryStr += `&category=${encodeURIComponent(category)}`;
        }

        return {
          url: `/product${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi;
