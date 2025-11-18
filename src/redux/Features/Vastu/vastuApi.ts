import { baseApi } from "../../API/baseApi";

const vastuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVastu: builder.query({
      query: ({ keyword, category }) => ({
        url: '/vastu',
        method: 'GET',
        credentials: 'include',
        params: {
          keyword,
          category,
        },
      }),
      providesTags: ['vastu'],
    }),

    getSingleVastu: builder.query({
      query: (id) => ({
        url: `/vastu/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastu"],
    }),
     generateVastu: builder.mutation({
      query: (data) => ({
        url: `/ai/generate-vastu`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['vastu'],
    }),
    
  }),
});

export const {
  useGetAllVastuQuery,
  useGetSingleVastuQuery,
  useGenerateVastuMutation
} = vastuApi;
