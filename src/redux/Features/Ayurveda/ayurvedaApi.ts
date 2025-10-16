import { baseApi } from "../../API/baseApi";

const ayurvedaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAyurveda: builder.query({
      query: (params) => {
        let queryStr = "";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.keyword) queryParams.append("keyword", params.keyword);
          if (params.category) queryParams.append("category", params.category);
          queryStr = `?${queryParams.toString()}`;
        }
        return {
          url: `/ayurveda${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["ayurveda"],
    }),

    getSingleAyurveda: builder.query({
      query: (id) => ({
        url: `/ayurveda/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ayurveda"],
    }),
  }),
});

export const {
  useGetAllAyurvedaQuery,
  useGetSingleAyurvedaQuery,
} = ayurvedaApi;
