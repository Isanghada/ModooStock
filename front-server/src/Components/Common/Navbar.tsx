import { useEffect, useState } from 'react';

function Navbar(): JSX.Element {
  // 나의 정보 가져오기
  const myNickName = localStorage.getItem('nickname');
  const currentMoney = localStorage.getItem('currentMoney');
  const totalStockReturn = localStorage.getItem('totalStockReturn');
  const checkTotalStock = Number(totalStockReturn) 

  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    // 창 높이 변할떄마다 실행
    const height = window.screen.height;
    setScreenHeight(height);
  }, [window.screen.height]);

  return (
    <div
      className={`fixed top-0 left-0 flex justify-evenly items-center w-screen h-[10vh] ${
        screenHeight >= 800 ? 'min-h-[3rem] max-h-[5rem]' : ''
      }`}>
      <div className={`flex items-center w-[20vw] h-full`}>
        <div
          className={`bg-[#ff498c] rounded-full w-[10vh] h-full ${
            screenHeight >= 800 ? 'min-w-[3rem] max-w-[5rem]' : ''
          }`}></div>
        <div
          className={`bg-[#FB6B9F] w-[20vw] h-1/2 rounded-2xl text-md lg:text-2xl text-white font-medium lg:font-bold cursor-pointer flex justify-center items-center absolute -z-10 ${
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
          className={`bg-[#FFBF4D] w-[20vw] min-w-fit px-2 h-1/2 rounded-2xl text-md lg:text-2xl text-white font-medium lg:font-bold cursor-pointer flex justify-center items-center  ${
            screenHeight >= 800 ? 'max-w-[20vw]' : ''
          }`}>
          {currentMoney}원
        </div>
      </div>
      <div className={`flex items-center w-[20vw] h-full`}>
        <div className="min-w-[9vh] w-[9vh]">
          <img className="w-full" src={`${checkTotalStock >= 0 ? `/images/icons/upgold.png` : `/images/icons/downgold.png`}`} alt="money" />
        </div>
        <div
          className={`bg-[#cfc8b1] w-[20vw] h-1/2 rounded-2xl text-md lg:text-2xl text-white font-medium lg:font-bold cursor-pointer flex justify-center items-center ${
            checkTotalStock >= 0 ? 'text-red-600' : 'text-blue-600'
          } ${screenHeight >= 800 ? 'min-w-fit max-w-[20vw]' : ''}`}>
          {totalStockReturn}%
        </div>
      </div>
    </div>
  );
}
export default Navbar;
