// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// 타입
interface SignUpStateInterFace {
  account: string,
  nickname: string,
  password: string,
}
interface LoginStateInterFace {
  account: string,
  password: string,
}
interface ReturnDataInterFace {
  data: boolean;
  result: string;
}



export const NonAuthApi = createApi({
  reducerPath: "NonAuthApi",
  tagTypes: ['NonAuthApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    // 1. 아이디 중복체크
    getUsersEmailCheck: builder.query<ReturnDataInterFace, string>({
      query: (email) => {
        return {
          url: `users/account/${email}`,
          method: "GET",
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "NonAuthApi" }]
      }
    }),
    // 2. 닉네임 중복체크
    getUsersNickCheck: builder.query<ReturnDataInterFace, string>({
      query: (nickname) => {
        return {
          url: `users/nickname/${nickname}`,
          method: "GET",
        }
      },
      providesTags: (result, error, arg) => {
        return [{ type: "NonAuthApi" }]
      }
    }),
    // 3. 회원가입
    postUsersSignUp: builder.mutation<ReturnDataInterFace, SignUpStateInterFace>({
      query: (data) => {
        // console.log("회원가입 : ", data);
        return {
          url: `users`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),
    // 4. 로그인
    postUsersLogin: builder.mutation<ReturnDataInterFace, LoginStateInterFace>({
      query: (data) => {
        // console.log("로그인 : ", data);
        return {
          url: `login`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

  })
})

export const {
  usePostUsersSignUpMutation,
  useLazyGetUsersNickCheckQuery,
  useLazyGetUsersEmailCheckQuery,
  usePostUsersLoginMutation,

} = NonAuthApi;