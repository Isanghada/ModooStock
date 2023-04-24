import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'Store/hooks'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { AnimatePresence, motion } from 'framer-motion';
import { changeSignUpStatus } from 'Store/store';

interface AccountInterFace {
  email: string;
  nickname: string;
  password: string;
  password2: string;
}

interface ValueInterFace {
  email: boolean;
  nickname: boolean;
  password: boolean;
}

const screenHeight = window.screen.height

function SignUp(): JSX.Element {
  const dispatch = useAppDispatch();
  // 빈값 체크
  const [emptyValue, setEmptyValue] = useState<ValueInterFace>({
    email: false,
    nickname: false,
    password: false
  });
  // 이메일 유효성 알림 코멘트
  const [emailComment, setEmailComment] = useState<string>('')
  // 이메일 확인 일치여부
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  // 닉네임 확인 일치여부
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  // 비밀번호 확인 일치여부
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  // 제출할 정보
  const [account, setAccount] = useState<AccountInterFace>({
    email: '',
    nickname: '',
    password: '',
    password2: ''
  });

  // 이메일 양식 체크 우선 주석처리
  // const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   const emailRegex =
  //     /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  //   // 빈값 체크
  //   setEmptyValue({
  //     ...emptyValue,
  //     [name]: value !== ''
  //   });

  //   // 이메일 유효성 검사
  //   if (!emailRegex.test(value)) {
  //     setEmailComment('이메일 형식을 다시 확인해주세요!');
  //   } else {
  //     setEmailComment('');
  //   }

  //   // 제출할 이메일계정 정보
  //   setAccount({
  //     ...account,
  //     [name]: value
  //   });
  // }

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    // 빈값 체크
    setEmptyValue({
      ...emptyValue,
      [name]: value !== ''
    });
    
    // 제출할 계정 정보
    setAccount({
      ...account,
      [name]: value
    });

    // 비밀번호 일치하는지 체크
    switch (name) {
      case 'password2':
        setCheckPassword(value === account.password);
        break;
      case 'password':
        setCheckPassword(value === account.password2);
        break;
      default:
        break;
    }
  };

  // 회원가입 창 닫고 다시 로그인 화면가기
  const closeSignUp = () => {
    dispatch(changeSignUpStatus(false));
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

  //회원가입 form 제출
  const onSubmitSignUpForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (checkPassword === '비밀번호가 일치하지 않습니다') {
    //   toast('비밀번호가 일치하지 않습니다'); 
    // } else {
    //   dispatch(signUpAsync(account));
    // }
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
      <div className={`w-5/6 lg:w-4/5 flex flex-col justify-center items-center ${screenHeight >= 800 ? "lg:min-h-[38rem] min-h-[19rem]" : ""}`}>
        <div className={`w-full font-bold text-2xl lg:text-5xl text-center text-[#fca699]`}>회원가입</div>
        <form
          onSubmit={onSubmitSignUpForm}
          className={`flex flex-col items-center w-5/6 text-xs lg:text-sm text-black h-[75vh] lg:h-[50vh] justify-between ${screenHeight >= 800 ? "lg:min-h-[28rem] min-h-[16rem]" : ""}`}>
          <div className={`flex flex-col h-[60vh] lg:h-[40vh] justify-evenly w-full ${screenHeight >= 800 ? "lg:min-h-[25rem] min-h-[12rem]" : ""} `}>
            {/* 이메일 */}
            <div className="h-8 lg:h-12">
              <input
                onChange={onChangeAccount}
                name="email"
                type="string"
                className={`border-2 border-[#FFC1B7] w-full h-5/6 lg:h-full rounded-md bg-[transparent] p-2 outline-none focus:border-[#f98270]`}
                placeholder="아이디"
                maxLength={15}
                required
              />
              {emptyValue.email && (
                <div className={`text-[0.5rem] lg:text-base h-1/6 ${checkEmail ? `text-green-500` : `text-red-500`}`}>
                  {checkEmail ? '사용가능한 아이디입니다' : '이미 사용중인 아이디입니다'}
                  {/* {emailComment} */}
                </div>
              )}
            </div>
            {/* 닉네임 */}
            <div className="h-8 lg:h-12">
              <input
                onChange={onChangeAccount}
                name="nickname"
                type="text"
                className={`border-2 border-[#FFC1B7] w-full h-5/6 lg:h-full rounded-md bg-[transparent] p-2 outline-none focus:border-[#f98270]`}
                placeholder="닉네임"
                maxLength={6}
                required
              />
              {emptyValue.nickname && (
                <div
                  className={`text-[0.5rem] lg:text-base h-1/6 ${checkNickname ? `text-green-500` : `text-red-500`}`}>
                  {checkNickname ? '사용가능한 닉네임입니다' : '이미 사용중인 닉네임입니다'}
                </div>
              )}
            </div>
            {/* 비밀번호  */}
            <input
              onChange={onChangeAccount}
              name="password"
              type="password"
              className={`border-2 border-[#FFC1B7] w-full h-8 lg:h-12 rounded-md bg-transparent p-2 outline-none focus:border-[#f98270]`}
              placeholder="비밀번호"
              minLength={4}
              maxLength={15}
              required
            />
            <div className="h-8 lg:h-12">
              <input
                onChange={onChangeAccount}
                name="password2"
                type="password"
                className={`border-2 border-[#FFC1B7] w-full h-8 lg:h-12 rounded-md bg-transparent p-2 outline-none focus:border-[#f98270]`}
                placeholder="비밀번호 확인"
                required
              />
              {emptyValue.password && (
                <div
                  className={`text-[0.5rem] lg:text-base h-1/6 ${checkPassword ? `text-green-500` : `text-red-500`}`}>
                  {checkPassword ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
                </div>
              )}
            </div>
          </div>
          <input
            type="submit"
            className={`w-full h-8 lg:h-10 rounded-lg bg-[#cfcfcf] text-md lg:text-lg font-semibold text-white cursor-pointer hover:bg-[#c0c0c0]`}
            value="회원가입"
          />
        </form>
        <div className={`w-5/6 flex justify-end items-end h-[8vh] `}>
          <div className="mr-1 text-xs lg:mr-2 lg:text-sm"> 계정이 있으신가요? </div>
          <div
            onClick={closeSignUp}
            className="text-sm lg:text-lg font-semibold lg:font-bold cursor-pointer text-[#fca699] hover:text-[#f98270]">
            {' '}
            로그인{' '}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUp;
