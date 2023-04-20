import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'Store/hooks'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { AnimatePresence, motion } from 'framer-motion';
import { changeLoginStatus, changeSignUpStatus } from 'Store/store';

interface LoginInterFace {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  const [loginAccount, setLoginAccount] = useState<LoginInterFace>({
    email: '',
    password: ''
  });
  // 회원가입 창 띄우기
  const showSignUp = () => {
    dispatch(changeSignUpStatus(true));
  };

  // 로그인 요청후 값 받아오기
  // const {token, email, status} = useAppSelector(state => {
  //   return state.login;
  // });

  // 로그인 요청후 받아온 상태값 변화에 따른 처리
  useEffect(() => {
    // status값 init
    // dispatch(initStatus());
    // dispatch(initStatusSignUp());
  }, []);

  //input에 입력될 때마다 loginAccount state값 변경되게 하는 함수
  const onChangeAccount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLoginAccount({
      ...loginAccount,
      [event.target.name]: event.target.value
    });
  };

  //로그인 form 제출
  const onSubmitLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <motion.div
      className={`w-full h-full flex justify-center text-[#FFC1B7] bg-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, display: 'none' }}
      transition={{
        duration: 1,
        ease: 'easeInOut'
      }}>
      {/* 오른쪽 폼 */}
      <div
        className={`w-5/6 lg:w-4/5 flex flex-col justify-center items-center`}>
        <div
          className={`w-full font-bold text-2xl lg:text-5xl text-center text-[#fca699]`}>
          로그인
        </div>
        <form
          onSubmit={onSubmitLoginForm}
          className="flex flex-col items-center w-5/6 text-xs lg:text-sm text-black h-[45vh] lg:h-[25vh] justify-evenly">
          <input
            onChange={onChangeAccount}
            name="email"
            type="email"
            className={`border-2 border-[#FFC1B7] w-full h-8 lg:h-12 rounded-md bg-[transparent] p-2 outline-none focus:border-[#f98270]`}
            placeholder="이메일"
            required
          />
          <input
            onChange={onChangeAccount}
            name="password"
            type="password"
            className={`border-2 border-[#FFC1B7] w-full h-8 lg:h-12 rounded-md bg-transparent p-2 outline-none focus:border-[#f98270]`}
            placeholder="비밀번호"
            required
          />
          <input
            type="submit"
            className={`w-full h-8 lg:h-10 rounded-lg bg-[#FFC1B7] text-md lg:text-lg font-semibold text-white cursor-pointer hover:bg-[#fca699]`}
            value="로그인"
          />
        </form>
        <div className={`w-5/6 flex justify-end items-end`}>
          <div className="mr-1 text-xs lg:mr-2 lg:text-sm">
            {' '}
            계정이 없으신가요?{' '}
          </div>
          <div
            onClick={showSignUp}
            className="text-sm lg:text-lg font-semibold lg:font-bold cursor-pointer text-[#fca699] hover:text-[#f98270]">
            {' '}
            회원가입{' '}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
