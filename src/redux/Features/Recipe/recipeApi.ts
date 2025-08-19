import { baseApi } from "../../API/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipies: builder.query({
      query: ({ keyword, category }) => ({
        url: '/recipe',
        method: 'GET',
        credentials: 'include',
        params: {
          keyword,
          category,
        },
      }),
      providesTags: ['recipe'],
    }),

    getSingleRecipe: builder.query({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['recipe'],
    }),

     generateRecipeByAI: builder.mutation({
      query: (data) => ({
        url: "/ai/generate-recipe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAllRecipiesQuery, useGetSingleRecipeQuery, useGenerateRecipeByAIMutation } = recipeApi;
