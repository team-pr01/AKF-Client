import { baseApi } from "../../API/baseApi";

const jyotishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const {
  useGenerateKundliMutation,
  useGenerateMuhurtaMutation
} = jyotishApi;
