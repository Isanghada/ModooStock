// hooks.ts 파일을 따로 만는 이유
// Redux toolkit를 TypeScript와 함께 사용하려면 useSelector와 useDispatch를 TypeScript 버전으로 변경해줘야 하는데
//  이런 타입화 과정을 모든 컴포넌트에 적용하는 것보다는 hooks.ts라는 파일에서 만들어 pre-typed된 버전을 만들어주는 것이 편하다.

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector