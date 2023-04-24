import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


// const fetchAccessToken = async () => {
//   // const userName: string = localStorage.getItem("userName")

//   let accessToken: string | null = localStorage.getItem("accessToken");

//   if (accessToken != null) {
//     const decode: decodedInfo = jwtDecode(accessToken);
//     const nowDate: number = new Date().getTime() / 1000;
//     // 토큰 만료시간이 지났다면
//     if (decode.exp < nowDate) {
//       // 리프레쉬 토큰 발급 서버 요청
//       const userName = localStorage.getItem('userName')
//       const { data } = await axios({
//         url: `url 주소`,
//         headers: {
//           refreshToken: localStorage.getItem("refreshToken"),
//         }
//       })
//       // 엑세스 토큰 갱신
//       return data.accessToken;
//     } else {
//       // 유효기간이 싱싱할때
//       return localStorage.getItem("accessToken");
//     }
//   } else {
//     // 토큰이 null 일때
//   }
// };

export const everyStock = createApi({
  reducerPath: 'api',
  tagTypes: ['Api'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,

    // prepareHeaders(headers) {
    //   headers.set('accessToken', accessToken)
    // },
    // fetchFn: async (input, init, ...rest) => {
    //   // Call your axios request before fetching from the base URL
    //   const accessToken = await fetchAccessToken();
    //   const headers = new Headers(init?.headers);
    //   headers.set('accessToken', accessToken);
    //   headers.set("content-type", "application/json");
    //   headers.set("content-type", "application/json");
    //   localStorage.setItem('accessToken', accessToken)
    //   return fetch(input, { ...init, headers }, ...rest);
    //   //return fetch(input, { ...init }, ...rest);
    // },
  }),

  endpoints: (builder) => ({

    // // 1. 전체 회원 목록
    // getAdminUserList: builder.query({
    //   query: () => "/admin/user",
    //   providesTags: (result, error, arg) => {
    //     return [{ type: "adminUser" }]
    //   }
    // }),

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
    
  }),
})
// 임시저장
export const {

  // useLazyGetAdminUserListQuery,
  // usePutAdminUserDeleteMutation,

} = everyStock 