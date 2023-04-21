// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { configureStore, createSlice, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { everyStock } from "./api"
import { NonAuthApi } from './NonAuthApi';



// 한페이지에 나타나는 단어 리스트
// const dictList = createSlice({
//   name: "dictList",
//   initialState: '',
//   reducers: {
//     changeDictList(state, action) {
//       return state = action.payload
//     }
//   }
// })

// 로그인 상태관리
const loginStatus = createSlice({
  name: "loginStatus",
  initialState: false,
  reducers: {
    changeLoginStatus(state, action) {
      return state = action.payload
    }
  }
})
// 회원가입 상태관리
const signUpStatus = createSlice({
  name: "signUpStatus",
  initialState: false,
  reducers: {
    changeSignUpStatus(state, action) {
      return state = action.payload
    }
  }
})


export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    [everyStock.reducerPath]: everyStock.reducer,
    [NonAuthApi.reducerPath]: NonAuthApi.reducer,
    // dictList: dictList.reducer,
    loginStatus: loginStatus.reducer,
    signUpStatus: signUpStatus.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(everyStock.middleware),

});
//주석추가
setupListeners(store.dispatch)


// export const { changeDictList } = dictList.actions;
export const { changeLoginStatus } = loginStatus.actions;
export const { changeSignUpStatus } = signUpStatus.actions;

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;
