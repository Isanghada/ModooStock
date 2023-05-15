import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePutUsersInfoMutation } from 'Store/api';
import { useAppDispatch } from 'Store/hooks';
import { useLazyGetUsersNickCheckQuery } from 'Store/NonAuthApi';
import { changeUpdateStatus } from 'Store/store';

interface AccountInterFace {
  nickname: string;
  password: string;
  password2: string;
  introduction: string;
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

const screenHeight = window.screen.height;

function UpdateInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const myNickName = localStorage.getItem("nickname");
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

  // 제출할 정보
  const [account, setAccount] = useState<AccountInterFace>({
    nickname: '',
    password: '',
    password2: '',
    introduction: ''
  });
  // 닉네임 확인 일치여부
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  // 비밀번호 확인 일치여부
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  // API
  const [getUsersNickCheck] = useLazyGetUsersNickCheckQuery();
  const [putUsersInfo] = usePutUsersInfoMutation();

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(value,"밸류")
    // 케이스에 따른 api 요청
    if (value.length >= 2) {
      setMinValue({
        ...minValue,
        [name]: true
      });
      switch (name) {
        case 'nickname':
          // 정보수정때는 내 닉네임 한번더 입력해도 괜찮음
          if(myNickName === value) {
            break;
          }
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
  // 클릭 이벤트 처리
  const onClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    switch (target.ariaLabel) {
      case '취소':
        dispatch(changeUpdateStatus(false));
        break;
    }
  };

  //회원가입 form 제출
  const onSubmitUpdateForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 제출 데이터
    const accoutData = {
      nickname: account.nickname,
      password: account.password,
      introduction: account.introduction,
      profileImagePath: ""
    };
    try {
      await putUsersInfo(accoutData).unwrap();
      dispatch(changeUpdateStatus(false));
      localStorage.setItem("nickname", account.nickname);
      toast.success('회원정보수정 완료!');
    } catch (error) {
      toast.error('회원정보수정을 실패하였습니다.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
      className={`flex flex-col items-center justify-center w-[40vw] h-[80vh] lg:h-[70vh] bg-white rounded-md ${
        screenHeight >= 800 ? 'lg:min-h-[28rem] min-h-[12rem]' : ''
      }`}>
      <div className="w-full font-extrabold text-center text-red-300 lg:text-5xl ">정보수정</div>
      <form onSubmit={onSubmitUpdateForm} className="flex flex-col w-3/4 text-base justify-evenly h-[90%] lg:h-[70%]">
        <div className="flex w-full justify-evenly h-1/6 lg:h-[12%]">
          <label htmlFor="nickname" className="items-center hidden font-bold grow h-3/4 lg:flex">
            닉네임
          </label>
          <div className="w-full lg:w-3/4">
            <input
              onChange={onChangeAccount}
              placeholder="닉네임"
              maxLength={6}
              minLength={2}
              name="nickname"
              id="nickname"
              type="text"
              className="w-full border-2 text-xs lg:text-base border-[#FFC1B7] rounded-md p-2 outline-none focus:border-[#f98270] h-3/4"
              required
            />
            {emptyValue.nickname && (
              <div className={`text-[0.5rem] lg:text-base h-1/4 ${checkNickname ? `text-green-500` : `text-red-500`}`}>
                {minValue.nickname
                  ? checkNickname
                    ? '사용가능한 닉네임입니다'
                    : '이미 사용중인 닉네임입니다'
                  : '닉네임을 2글자 이상 입력해주세요'}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-evenly h-1/6 lg:h-[12%]">
          <label htmlFor="password" className="items-center hidden font-bold h-3/4 lg:flex grow">
            비밀번호
          </label>
          <input
            onChange={onChangeAccount}
            name="password"
            type="password"
            id="password"
            className="w-full lg:w-3/4 h-3/4 text-xs lg:text-base border-2 border-[#FFC1B7] rounded-md p-2 outline-none focus:border-[#f98270]"
            placeholder="비밀번호"
            minLength={4}
            maxLength={15}
            required
          />
        </div>
        <div className="flex w-full justify-evenly h-1/6 lg:h-[12%]">
          <label htmlFor="password2" className="items-center hidden font-bold h-3/4 lg:flex grow">
            비밀번호 확인
          </label>
          <div className="w-full lg:w-3/4">
            <input
              onChange={onChangeAccount}
              name="password2"
              type="password"
              id="password2"
              className="w-full h-3/4 border-2 text-xs lg:text-base border-[#FFC1B7] rounded-md p-2 outline-none focus:border-[#f98270]"
              placeholder="비밀번호 확인"
              required
            />
            {emptyValue.password && (
              <div className={`text-[0.5rem] lg:text-base h-1/4 ${checkPassword ? `text-green-500` : `text-red-500`}`}>
                {checkPassword ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-evenly h-1/6 lg:h-[12%]">
          <label htmlFor="introduction" className="items-center hidden font-bold h-3/4 lg:flex grow">
            자기소개
          </label>
          <input
            onChange={onChangeAccount}
            name="introduction"
            id="introduction"
            className="w-full lg:w-3/4 h-3/4 text-xs lg:text-base border-2 border-[#FFC1B7] rounded-md p-2 outline-none focus:border-[#f98270]"
            placeholder="자기소개"
          />
        </div>
        <div className="flex justify-between w-full">
          <div
            aria-label="취소"
            onClick={onClick}
            className="bg-[#CACACA] rounded-xl text-sm lg:text-2xl font-extrabold w-[48%] text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#b1b1b1]">
            취소
          </div>
          <input
            type='submit'
            className="bg-[#FFD4CD] rounded-xl text-sm lg:text-2xl font-extrabold w-[48%] text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#ffc1b8]"
            value="정보수정완료"
            />
            
        </div>
      </form>
    </motion.div>
  );
}
export default UpdateInfo;
