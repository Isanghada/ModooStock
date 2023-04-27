import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface DecodedInfoInterFace {
  sub: string;
  exp: number; //유효시간
  userId: number; //유저아이디
  username: string; //유저이름
}

interface ReturnMyInfoInterFace {
  data: {
    currentMoney: number;
    nickname: string;
    totalStockReturn: number;
  };
  result: string;
}

interface ReturnUsersSearchInterFace {
  data: Array<{
    account: string;
    nickname: string;
    profileImagePath: string;
  }>;
  result: string;
}

interface ReturnUsersRandomInterFace {
  data: {
    account: string;
    nickname: string;
    profileImagePath: string;
  };
  result: string;
}

// export const everyStock = createApi({
//   reducerPath: 'api',
//   tagTypes: ['Api'],
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_API_URL,
//     prepareHeaders(headers) {
//       headers.set('accessToken', accessToken)
//     },
//     fetchFn: async (input, init, ...rest) => {
//       // Call your axios request before fetching from the base URL
//       const accessToken = await fetchAccessToken();
//       const headers = new Headers(init?.headers);
//       headers.set('accessToken', accessToken);
//       headers.set("content-type", "application/json");
//       headers.set("content-type", "application/json");
//       localStorage.setItem('accessToken', accessToken)
//       return fetch(input, { ...init, headers }, ...rest);
//       //return fetch(input, { ...init }, ...rest);
//     },
//   }),

const fetchAccessToken = async () => {
  
  const accessToken: string | null = localStorage.getItem("accessToken");

  if (accessToken != null) {
    // 토큰 만료상태 확인
    const decode: DecodedInfoInterFace = jwtDecode(accessToken);
    const nowDate: number = new Date().getTime() / 1000;
    // 토큰 만료시간이 지났다면
    if (decode.exp < nowDate) {
      // 리프레쉬 토큰 발급 서버 요청
      const { data } = await axios({
        url: `${process.env.REACT_APP_API_URL}refresh`,
        method: "POST",
        headers: {
          "x-refresh-token": localStorage.getItem("refreshToken"),
        }
      })
      // 엑세스 토큰 갱신 로컬스토리지 넣어주기
      localStorage.setItem("accessToken", data.data.accessToken);
      return data.data.accessToken;
    } else {
      // 유효기간이 싱싱할때
      return localStorage.getItem("accessToken");
    }
  } else {
    // 토큰이 null 일때
    return
  }
};


export const UserApi = createApi({
  reducerPath: 'UserApi',
  tagTypes: ['UserApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = await fetchAccessToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } 
      return headers;
    }
  }),

  endpoints: (builder) => ({
    // // 1. 나의 로그인 정보
    getUsersInfo: builder.query<ReturnMyInfoInterFace, string>({
      query: () => '/users',
      providesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),

    // 2. 회원 검색
    getUsersSearch: builder.query<ReturnUsersSearchInterFace, string>({
      query: (keyword) => `/users?search=${keyword}`,
      providesTags: (result, error, arg) => {
        return [{ type: "UserApi" }]
      }
    }),
    
    // 3.랜덤 유저 방문
    getUsersRandom: builder.query<ReturnUsersRandomInterFace, string>({
      query: () => `/users/random`,
      providesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),


    // // 3. 회원 삭제
    // putAdminUserDelete: builder.mutation({
    //   query: (data) => {
    //     let [delete_id, my_id] = data
    //     my_id = parseInt(my_id)
    //     return {
    //       url: `/admin/user/${my_id}/${delete_id}`,
    //       method: 'put'
    //     }
    //   },
    //   invalidatesTags: (result, error, arg) => [{ type: "adminUser" }]
    // }),
  })
});



// 임시저장
export const {
  useLazyGetUsersInfoQuery,
  useLazyGetUsersSearchQuery,
  useLazyGetUsersRandomQuery
  // useLazyGetAdminUserListQuery,
  // usePutAdminUserDeleteMutation,
} = UserApi;
