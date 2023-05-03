// import Error from 'Components/Common/Error';
// import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePostMiniGameBrightMutation, usePostMiniGameDarkMutation } from 'Store/api';
import Modal from 'Components/Main/Modal';
import LotteryModal from './LotteryModal';
import { useAppSelector } from 'Store/hooks';
import { changeCurrentMoneyStatusStatus } from 'Store/store';
import { toast } from 'react-toastify';

export interface lottoResult {
  ranking: number;
  money: number;
}

function Lottery(): JSX.Element {
  // 현재 잔액 상태
  const currentMoneyStatus = parseInt(
    useAppSelector((state) => {
      return state.currentMoneyStatus;
    }).replaceAll(',', '')
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setDark] = useState(false);

  const [postMiniGameBright, { isLoading: isLoading1, isError: isError1 }] = usePostMiniGameBrightMutation();

  const [postMiniGameDark, { isLoading: isLoading2, isError: isError2 }] = usePostMiniGameDarkMutation();

  const [result, setResult] = useState({ ranking: 5, money: 0 });

  const handleOpenBrightModal = async () => {
    console.log(currentMoneyStatus);
    if (currentMoneyStatus < 1_0000) {
      toast.error('보유돈이 만원보다 작습니다...');
    } else {
      setDark(false);
      setIsOpen(true);

      const { data } = await postMiniGameBright('').unwrap();
      setResult(data);
    }
  };

  const handleOpenDarkModal = async () => {
    if (currentMoneyStatus < 100_0000) {
      toast.error('보유돈이 백만원보다 작습니다...');
    } else {
      setDark(true);
      setIsOpen(true);
      const { data } = await postMiniGameDark('').unwrap();
      setResult(data);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (isError1 || isError2) {
    toast.error('오류 발생....');
  }

  return (
    <>
      <div className="flex items-center w-full h-full justify-evenly max-w-[80rem] max-h-[46.5rem] mt-4 md:mt-0 my-auto mx-auto lg:flex">
        {/* 1. 스피드 복권 */}
        <div
          className="flex flex-col w-[25%] lg:min-w-[20%] lg:w-[23%] mx-2 text-center border-2 rounded-[2rem] border-[#F0A633]/60 bg-cover bg-center"
          style={{ backgroundImage: 'url(images/logos/IntroBG2.png)' }}>
          <div className="py-6 md:py-8 lg:py-10">
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">
              스피드 복권
            </span>
          </div>
          <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] mx-auto lg:py-8 h-[6rem] md:h-[8rem] lg:h-[12rem]">
            <span>긁어봐 당첨 복권!</span> <br />
            <span>만원으로 최대 오천만원까지</span>
          </div>
          <div className="pb-4 lg:pb-5">
            <div
              aria-label="스피드 복권 구매"
              className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#FFC24E]/80 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#FFC24E] hover:scale-110 transition-all duration-300"
              onClick={handleOpenBrightModal}>
              구매 하기
            </div>
          </div>
        </div>
        {/* 2. 어둠의 복권 */}
        <div
          className="flex flex-col w-[25%] lg:min-w-[20%] lg:w-[23%] mx-2 text-center border-2 rounded-[2rem] border-[#748DA6]/60 bg-cover bg-center"
          style={{ backgroundImage: 'url(images/logos/IntroDarkBG.png)' }}>
          <div className="py-6 md:py-8 lg:py-10">
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#748DA6] ">
              어둠의 복권
            </span>
          </div>
          <div className="font-medium leading-5 text-white/80 text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] lg:py-8  h-[6rem] md:h-[8rem] lg:h-[12rem]">
            <span>모 아님 도</span> <br />
            <span>백만원으로 10억원 vs 꽝</span>
          </div>
          <div className="pb-4 lg:pb-5">
            <div
              aria-label="어둠의 복권"
              className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#2C94EA]/80 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#2C94EA] hover:scale-110 transition-all duration-300"
              onClick={handleOpenDarkModal}>
              구매 하기
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal} padding={'rounded-lg'}>
        <LotteryModal isDark={isDark} result={result} timestamp={Date.now()} />
      </Modal>
    </>
  );
}

export default Lottery;
