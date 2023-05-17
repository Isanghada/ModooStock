
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

// 타입
interface SendPushStateInterFace {
  account: string;
  nickname: string;
  password: string;
}


export const FirebaseApi = createApi({
  reducerPath: 'FirebaseApi',
  tagTypes: ['FirebaseApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FCM_URL,
    prepareHeaders: async (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      headers.set('Authorization', `bearer ${process.env.REACT_APP_FCM_SERVER_KEY}`);
      headers.set('Content-Type', 'application/json',);
      return headers;
    }
  }),
  
  endpoints: (builder) => ({
    // 1. 웹 푸시용
    postSendPush: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: ``,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'FirebaseApi' }]
    })
  })
});

export const {
  usePostSendPushMutation,

} = FirebaseApi;
