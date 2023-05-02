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
// ------------- 정보상 -------------
const currentDataIndex = createSlice({
  name: 'currentDataIndex',
  initialState: 0,
  reducers: {
    getCurrentDataIndex(state, action) {
      console.log(action.payload, "인덱스")
      return (state = action.payload);
    }
  }
})

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
// ------------- 정보상 -------------
export const { getCurrentDataIndex } = currentDataIndex.actions;

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;
