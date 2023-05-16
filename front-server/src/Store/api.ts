import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
    profileImagePath: string;
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

interface ReturnTravelInfoInterFace {
  data: {
    profileImagePath: string;
    nickname: string;
    introduction: string;
    totalCash: number;
  };
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

interface ReturnRankListInterFace {
  data: Array<{
    nickname: string;
    profileImagePath: string;
    totalMoney: number;
  }>;
  result: string;
}

interface ReturnActionListInterFace {
  data: Array<{
    assetResDto: {
      assetId: number;
      assetName: string;
      assetLevel: string;
      assetCategory: string;
      assetNameKor: string;
    };
    auctionId: string;
    nickname: string;
    price: number;
  }>;
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
    ];
    stockList: [
      {
        kind: string;
        price: number;
        stockId: number;
      }
    ];
  };
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
interface ReturnBuyNewsInterFace {
  data: {
    content: string;
    date: string;
    kind: string;
  };
  result: string;
}
interface ReturnNewsListInterFace {
  data: [
    {
      content: string;
      date: string;
      kind: string;
    }
  ];
  result: string;
}

interface CommonTradeStockType {
  stockAmount: number;
  stockId: number | undefined;
}

interface ReturnLotteryInterFace {
  data: {
    ranking: number;
    money: number;
  };
  result: string;
}

interface ReturnCommonTradeStockType {
  data: {
    dealType: string;
    price: number;
    amount: number;
    kind: string;
  };
  result: string;
}
interface ReturnGotchaInterFace {
  data: {
    assetCategory: string;
    assetId: number;
    assetLevel: string;
    assetName: string;
    assetNameKor: string;
  };
  result: string;
}

interface ReturnMyRoomAsset {
  data: Array<{
    userAssetId: number;
    assetName: string;
    assetLevel: string;
    assetNameKor: string;
    pos_x: number;
    pos_y: number;
    pos_z: number;
    rot_x: number;
    rot_y: number;
    rot_z: number;
  }>;
  result: string;
}
interface ReturnInven {
  data: Array<{
    userAssetId: number;
    assetName: string;
    assetLevel: string;
    assetNameKor: string;
    assetCategory: string;
    isAuctioned: string;
  }>;
  result: string;
}

interface PutMypage {
  pos_x: number;
  pos_y: number;
  pos_z: number;
  rot_x: number;
  rot_y: number;
  rot_z: number;
  userAssetId: number;
}

interface AuctionReqDtoType {
  price: number;
  userAssetId: number;
}

interface ReturnVisitors {
  data: number;
  result: string;
}

interface ReturnCommentList {
  data: Array<{
    authorResDto: {
      nickname: string;
      profileImagePath: string;
    };
    commentResDto: {
      commentId: number;
      content: string;
    };
    isAuthor: 'Y' | 'N';
  }>;
  result: string;
}

interface PostComment {
  nickname: string;
  content: string;
}

interface ReturnAdminMarketType {
  data: Array<{
    createAt: string;
    endAt: string;
    gameDate: string;
    marketId: number;
    startAt: string;
  }>;
  result: string;
}

interface ReturnAdminMarketSelectType {
  data: [
    {
      companyName: string;
      companyKind: string;
      average: number;
    }
  ];
  result: string;
}

interface ReturnAdminDealType {
  data: Array<{
    account: string;
    companyKind: string;
    companyName: string;
    createAt: string;
    dealCode: string;
    dealId: number;
    dealType: string;
    interest: number;
    isCompleted: string;
    marketId: number;
    price: number;
    stockAmount: number;
  }>;
  result: string;
}

interface ReturnAdminUserType {
  data: Array<{
    account: string;
    introduction: string;
    nickname: string;
    userId: string;
  }>;
  result: string;
}
interface ReturnAdminUserSelectType {
  data: {
    account: string;
    currentMoney: number;
    introduction: string;
    nickname: string;
    profileImagePath: string;
    userId: number;
  };
  result: string;
}

interface ReturnAdminPutUserType {
  nickname: string;
  userId: number;
}

interface AdminAssetType {
  assetLevel: string;
  category: string;
}

interface ReturnAdminAssetType {
  data: Array<{
    assetCategory: string;
    assetId: number;
    assetImagePath: string;
    assetLevel: string;
  }>;
  result: string;
}

interface AdaminAssetPUtType {
  assetId: number;
  assetLevel: string;
  category: string;
}

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
  tagTypes: [
    'UserApi',
    'BankApi',
    'StockApi',
    'NewsApi',
    'MypageApi',
    'InvenApi',
    'GotchaApi',
    'AuctionApi',
    'UserMypageApi',
    'CommentApi',
    'AdminUserApi',
    'AdminAssetApi'
  ],
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
    // 6. 회원탈퇴
    deleteUsers: builder.mutation<ReturnBasicInterFace, string>({
      query: () => {
        return {
          url: `/users`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'UserApi' }];
      }
    }),

    getUsersTravelInfo: builder.query<ReturnTravelInfoInterFace, string>({
      query: (nickname) => `/users/info/${nickname}`,
      providesTags: (result, error, arg) => {
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
        console.log(body);

        return {
          url: `/bank/transfer`,
          method: 'Post',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'BankApi' }, { type: 'UserApi' }]
    }),

    // ------------- 뉴스 -------------
    // 1. 현재 뉴스 리스트 및 날짜
    getNewsInfo: builder.query<ReturnInfoInterFace, string>({
      query: () => `/info`,
      providesTags: (result, error, arg) => {
        return [{ type: 'NewsApi' }];
      }
    }),
    // 2. 선택한 뉴스 구입
    postNewsBuy: builder.mutation<ReturnBuyNewsInterFace, number>({
      query: (stockId) => {
        return {
          url: `/info/buy`,
          method: 'POST',
          body: {
            stockId
          }
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'NewsApi' }, { type: 'UserApi' }]
    }),
    // 3. 보유한 뉴스 리스트
    getNewsList: builder.query<ReturnNewsListInterFace, string>({
      query: () => {
        return {
          url: `/info/mine`,
          method: 'GET'
        };
      },
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
    }),

    // 3. 주식 매수
    postStock: builder.mutation<ReturnCommonTradeStockType, CommonTradeStockType>({
      query: (body) => {
        return {
          url: `/stock/`,
          method: 'POST',
          body: body
        };
      },

      invalidatesTags: (result, error, arg) => [{ type: 'UserApi' }, { type: 'StockApi' }]
    }),

    // 4. 주식 매도
    deleteStock: builder.mutation<ReturnCommonTradeStockType, any>({
      query: (body) => {
        return {
          url: `/stock/`,
          method: 'DELETE',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'UserApi' }, { type: 'StockApi' }]
    }),

    // ------------- 랭킹 -------------------
    getRank: builder.query<ReturnRankListInterFace, string>({
      query: () => `/rank`,
      providesTags: (result, error, arg) => {
        return [];
      }
    }),

    // ----------- 미니게임 ------------
    // 1. 스피드 복권 버전
    postMiniGameBright: builder.mutation<ReturnLotteryInterFace, string>({
      query: (body) => {
        return {
          url: `/mini/bright`,
          method: 'Post',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'UserApi' }]
    }),

    // 2. 어둠의 복권 버전
    postMiniGameDark: builder.mutation<ReturnLotteryInterFace, string>({
      query: (body) => {
        return {
          url: `/mini/dark`,
          method: 'Post',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'UserApi' }]
    }),

    // ------------- 마이페이지 -------------------
    //  1. 마이 룸 반환
    getMypage: builder.query<ReturnMyRoomAsset, string>({
      query: () => `/mypage/${localStorage.getItem('nickname')}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'MypageApi' }];
      }
    }),
    //  2. 인벤토리에 있는 에셋 마이룸에 넣기
    postMypage: builder.mutation<ReturnBasicInterFace, number>({
      query: (myAssetId) => {
        return {
          url: `/mypage/${myAssetId}`,
          method: 'POST'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'MypageApi' }, { type: 'InvenApi' }]
    }),
    //  3. 인벤토리에 있는 에셋 마이룸에 넣기
    deleteMypage: builder.mutation<ReturnBasicInterFace, number>({
      query: (myAssetId) => {
        return {
          url: `/mypage/${myAssetId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'MypageApi' }, { type: 'InvenApi' }]
    }),
    //  4. 마이 룸 내의 에셋 위치 옮기기
    putMypage: builder.mutation<ReturnBasicInterFace, PutMypage>({
      query: (body) => {
        return {
          url: `/mypage/`,
          method: 'PUT',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'MypageApi' }, { type: 'InvenApi' }]
    }),

    // ------------- 창고 -------------------
    //  1. 창고에 있는 물품 리스트 반환
    getStorage: builder.query<ReturnInven, string>({
      query: () => `/storage`,
      providesTags: (result, error, arg) => {
        return [{ type: 'InvenApi' }];
      }
    }),
    //  2. 창고에 있는 물품 되팔기
    postStorageResale: builder.mutation<ReturnBasicInterFace, number>({
      query: (userAssetId) => {
        return {
          url: `/storage/resale/${userAssetId}`,
          method: 'POST'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'MypageApi' }, { type: 'InvenApi' }, { type: 'UserApi' }]
    }),
    // ----------- 뽑기상점 ------------
    postGotchaLevel: builder.mutation<ReturnGotchaInterFace, string>({
      query: (gotchaLevel) => {
        return {
          url: `/store/level/${gotchaLevel}`,
          method: 'Post'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'GotchaApi' }, { type: 'UserApi' }]
    }),

    // ----------- 경매 ------------
    // 1. 경매 물품 리스트 조회
    getAuction: builder.query<ReturnActionListInterFace, string>({
      query: () => `/auction`,
      providesTags: (result, error, arg) => {
        return [{ type: 'AuctionApi' }];
      }
    }),
    // 2. 경매 물품 등록
    postAuction: builder.mutation<ReturnBasicInterFace, AuctionReqDtoType>({
      query: (body) => {
        return {
          url: `/auction`,
          method: 'POST',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'MypageApi' }, { type: 'InvenApi' }, { type: 'AuctionApi' }]
    }),

    // 3. 내가 올린 경매 물품 리스트 조회
    getAuctionMy: builder.query<ReturnActionListInterFace, string>({
      query: () => `/auction/my`,
      providesTags: (result, error, arg) => {
        return [{ type: 'AuctionApi' }];
      }
    }),

    // 4. 구매
    postAuctionAuctionId: builder.mutation<ReturnBasicInterFace, string>({
      query: (auctionId) => {
        return {
          url: `/auction/${auctionId}`,
          method: 'POST'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'AuctionApi' }]
    }),
    // 5. 판매 취소
    deleteAuctionAuctionId: builder.mutation<ReturnBasicInterFace, string>({
      query: (auctionId) => {
        return {
          url: `/auction/${auctionId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'AuctionApi' }]
    }),
    // 6. 마이페이지에서 판매 취소
    deleteAuctionMyAssetId: builder.mutation<ReturnBasicInterFace, number>({
      query: (myAssetId) => {
        return {
          url: `/auction/my/${myAssetId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'AuctionApi' }, { type: 'InvenApi' }]
    }),
    // ----------- 방문하기 ------------
    // 1. 방문한 유저의 마이룸 조회
    getUserMypage: builder.query<ReturnMyRoomAsset, string>({
      query: (nickname) => `/mypage/${nickname}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'UserMypageApi' }];
      }
    }),
    // 2. 마이페이지 방문자 수 조회
    getUserMypageVisitors: builder.query<ReturnVisitors, string>({
      query: (nickname) => `/mypage/visit?nickname=${nickname}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'UserMypageApi' }];
      }
    }),

    // ----------- 방명록 ------------
    // 1. 방명록 리스트 조회
    getCommentList: builder.query<ReturnCommentList, string>({
      query: (nickname) => `/comment?nickname=${nickname}​`,
      providesTags: (result, error, arg) => {
        return [{ type: 'CommentApi' }];
      }
    }),
    // 2. 방명록 작성
    postComment: builder.mutation<ReturnBasicInterFace, PostComment>({
      query: (body) => {
        return {
          url: `/comment?nickname=${body.nickname}`,
          method: 'Post',
          body: body.content
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'CommentApi' }]
    }),
    // 3. 방명록 수정
    putComment: builder.mutation<ReturnBasicInterFace, { commentId: number; content: string }>({
      query: (body) => {
        return {
          url: `/comment/${body.commentId}`,
          method: 'Put',
          body: body.content
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'CommentApi' }]
    }),
    // 4. 방명록 삭제
    deleteComment: builder.mutation<ReturnBasicInterFace, number>({
      query: (commentId) => {
        return {
          url: `/comment/${commentId}`,
          method: 'Delete'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'CommentApi' }]
    }),

    // ----------- 관리장 장(시즌) ------------
    // 1. 모든 장(시즌) 목록 조회
    getAdminMarket: builder.query<ReturnAdminMarketType, string>({
      query: () => `/admin/market`,
      providesTags: (result, error, arg) => {
        return [];
      }
    }),
    // 2. 선택한 장(시즌)의 종목 목록 조회
    getAdminMarketSelect: builder.query<ReturnAdminMarketSelectType, number>({
      query: (marketId) => `/admin/market/${marketId}`,
      providesTags: (result, error, arg) => {
        return [];
      }
    }),
    // ----------- 관리장 거래내역 ------------
    // 1. 모든 거래내역 목록 조회
    getAdminDeal: builder.query<ReturnAdminDealType, string>({
      query: () => `/admin/deal`,
      providesTags: (result, error, arg) => {
        return [];
      }
    }),
    // 2. 선택한 거래내역의 종목 목록 조회
    getAdminDealSelect: builder.query<ReturnAdminDealType, string>({
      query: (account) => `/admin/deal/${account}`,
      providesTags: (result, error, arg) => {
        return [];
      }
    }),

    // ----------- 관리장 에셋 ------------
    // 1. 검색한 에셋 정보 조회
    getAdminAsset: builder.query<ReturnAdminAssetType, AdminAssetType>({
      query: (body) => {
        return {
          url: `/admin/asset`,
          method: 'GET',
          params: {
            body
          }
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'AdminAssetApi' }];
      }
    }),
    // 2. 선택한 에셋 정보 수정
    putAdminAssetSelect: builder.mutation<ReturnBasicInterFace, AdaminAssetPUtType>({
      query: (body) => {
        return {
          url: '/admin/asset',
          method: 'PUT',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'AdminAssetApi' }]
    }),

    // ----------- 관리장 유저 ------------
    // 1. 전체 회원 목록 조회
    getAdminUser: builder.query<ReturnAdminUserType, string>({
      query: () => `/admin/user`,
      providesTags: (result, error, arg) => {
        return [{ type: 'AdminUserApi' }];
      }
    }),
    // 2. 선택한 회원 상세 정보 조회
    getAdminUserSelect: builder.query<ReturnAdminUserSelectType, string>({
      query: (account) => `/admin/user/${account}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'AdminUserApi' }];
      }
    }),
    // 3. 선택한 회원 정보 수정
    putAdminUserSelect: builder.mutation<ReturnBasicInterFace, ReturnAdminPutUserType>({
      query: (body) => {
        return {
          url: '/admin/user',
          method: 'PUT',
          body: body
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'AdminUserApi' }]
    }),
    // 4. 선택한 회원 탈퇴
    deleteAdminUserSelect: builder.mutation<ReturnBasicInterFace, string>({
      query: (account) => {
        return {
          url: `/admin/user/${account}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'AdminUserApi' }]
    }),
    // 5. 닉네임으로 회원 목록 검색
    getAdminUserNick: builder.query<ReturnAdminUserType, string>({
      query: (nickname) => `/admin/user/nick/${nickname}`,
      providesTags: (result, error, arg) => {
        return [{ type: 'AdminUserApi' }];
      }
    }),

    // ----------- 어드민 유저 판별 ------------
    // 1. 닉네임으로 회원 목록 검색
    getAdminUserCheck: builder.query<ReturnBasicInterFace, string>({
      query: () => `/admin/user/isadmin`,
      providesTags: (result, error, arg) => {
        return [];
      }
    })
  })
});

// 임시저장
export const {
  // ------------- 유저 -------------
  useGetUsersInfoQuery,
  useLazyGetUsersInfoQuery,
  useLazyGetUsersSearchQuery,
  useLazyGetUsersRandomQuery,
  useLazyGetUsersLogoutQuery,
  useLazyGetUsersNicknameQuery,
  usePutUsersInfoMutation,
  useDeleteUsersMutation,
  useGetUsersTravelInfoQuery,

  // ------------- 은행 -------------
  useGetBankQuery,
  useLazyGetBankQuery,
  usePostBankMutation,
  useGetBankListQuery,
  useDeleteBankMutation,
  usePostBankTransferMutation,

  // ------------- 뉴스 -------------
  useGetNewsInfoQuery,
  usePostNewsBuyMutation,
  useGetNewsListQuery,

  // ------------- 주식 -------------
  useGetStockQuery,
  useLazyGetStockQuery,
  useGetStockSelectQuery,
  useLazyGetStockSelectQuery,
  usePostStockMutation,
  useDeleteStockMutation,

  // ------------- 랭킹 -------------
  useGetRankQuery,

  // ----------- 미니게임 ------------
  usePostMiniGameBrightMutation,
  usePostMiniGameDarkMutation,

  // ------------- 마이페이지 -------------
  useLazyGetMypageQuery,
  useGetMypageQuery,
  usePostMypageMutation,
  useDeleteMypageMutation,
  usePutMypageMutation,
  usePostAuctionMutation,

  // ------------- 창고 -------------
  useGetStorageQuery,
  useLazyGetStorageQuery,
  usePostStorageResaleMutation,
  // ----------- 미니게임 ------------
  usePostGotchaLevelMutation,

  // 경매장
  useGetAuctionQuery,
  useGetAuctionMyQuery,
  usePostAuctionAuctionIdMutation,
  useDeleteAuctionAuctionIdMutation,
  useDeleteAuctionMyAssetIdMutation,
  useLazyGetAuctionQuery,
  useLazyGetAuctionMyQuery,
  // ----------- 방문 ------------
  useLazyGetUserMypageQuery,
  useLazyGetUserMypageVisitorsQuery,
  // ----------- 방명록 ------------
  useGetCommentListQuery,
  useLazyGetCommentListQuery,
  usePostCommentMutation,
  usePutCommentMutation,
  useDeleteCommentMutation,

  // ----------- 관리자 장(시즌) ------------
  useLazyGetAdminMarketQuery,
  useLazyGetAdminMarketSelectQuery,
  // ----------- 관리자 거래 내역 ------------
  useLazyGetAdminDealQuery,
  useLazyGetAdminDealSelectQuery,
  // ----------- 관리자 에셋 내역 ------------
  useGetAdminAssetQuery,
  useLazyGetAdminAssetQuery,
  usePutAdminAssetSelectMutation,
  // ----------- 관리자 유저 ------------
  useGetAdminUserQuery,
  useLazyGetAdminUserQuery,
  useGetAdminUserSelectQuery,
  useLazyGetAdminUserSelectQuery,
  usePutAdminUserSelectMutation,
  useDeleteAdminUserSelectMutation,
  useLazyGetAdminUserNickQuery,
  useGetAdminUserNickQuery,
  // ----------- 관리자 유저 체크 ------------
  useGetAdminUserCheckQuery,
  useLazyGetAdminUserCheckQuery
} = Api;
