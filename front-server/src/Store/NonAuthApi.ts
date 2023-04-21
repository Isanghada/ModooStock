// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// 타입
type smsmodify = {
  modifyNumber: string,
  phoneNumber: string,
  purpose: string,
}

export const NonAuthApi = createApi({
  reducerPath: "NonAuthApi",
  tagTypes: ['NonAuthApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hmje.net/api',
  }),
  endpoints: (builder) => ({
    // ================sms================
    // 1. 인증번호 체크
    postSmsmodify: builder.mutation<smsmodify, smsmodify>({
      query: (data) => {
        // console.log("인증번호 체크 rtk에서 받은 데이터 : ", data);
        return {
          url: `sms/modify`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),
  })
})

export const {
  // sms

  usePostSmsmodifyMutation,

} = NonAuthApi;