/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const emergencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmergencyAlert: builder.mutation<any, any>({
      query: (data) => ({
        url: '/emergency',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSendEmergencyAlertMutation } = emergencyApi;