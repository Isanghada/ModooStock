import { useState } from 'react';
import { useAppDispatch } from 'Store/hooks'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { motion } from 'framer-motion';
import { changeLoginStatus, changeSignUpStatus } from 'Store/store';
import { usePostUsersLoginMutation } from 'Store/NonAuthApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'firebase/messaging';
import { messaging } from '../../firebase';
import SetPushToken from 'Components/Common/SetPushToken';

interface LoginInterFace {
  account: string;
  password: string;
}

const screenHeight = window.screen.height;

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginAccount, setLoginAccount] = useState<LoginInterFace>({
    account: '',
    password: ''
  });
  // 회원가입 창 띄우기
  const showSignUp = () => {
    dispatch(changeSignUpStatus(true));
  };
  // 로그인 창 닫기
  const closeLogin = () => {
    dispatch(changeLoginStatus(false));
  };
  // 로그인 API
  const [postUsersLogin, { isSuccess: isSuccess1, isError: isError1 }] = usePostUsersLoginMutation();

  //input에 입력될 때마다 loginAccount state값 변경되게 하는 함수
  const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoginAccount({
      ...loginAccount,
      [event.target.name]: event.target.value
    });
  };

  //로그인 form 제출
  const onSubmitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 로그인 시도 API
    const loginData: any = await postUsersLogin(loginAccount);
    // 로그인 시도후 처리
    if (loginData.data) {
      // 토큰 세팅
      const { accessToken, refreshToken, nickname } = loginData.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('nickname', nickname);
      // 웹푸시용 토큰
      const permission = await Notification.requestPermission();
      if (permission === 'denied') {
        console.log('알림 권한 허용 안됨');
      } else if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FCM_VAPID
        });
        if (token) {
          SetPushToken(nickname, token);
        } else {
          console.log('Can not get Token');
        }
      }
      closeLogin();
      toast.success('어서오세요!!');
      if (nickname === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/main');
      }
    } else {
      toast.error('아이디와 비밀번호를 확인해주세요!!');
      console.log('로그인 에러 :', loginData.error);
    }
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
        className={`w-5/6 lg:w-4/5 flex flex-col justify-center items-center ${
          screenHeight >= 800 ? 'lg:min-h-[38rem] min-h-[19rem]' : ''
        }`}>
        <div className={`w-full font-bold text-2xl lg:text-5xl text-center text-[#fca699]`}>로그인</div>
        <form
          onSubmit={onSubmitLoginForm}
          className={`flex flex-col items-center w-5/6 text-xs lg:text-sm text-black h-[45vh] lg:h-[25vh] justify-evenly ${
            screenHeight >= 800 ? 'min-h-[12rem]' : ''
          }`}>
          <input
            onChange={onChangeAccount}
            name="account"
            type="text"
            className={`border-2 border-[#FFC1B7] w-full h-8 lg:h-10 rounded-md bg-[transparent] p-2 outline-none focus:border-[#f98270]`}
            placeholder="아이디"
            required
          />
          <input
            onChange={onChangeAccount}
            name="password"
            type="password"
            className={`border-2 border-[#FFC1B7] w-full h-8 lg:h-10 rounded-md bg-transparent p-2 outline-none focus:border-[#f98270]`}
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
          <div className="mr-1 text-xs lg:mr-2 lg:text-sm"> 계정이 없으신가요? </div>
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
