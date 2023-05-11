// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { Api } from './api';
import { NonAuthApi } from './NonAuthApi';

// ------------- 유저 -------------
// 로그인 상태관리
const loginStatus = createSlice({
  name: 'loginStatus',
  initialState: false,
  reducers: {
    changeLoginStatus(state, action) {
      return (state = action.payload);
    }
  }
});
// 회원가입 상태관리
const signUpStatus = createSlice({
  name: 'signUpStatus',
  initialState: false,
  reducers: {
    changeSignUpStatus(state, action) {
      return (state = action.payload);
    }
  }
});

// ------------- 네브바 -------------
// 채팅 상태관리
const chattingStatus = createSlice({
  name: 'chattingStatus',
  initialState: false,
  reducers: {
    changeChattingStatus(state, action) {
      return (state = action.payload);
    }
  }
});
// 메뉴 상태관리
const menuStatus = createSlice({
  name: 'menuStatus',
  initialState: false,
  reducers: {
    changeMenuStatus(state, action) {
      return (state = action.payload);
    }
  }
});
// 정보수정 상태관리
const updateStatus = createSlice({
  name: 'updateStatus',
  initialState: false,
  reducers: {
    changeUpdateStatus(state, action) {
      return (state = action.payload);
    }
  }
});
// 소지 금액 상태관리
const currentMoneyStatus = createSlice({
  name: 'currentMoneyStatus',
  initialState: '0',
  reducers: {
    changeCurrentMoneyStatusStatus(state, action) {
      return (state = action.payload);
    }
  }
});

// 소지 금액 숨김 상태관리
const currentMoneyHideStatus = createSlice({
  name: 'currentMoneyHideStatus',
  initialState: false,
  reducers: {
    changeCurrentMoneyHideStatus(state, action) {
      return (state = action.payload);
    }
  }
});
// ------------- 정보상 -------------
const currentDataIndex = createSlice({
  name: 'currentDataIndex',
  initialState: 0,
  reducers: {
    getCurrentDataIndex(state, action) {
      console.log(action.payload, '인덱스');
      return (state = action.payload);
    }
  }
});

// ------------- 마이페이지 -------------
// 클릭한 에셋 데이터
const clickAsseData = createSlice({
  name: 'clickAssetName',
  initialState: {
    userAssetId: 0,
    assetName: '',
    assetNameKor: '',
    pos_x: 0.0,
    pos_y: 0.0,
    pos_z: -10.0,
    rot_x: 0.0,
    rot_y: 0.0,
    rot_z: 0.0,
    assetLevel: '레어'
  },
  reducers: {
    changeClickAsseData(state, action) {
      return (state = action.payload);
    }
  }
});

// 클릭한 에셋 포지션
const clickAssetPosition = createSlice({
  name: 'clickAssetPosition',
  initialState: [0, 0, -200],
  reducers: {
    changeClickAssetPosition(state, action) {
      return (state = action.payload);
    }
  }
});
// 클릭한 에셋 회전
const clickAssetRotation = createSlice({
  name: 'clickAssetRotation',
  initialState: [0, 0, 0],
  reducers: {
    changeClickAssetRotation(state, action) {
      return (state = action.payload);
    }
  }
});

// 클릭한 인벤 에셋의 옥션 여부
const isAuctionClickInvenAsset = createSlice({
  name: 'clickInvenAsset',
  initialState: {
    isAuctioned: 'false'
  },
  reducers: {
    changeIsAuctionClickInvenAsset(state, action) {
      return (state = action.payload);
    }
  }
});

// 에셋 클릭 여부
const isClickInvenAssetStore = createSlice({
  name: 'isClickAssetStore',
  initialState: false,
  reducers: {
    changeIsClickInvenAssetStore(state, action) {
      return (state = action.payload);
    }
  }
});

export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [NonAuthApi.reducerPath]: NonAuthApi.reducer,

    // ------------- 유저 -------------
    loginStatus: loginStatus.reducer,
    signUpStatus: signUpStatus.reducer,
    // ------------- 네브바 -------------
    chattingStatus: chattingStatus.reducer,
    menuStatus: menuStatus.reducer,
    updateStatus: updateStatus.reducer,
    currentMoneyStatus: currentMoneyStatus.reducer,
    getCurrentDataIndex: currentDataIndex.reducer,
    currentMoneyHideStatus: currentMoneyHideStatus.reducer,
    // ------------- 마이페이지 -------------
    clickAsseData: clickAsseData.reducer,
    clickAssetPosition: clickAssetPosition.reducer,
    clickAssetRotation: clickAssetRotation.reducer,
    isAuctionClickInvenAsset: isAuctionClickInvenAsset.reducer,
    isClickInvenAssetStore: isClickInvenAssetStore.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware).concat(NonAuthApi.middleware)
});
//주석추가
setupListeners(store.dispatch);

// ------------- 유저 -------------
export const { changeLoginStatus } = loginStatus.actions;
export const { changeSignUpStatus } = signUpStatus.actions;
// ------------- 네브바 -------------
export const { changeChattingStatus } = chattingStatus.actions;
export const { changeMenuStatus } = menuStatus.actions;
export const { changeUpdateStatus } = updateStatus.actions;
export const { changeCurrentMoneyStatusStatus } = currentMoneyStatus.actions;
export const { changeCurrentMoneyHideStatus } = currentMoneyHideStatus.actions;
// ------------- 정보상 -------------
export const { getCurrentDataIndex } = currentDataIndex.actions;
// ------------- 마이페이지 -------------
export const { changeClickAsseData } = clickAsseData.actions;
export const { changeClickAssetPosition } = clickAssetPosition.actions;
export const { changeClickAssetRotation } = clickAssetRotation.actions;
export const { changeIsAuctionClickInvenAsset } = isAuctionClickInvenAsset.actions;
export const { changeIsClickInvenAssetStore } = isClickInvenAssetStore.actions;

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;
