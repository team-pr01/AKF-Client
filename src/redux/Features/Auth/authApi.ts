import { baseApi } from "../../API/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        method: 'GET',
        url: `/user/me`,
      }),
      providesTags: ['users'],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),

    aiChat: builder.mutation({
      query: (message) => ({
        url: `/ai/chat`,
        method: "POST",
        body: message,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    getAllPushNotificationForUser: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/pushNotification/${userId}`,
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useAiChatMutation,
  useGetAllPushNotificationForUserQuery,
} = authApi;
