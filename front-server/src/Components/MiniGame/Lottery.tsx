import { useState, useEffect } from 'react';
import { usePostMiniGameBrightMutation, usePostMiniGameDarkMutation } from 'Store/api';
import Modal from 'Components/Main/Modal';
import LotteryModal from './LotteryModal';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { toast } from 'react-toastify';
import { changeCurrentMoneyHideStatus } from 'Store/store';
import { motion } from 'framer-motion';

type LotteryProps = {
  title: string;
  backgroundImage: string;
  color: string;
  onClick: () => void;
  description: string[];
  descriptionColor: string;
};

const LotteryCard = ({ title, backgroundImage, color, onClick, description, descriptionColor }: LotteryProps) => {
  return (
    <div
      className={`flex flex-col w-[25%] lg:min-w-[20%] lg:w-[23%] mx-2 text-center border-4 rounded-[2rem] border-[${color}]/60 bg-cover bg-center shadow-md shadow-gray-400`}
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="py-6 md:py-8 lg:py-10">
        <span className={`font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[${color}]`}>{title}</span>
      </div>
      <div
        className={`font-bold leading-5 text-[${descriptionColor}] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] mx-auto lg:pb-16 h-[6rem] md:h-[8rem] lg:h-[12rem]`}>
        {description.map((text, i) => (
          <span key={i}>
            {text}
            <br />
          </span>
        ))}
      </div>
      <div className="pb-4 lg:pb-5">
        <button
          className={`px-4 py-1 mx-auto font-extrabold text-white rounded-3xl w-[60%]  text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:scale-110 transition-all duration-300 shadow-sm shadow-gray-400 ${
            title === '스피드 복권' ? 'bg-[#FFC24E]/80 hover:bg-[#FFC24E]' : 'bg-[#2C94EA] hover:bg-[#2C94EA]'
          }`}
          onClick={onClick}>
          구매하기
        </button>
      </div>
    </div>
  );
};

function Lottery(): JSX.Element {
  const defaultResult = { ranking: 5, money: 0 };
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [result, setResult] = useState(defaultResult);
  const [canOpenModal, setCanOpenModal] = useState(false);

  // 현재 잔액 상태
  const currentMoneyStatus = parseInt(
    useAppSelector((state) => {
      return state.currentMoneyStatus;
    }).replaceAll(',', '')
  );

  const [postMiniGameBright, { isError: isError1 }] = usePostMiniGameBrightMutation();
  const [postMiniGameDark, { isError: isError2 }] = usePostMiniGameDarkMutation();

  const handleOpenModal = async (isDark: boolean) => {
    const moneyLimit = isDark ? 100_0000 : 1_0000;
    if (currentMoneyStatus < moneyLimit) {
      toast.error(`보유돈이 ${moneyLimit}원보다 작습니다...`);
      return;
    }

    try {
      const { data } = isDark ? await postMiniGameDark('').unwrap() : await postMiniGameBright('').unwrap();
      setResult(data);
    } catch (error) {
      toast.error('오류 발생....');
      return;
    }

    setIsDark(isDark);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setResult(defaultResult);
  };

  const handleLotteryClick = (isDark: boolean) => {
    setResult(defaultResult);
    handleOpenModal(isDark);
  };

  const handleCanOpenModal = (canOpenModal: boolean) => {
    setCanOpenModal(canOpenModal);
  };

  if (isError1 || isError2) {
    toast.error('오류 발생....');
  }

  useEffect(() => {
    if (isOpen) {
      dispatch(changeCurrentMoneyHideStatus(true));
    } else {
      dispatch(changeCurrentMoneyHideStatus(false));
    }
  }, [isOpen, dispatch]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
        className="flex items-center w-full h-full justify-evenly max-w-[80rem] max-h-[46.5rem] pt-6 my-auto mx-auto">
        {/* 1. 스피드 복권 */}
        <LotteryCard
          title="스피드 복권"
          backgroundImage={process.env.REACT_APP_S3_URL + '/images/logos/IntroBG2.png'}
          color="#F0A633"
          onClick={() => handleLotteryClick(false)}
          description={['긁어봐 당첨 복권!', '5만원으로 최대 3천만원까지']}
          descriptionColor="#707070"
        />
        {/* 2. 어둠의 복권 */}
        <LotteryCard
          title="어둠의 복권"
          backgroundImage={process.env.REACT_APP_S3_URL + '/images/logos/IntroDarkBG.png'}
          color="#748DA6"
          onClick={() => handleLotteryClick(true)}
          description={['모 아님 도', '백만원으로 7억원 vs 꽝']}
          descriptionColor="#ffffff"
        />
      </motion.div>
      <Modal isOpen={isOpen} onClose={handleCloseModal} canOpenModal={canOpenModal}>
        <LotteryModal isDark={isDark} result={result} timestamp={Date.now()} handleCanOpenModal={handleCanOpenModal} />
      </Modal>
    </>
  );
}

export default Lottery;
