/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query<any, { keyword?: string; category?: string }>({
      query: ({ keyword, category }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);

        return {
          url: `/news?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["news"],
    }),

    getSingleNews: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["news"],
    }),
    likeNews: builder.mutation({
  query: (newsId) => ({
    url: `/news/like/${newsId}`,
    method: 'PATCH',
    credentials: 'include',
  }),
  invalidatesTags: ['news'],
}),

viewNews: builder.mutation({
  query: (newsId) => ({
    url: `/news/view/${newsId}`,
    method: 'PATCH',
    credentials: 'include',
  }),
  invalidatesTags: ['news'],
}),

  }),
});

export const {
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useLikeNewsMutation,
  useViewNewsMutation,
} = newsApi;
