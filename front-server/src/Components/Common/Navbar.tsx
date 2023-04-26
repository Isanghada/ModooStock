import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUsersInfoQuery } from 'Store/api';
import Chatting from 'Components/Chatting/Chatting';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeChattingStatus } from 'Store/store';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [myNickName, setMyNickName] = useState<string>('');
  const [currentMoney, setCurrentMoney] = useState<string>('');
  const [totalStockReturn, setTotalStockReturn] = useState<number>(0);
  // 내 정보 API
  const [getUsersInfo] = useLazyGetUsersInfoQuery();
  // 전체 스크린 높이
  const [screenHeight, setScreenHeight] = useState<number>(0);
  
  // 현재 브라우저 윈도우 너비 값
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // 채팅 창 상태
  const chattingStatus = useAppSelector((state) => {
    return state.chattingStatus;
  });

  // 채팅 창 띄우기
  const showChatting = () => {
    console.log(chattingStatus, '채ㅔ팅');
    if (chattingStatus) {
      dispatch(changeChattingStatus(false));
    } else {
      dispatch(changeChattingStatus(true));
    }
  };

  useEffect(() => {
    const getMyInfo = async () => {
      // 내 정보 가져오기 API
      const { data } = await getUsersInfo('');
      // 닉네임 세팅
      if (data) {
        const { nickname, currentMoney, totalStockReturn } = data.data;
        setMyNickName(nickname);
        setCurrentMoney(currentMoney.toLocaleString());
        setTotalStockReturn(totalStockReturn);
        localStorage.setItem('nickname', nickname);
      }
    };
    getMyInfo();
  }, []);

  useEffect(() => {
    // 창 높이 변할떄마다 실행
    const height = window.screen.height;
    setScreenHeight(height);
  }, [window.screen.height]);

  useEffect(() => {
    // 창 넓이 변할때마다 실행
    const updateScreenWidth = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    // 처음 한번 실행
    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // 클릭 이벤트 처리
  const click = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    console.log(target, '라벨');
    switch (target.ariaLabel) {
      case '마이페이지':
        navigate('/mypage');
        break;
      case '홈':
        navigate('/main');
        break;
      case '채팅':
        showChatting();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={`fixed top-2 px-2 lg:top-2 left-0 flex justify-between items-center w-screen h-[10vh] z-40 ${
          screenHeight >= 800 ? 'min-h-[3rem] max-h-[5rem]' : ''
        }`}>
        <div className="flex justify-evenly items-center w-[70vw] h-full max-w-[70vw]">
          <div className={`flex items-center w-[20vw] h-full`}>
            <div
              aria-label="마이페이지"
              className={`bg-[#ff498c] rounded-full cursor-pointer w-[10vh] h-full ${
                screenHeight >= 800 ? 'min-w-[3rem] max-w-[5rem]' : ''
              }`}
              onClick={click}></div>
            <div
              className={`bg-[#FB6B9F] w-[20vw] h-2/3 lg:h-1/2 rounded-2xl text-sm lg:text-2xl text-white font-semibold lg:font-bold cursor-pointer flex justify-center items-center absolute -z-10 ${
                screenHeight >= 800 ? 'min-w-fit max-w-[20vw] pl-[3rem] lg:pl-[8vh]' : 'pl-[8vh]'
              }`}>
              {myNickName}
            </div>
          </div>
          <div className={`flex items-center min-w-fit w-[20vw] h-full`}>
            <div className="min-w-[10vh] w-[10vh]">
              <img className="w-full" src="/images/icons/money.png" alt="money" />
            </div>
            <div
              className={`bg-[#FFBF4D] w-[20vw] min-w-fit px-2 h-2/3 lg:h-1/2 rounded-2xl text-sm lg:text-2xl text-white font-medium lg:font-bold flex justify-center items-center  ${
                screenHeight >= 800 ? 'max-w-[20vw]' : ''
              }`}>
              {currentMoney}원
            </div>
          </div>
          <div className={`flex items-center w-[20vw] h-full`}>
            <div className="min-w-[9vh] w-[9vh]">
              <img
                className="w-full"
                src={`${totalStockReturn >= 0 ? `/images/icons/upgold.png` : `/images/icons/downgold.png`}`}
                alt="money"
              />
            </div>
            <div
              className={`bg-[#cfc8b1] w-[20vw] h-2/3 lg:h-1/2 rounded-2xl text-sm lg:text-2xl font-medium lg:font-bold flex justify-center items-center ${
                totalStockReturn >= 0 ? 'text-red-600' : 'text-blue-600'
              } ${screenHeight >= 800 ? 'min-w-fit max-w-[20vw]' : ''}`}>
              {totalStockReturn}%
            </div>
          </div>
        </div>
        <div className={`w-[20vw] lg:w-[16vw] h-full justify-evenly items-center flex `}>
          <div aria-label="채팅" onClick={click} className="min-w-[9vh] w-[9vh] cursor-pointer hover:scale-105">
            <img className="w-full" src="/images/icons/chat2.png" alt="chat" />
          </div>
          <div aria-label="홈" onClick={click} className="min-w-[9vh] w-[9vh] cursor-pointer hover:scale-105">
            <img className="w-full" src="/images/icons/home.png" alt="home" />
          </div>
          <div className="min-w-[9vh] w-[9vh] cursor-pointer hover:scale-105">
            <img className="w-full" src="/images/icons/setting.png" alt="setting" />
          </div>
        </div>
      </div>
      {chattingStatus && (
        <AnimatePresence>
          <motion.div
            initial={{ width: 0 }}
            animate={screenWidth <= 1024 ? { width: '50vw' } : { width: '30vw' }}
            exit={{ width: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut'
            }}
            className={`fixed bottom-0 right-0 z-50 h-[85vh] bg-white border-2 border-[#FB6B9F] bg-opacity-90 rounded-md`}>
            <Chatting />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
export default Navbar;
