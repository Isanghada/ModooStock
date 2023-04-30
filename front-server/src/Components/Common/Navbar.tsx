import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUsersInfoQuery } from 'Store/api';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeChattingStatus, changeCurrentMoneyStatusStatus, changeMenuStatus } from 'Store/store';
import { AnimatePresence, motion } from 'framer-motion';
import Chat from 'Components/Chatting/Chat';
import Menu from 'Components/Menu/Menu';

const tabList = ['투자', '전체', '전자', '화학', '생명', 'IT'];

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

  // 채팅 창 탭 선택
  const [isSelectChat, setIsSelectChat] = useState<string | null>('전체');

  // 채팅 창 상태
  const chattingStatus = useAppSelector((state) => {
    return state.chattingStatus;
  });
  // 메뉴 창 상태
  const menuStatus = useAppSelector((state) => {
    return state.menuStatus;
  });
  // 현재 잔액 상태
  const currentMoneyStatus = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });

  // 채팅 창 띄우기
  const showChatting = () => {
    if (chattingStatus) {
      dispatch(changeChattingStatus(false));
    } else {
      dispatch(changeChattingStatus(true));
    }
  };
  // 메뉴 창 띄우기
  const showMenu = () => {
    dispatch(changeMenuStatus(true));
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
        dispatch(changeCurrentMoneyStatusStatus(currentMoney.toLocaleString()));
        setTotalStockReturn(totalStockReturn);
        localStorage.setItem('nickname', nickname);
      }
    };
    getMyInfo();
    // 현재 잔액 변경될 때 실행되도록 추가
  }, [currentMoneyStatus]);

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
      case '메뉴':
        // 채팅 켜져있으면 끄기
        dispatch(changeChattingStatus(false));
        showMenu();
        break;
      default:
        // 채팅 탭 선택
        setIsSelectChat(target.ariaLabel);
        break;
    }
  };

  return (
    <>
      <div
        className={`fixed top-2 px-2 lg:top-2 left-0 flex justify-between items-center w-screen h-[10vh] z-40 ${
          screenHeight >= 800 ? 'min-h-[3rem] max-h-[5rem]' : ''
        }`}>
        <div className="flex justify-evenly items-center w-[65vw] h-full max-w-[70vw]">
          <div className={`flex items-center w-[18vw] h-full`}>
            <div
              aria-label="마이페이지"
              className={`bg-[#ff498c] rounded-full cursor-pointer w-[10vh] h-full flex justify-center items-center  ${
                screenHeight >= 800 ? 'min-w-[3rem] max-w-[5rem]' : ''
              }`}
              onClick={click}>
              <img className="w-5/6" src={`/images/toys/pink.png`} alt="money" />
            </div>
            <div
              className={`bg-[#FB6B9F] w-[18vw] h-[57%] lg:h-1/2 rounded-2xl text-xs lg:text-2xl text-white font-semibold lg:font-bold cursor-pointer flex justify-center items-center absolute -z-10 shadow-md shadow-gray-400 ${
                screenHeight >= 800 ? 'min-w-fit max-w-[20vw] pl-[3rem] lg:pl-[8vh]' : 'pl-[8vh]'
              }`}>
              {myNickName}
            </div>
          </div>
          <div className={`flex items-center min-w-fit w-[20vw] h-full`}>
            <div className="min-w-[10vh] w-[5vw]">
              <img className="w-full" src="/images/icons/money.png" alt="money" />
            </div>
            <div
              className={`bg-[#FFBF4D] grow min-w-fit px-2 h-[57%] lg:h-1/2 rounded-2xl text-xs lg:text-2xl text-white font-semibold lg:font-bold flex justify-center items-center shadow-md shadow-gray-400 ${
                screenHeight >= 800 ? 'max-w-[20vw]' : ''
              }`}>
              {currentMoney}원
            </div>
          </div>
          <div className={`flex items-center w-[18vw] h-full`}>
            <div className="min-w-[9vh] w-[4vw]">
              <img
                className="w-full "
                src={`${totalStockReturn >= 0 ? `/images/icons/upgold.png` : `/images/icons/downgold.png`}`}
                alt="money"
              />
            </div>
            <div
              className={`bg-[#e9fcff] grow h-[57%] lg:h-1/2 rounded-2xl text-xs lg:text-2xl font-semibold lg:font-bold flex justify-center items-center shadow-md shadow-gray-400 ${
                totalStockReturn >= 0 ? 'text-red-400' : 'text-blue-400'
              } ${screenHeight >= 800 ? 'min-w-fit max-w-[20vw]' : ''}`}>
              {totalStockReturn}%
            </div>
          </div>
        </div>
        <div className={`mt-2 w-[20vw] lg:w-[16vw] h-full justify-evenly items-center flex `}>
          <div aria-label="채팅" onClick={click} className="min-w-[9vh] w-[4vw] cursor-pointer hover:scale-105">
            <img className="w-full" src="/images/icons/chat2.png" alt="chat" />
          </div>
          <div aria-label="홈" onClick={click} className="min-w-[9vh] w-[4vw] cursor-pointer hover:scale-105">
            <img className="w-full" src="/images/icons/home.png" alt="home" />
          </div>
          <div aria-label="메뉴" onClick={click} className="min-w-[9vh] w-[4vw] cursor-pointer hover:scale-105">
            <img className="w-full" src="/images/icons/setting.png" alt="setting" />
          </div>
        </div>
      </div>
      {menuStatus && <Menu />}
      {/* 채팅 관련 */}
      {chattingStatus && (
        <AnimatePresence>
          <motion.div
            initial={{ width: 0 }}
            animate={screenWidth <= 1024 ? { width: '55vw' } : { width: '35vw' }}
            exit={{ width: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut'
            }}
            className={`fixed bottom-0 right-0 z-50 h-[85vh]  flex`}>
            <div className="w-[5vw] h-full bg-transparent flex flex-col justify-end text-[#FB6B9F]">
              {tabList.map((tab) => {
                return (
                  <div
                    key={tab}
                    onClick={click}
                    aria-label={tab}
                    className={`flex justify-center items-start w-full border-[1px] lg:border-2 border-b-0 rounded-l-lg h-[calc(94%/6)] pt-1 text-[0.5rem] lg:text-base  cursor-pointer hover:shadow-inner hover:shadow-slate-400 ${
                      isSelectChat === tab
                        ? 'border-r-transparent bg-white font-semibold border-l-[#FB6B9F] border-t-[#FB6B9F] border-b-[#FB6B9F] '
                        : 'bg-gray-200 border-b-transparent border-gray-400 border-r-[#FB6B9F]'
                    }`}>
                    {tab}
                  </div>
                );
              })}
            </div>
            <div className="w-[50vw] lg:w-[30vw] h-full bg-white bg-opacity-95">
              {isSelectChat && <Chat data={isSelectChat} />}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
export default Navbar;
