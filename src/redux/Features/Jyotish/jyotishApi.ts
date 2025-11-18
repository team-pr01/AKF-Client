import { baseApi } from "../../API/baseApi";

const jyotishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDailyHoroscopes: builder.query({
      query: (params) => {
        let queryStr = "";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.keyword) queryParams.append("keyword", params.keyword);
          queryStr = `?${queryParams.toString()}`;
        }
        return {
          url: `/dailyHoroscope${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["jyotish"],
    }),

    generateKundli: builder.mutation({
      query: (data) => ({
        url: `/ai/generate-kundli`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["jyotish"],
    }),
    generateMuhurta: builder.mutation({
      query: (data) => ({
        url: `/ai/generate-muhurta`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["jyotish"],
    }),
  }),
});

export const { useGetAllDailyHoroscopesQuery, useGenerateKundliMutation, useGenerateMuhurtaMutation } =
  jyotishApi;
