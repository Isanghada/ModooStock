import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface ReturnBasicInterFace {
  data: boolean;
  result: string;
}

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

interface ReturnUsersLogoutInterFace {
  data: boolean;
  result: string;
}

interface ReturnBankInterFace {
  data: {
    currentMoney: number;
  };
  result: string;
}

interface ReturnBankListInterFace {
  data: Array<{
    bankId: number;
    endDate: string;
    isPaid: true;
    price: number;
    startDate: string;
  }>;
  result: string;
}

interface UpdateStateInterFace {
  nickname: string;
  password: string;
  introduction: string;
  profileImagePath: string;
}
interface ReturnInfoInterFace {
  data: {
    dateList: [
      {
        date: string;
      }
    ],
    stockList: [
      {
        kind: string;
        price: number;
        stockId: number;
      }
    ]
  },
}
interface ReturnStockListInterFace {
  data: {
    euro: Array<{
      nationalCode: string;
      date: string;
      price: number;
    }>;
    gold: Array<{
      standardType: string;
      date: string;
      price: number;
    }>;
    jyp: Array<{
      nationalCode: string;
      date: string;
      price: number;
    }>;
    oil: Array<{
      standardType: string;
      date: string;
      price: number;
    }>;
    stockList: Array<{
      stockId: number;
      kind: string;
      price: number;
    }>;
    usd: Array<{
      nationalCode: string;
      date: string;
      price: number;
    }>;
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
  const accessToken: string | null = localStorage.getItem('accessToken');

  if (accessToken != null) {
    // 토큰 만료상태 확인
    const decode: DecodedInfoInterFace = jwtDecode(accessToken);
    const nowDate: number = new Date().getTime() / 1000;
    // 토큰 만료시간이 지났다면
    if (decode.exp < nowDate) {
      // 리프레쉬 토큰 발급 서버 요청
      const { data } = await axios({
        url: `${process.env.REACT_APP_API_URL}refresh`,
        method: 'POST',
        headers: {
          'x-refresh-token': localStorage.getItem('refreshToken')
        }
      });
      // 엑세스 토큰 갱신 로컬스토리지 넣어주기
      localStorage.setItem('accessToken', data.data.accessToken);
      return data.data.accessToken;
    } else {
      // 유효기간이 싱싱할때
      return localStorage.getItem('accessToken');
    }
  } else {
    // 토큰이 null 일때
    return;
  }
};

export const Api = createApi({
  reducerPath: 'Api',
  tagTypes: ['UserApi', 'BankApi', 'StockApi', "NewsApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = await fetchAccessToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    // ------------- 유저 -------------

    // 1. 나의 로그인 정보
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
        return [{ type: 'UserApi' }];
      }
    }),

    // 3.랜덤 유저 방문
    getUsersRandom: builder.query<ReturnUsersRandomInterFace, string>({
      query: () => `/users/random`,
      providesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),

    // 4. 로그아웃
    getUsersLogout: builder.query<ReturnUsersLogoutInterFace, string>({
      query: () => `/logout/redirect`,
      providesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),

    // 5. 닉네임 중복확인
    getUsersNickname: builder.query<ReturnBasicInterFace, string>({
      query: (nickname) => `/users/nickname/${nickname}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),
    // 6. 회원정보수정
    putUsersInfo: builder.mutation<ReturnBasicInterFace, UpdateStateInterFace>({
      query: (data) => {
        return {
          url: `/users`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),

    // ------------- 은행 -------------

    // 1. 내 통장 잔고
    getBank: builder.query<ReturnBankInterFace, string>({
      query: () => `/bank`,
      providesTags: (result, error, arg) => {
        return [{ type: 'BankApi' }, { type: 'UserApi' }];
      }
    }),

    // 2. 예금 하기
    postBank: builder.mutation<ReturnBasicInterFace, number>({
      query: (price) => {
        return {
          url: `/bank`,
          method: 'POST',
          body: {
            price: price
          }
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'BankApi' }, { type: 'UserApi' }]
    }),

    // 3. 예금 리스트
    getBankList: builder.query<ReturnBankListInterFace, string>({
      query: () => `/bank/list`,
      providesTags: (result, error, arg) => {
        return [{ type: 'BankApi' }, { type: 'UserApi' }];
      }
    }),

    // 4. 출금 하기
    deleteBank: builder.mutation<ReturnBasicInterFace, number>({
      query: (bankId) => {
        return {
          url: `/bank/${bankId}`,
          method: 'Delete'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'BankApi' }, { type: 'UserApi' }]
    }),

    // 5. 송금 하기
    postBankTransfer: builder.mutation<ReturnBasicInterFace, { money: number; receiver: string }>({
      query: (body) => {
        return {
          url: `/bank/transfer`,
          method: 'Post',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'BankApi' }, { type: 'UserApi' }]
    }),

    // ------------- 뉴스 -------------
    // 1. 현재 뉴스 목록
    getNewsInfo: builder.query<ReturnInfoInterFace, string>({
      query: () => `/info`,
      providesTags: (result, error, arg) => {
        return [{ type: 'NewsApi' }];
      }
    }),   
    // ------------- 주식 -------------

    // 1. 현재 주식 정보 리스트
    getStock: builder.query<ReturnStockListInterFace, string>({
      query: () => `/stock`,
      providesTags: (result, error, arg) => {
        return [{ type: 'StockApi' }];
      }
    }),

    // 2. 선택한 주식 차트 및 나의 주식 정보
    getStockSelect: builder.query<ReturnStockListInterFace, number>({
      query: (stockId) => `/stock/${stockId}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'StockApi' }];
      }
    })
  })
});



// 임시저장
export const {
  // ------------- 유저 -------------
  useGetUsersInfoQuery,
  useLazyGetUsersSearchQuery,
  useLazyGetUsersRandomQuery,
  useLazyGetUsersLogoutQuery,
  useLazyGetUsersNicknameQuery,
  usePutUsersInfoMutation,

  // ------------- 은행 -------------
  useGetBankQuery,
  usePostBankMutation,
  useGetBankListQuery,
  useDeleteBankMutation,
  usePostBankTransferMutation,

  // ------------- 뉴스 -------------
  useGetNewsInfoQuery,
  
  // ------------- 주식 -------------
  useGetStockQuery,
  useLazyGetStockSelectQuery
} = Api;
