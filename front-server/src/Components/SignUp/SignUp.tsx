import { useState, useEffect } from 'react';
import { useAppDispatch } from 'Store/hooks'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { motion } from 'framer-motion';
import { changeSignUpStatus } from 'Store/store';
import PrivacyPolicy from 'Components/Common/PrivacyPolicy';
import {
  useLazyGetUsersEmailCheckQuery,
  useLazyGetUsersNickCheckQuery,
  usePostUsersSignUpMutation
} from 'Store/NonAuthApi';
import { toast, ToastContainer } from 'react-toastify';

interface AccountInterFace {
  account: string;
  nickname: string;
  password: string;
  password2: string;
}

interface ValueInterFace {
  account: boolean;
  nickname: boolean;
  password: boolean;
}
interface MinValueInterFace {
  account: boolean;
  nickname: boolean;
}

function SignUp(): JSX.Element {
  const dispatch = useAppDispatch();
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  function closePrivacyModal() {
    setPrivacyModalOpen(false);
  }
  // 빈값 체크
  const [emptyValue, setEmptyValue] = useState<ValueInterFace>({
    account: false,
    nickname: false,
    password: false
  });
  // 최소값 체크
  const [minValue, setMinValue] = useState<MinValueInterFace>({
    account: false,
    nickname: false
  });
  // 이메일 확인 일치여부
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  // 닉네임 확인 일치여부
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  // 비밀번호 확인 일치여부
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  // 제출할 정보
  const [account, setAccount] = useState<AccountInterFace>({
    account: '',
    nickname: '',
    password: '',
    password2: ''
  });
  // API 가져오기
  const [postUsersSignUp, { isSuccess: isSuccess1, isError: isError1 }] = usePostUsersSignUpMutation();
  const [getUsersEmailCheck] = useLazyGetUsersEmailCheckQuery();
  const [getUsersNickCheck] = useLazyGetUsersNickCheckQuery();

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    // 케이스에 따른 api 요청
    if (value.length >= 2) {
      setMinValue({
        ...minValue,
        [name]: true
      });
      switch (name) {
        case 'account':
          const emailResult = await getUsersEmailCheck(value).unwrap();
          setCheckEmail(emailResult.data);
          break;
        case 'nickname':
          const nickData = await getUsersNickCheck(value).unwrap();
          setCheckNickname(nickData.data);
          break;
      }
    } else {
      // 2글자가 아닐때
      setMinValue({
        ...minValue,
        [name]: false
      });
      switch (name) {
        case 'account':
          setCheckEmail(false);
          break;
        case 'nickname':
          setCheckNickname(false);
          break;
      }
    }
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

  //회원가입 form 제출
  const onSubmitSignUpForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!privacyCheck) {
      toast.error("개인정보방침을 확인해주세요")
      return
    }
    // 제출 데이터
    const accoutData = {
      account: account.account,
      nickname: account.nickname,
      password: account.password
    };

    try {
      await postUsersSignUp(accoutData).unwrap();
      toast.success('회원가입성공');
      closeSignUp();
    } catch (error) {
      toast.error('회원가입실패');
    }
  };
  // 클릭 이벤트 처리
  const onClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    switch (target.ariaLabel) {
      case '개인정보처리방침':
        setPrivacyCheck(true);
        setPrivacyModalOpen(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // 창 높이 변할떄마다 실행
    const height = window.screen.height;
    setScreenHeight(height);
  }, [window.screen.height]);

  // 이미지 로딩상태 체크
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = '/images/PrivacyPolicy.png';
  }, []);

  return (
    <>
      {isLoaded && <PrivacyPolicy isOpen={privacyModalOpen} closeModal={closePrivacyModal} cancel={'확인'} />}
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
          className={`w-5/6 lg:w-4/5 flex flex-col justify-center items-center  ${
            screenHeight >= 800 ? 'lg:min-h-[38rem] min-h-[19rem]' : ''
          }`}>
          <div className={`w-full font-bold text-2xl lg:text-5xl text-center text-[#fca699]`}>회원가입</div>
          <form
            onSubmit={onSubmitSignUpForm}
            className={`flex flex-col items-center w-5/6 text-xs lg:text-sm text-black h-[75vh] lg:h-[50vh] justify-between ${
              screenHeight >= 800 ? 'lg:min-h-[28rem] min-h-[16rem]' : ''
            }`}>
            <div
              className={`flex flex-col h-[60vh] lg:h-[40vh] justify-evenly w-full ${
                screenHeight >= 800 ? 'lg:min-h-[25rem] min-h-[12rem]' : ''
              } `}>
              {/* 아이디 */}
              <div className="h-8 lg:h-12">
                <input
                  onChange={onChangeAccount}
                  name="account"
                  type="string"
                  className={`border-2 border-[#FFC1B7] w-full h-5/6 lg:h-full rounded-md bg-[transparent] p-2 outline-none focus:border-[#f98270]`}
                  placeholder="아이디"
                  maxLength={15}
                  minLength={2}
                  required
                />
                {emptyValue.account && (
                  <div className={`text-[0.5rem] lg:text-base h-1/6 ${checkEmail ? `text-green-500` : `text-red-500`}`}>
                    {minValue.account
                      ? checkEmail
                        ? '사용가능한 아이디입니다'
                        : '이미 사용중인 아이디입니다'
                      : '아이디를 2글자 이상 입력해주세요'}

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
                  minLength={2}
                  required
                />
                {emptyValue.nickname && (
                  <div
                    className={`text-[0.5rem] lg:text-base h-1/6 ${checkNickname ? `text-green-500` : `text-red-500`}`}>
                    {minValue.nickname
                      ? checkNickname
                        ? '사용가능한 닉네임입니다'
                        : '이미 사용중인 닉네임입니다'
                      : '닉네임을 2글자 이상 입력해주세요'}
                  </div>
                )}
              </div>
              {/* 비밀번호  */}
              <div className="h-8 lg:h-12">
                <input
                  onChange={onChangeAccount}
                  name="password"
                  type="password"
                  className={`border-2 border-[#FFC1B7] w-full h-5/6 lg:h-12 rounded-md bg-transparent p-2 outline-none focus:border-[#f98270]`}
                  placeholder="비밀번호"
                  minLength={4}
                  maxLength={15}
                  required
                />
              </div>
              <div className="h-8 lg:h-12">
                <input
                  onChange={onChangeAccount}
                  name="password2"
                  type="password"
                  className={`border-2 border-[#FFC1B7] w-full h-5/6 lg:h-12 rounded-md bg-transparent p-2 outline-none focus:border-[#f98270]`}
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
            <div className='flex justify-between w-full'>
              <input
                onClick={onClick}
                aria-label="개인정보처리방침"
                type="button"
                className={`w-[48%] h-8 lg:h-10 rounded-lg bg-[#cfcfcf] text-md lg:text-lg font-semibold text-white cursor-pointer hover:bg-[#c0c0c0]`}
                value="개인정보방침"
              />
              <input
                type="submit"
                className={`w-[48%] h-8 lg:h-10 rounded-lg bg-[#fccbcb] text-md lg:text-lg font-semibold text-white cursor-pointer hover:bg-[#ffb4b4]`}
                value="회원가입"
              />
            </div>
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
    </>
  );
}

export default SignUp;
